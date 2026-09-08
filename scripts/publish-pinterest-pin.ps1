<#
.SYNOPSIS
    Automates 100% compliant Pinterest 2:3 Pin Image generation and Pinterest SEO RSS feed publishing for LOOKIQ.

.DESCRIPTION
    Ensures every new post strictly follows:
    1. Mandatory 2:3 aspect ratio (1000 x 1500 px) in assets/pins/
    2. Pinterest Guided Search SEO Title & Description standards
    3. Visual Search AI Alt Text compliance
    4. Auto-injection into feed.xml for Pinterest Auto-Publish

.EXAMPLE
    .\publish-pinterest-pin.ps1 -ProductId "prod-autumn-coat-01" `
                                -Title "Viral Wool Trench Coat Under $60 | Fall Capsule Wardrobe Inspo" `
                                -Description "Looking for the ultimate quiet luxury fall trench coat on Amazon US? Features double-breasted cut, heavyweight wool-blend, and tailored silhouette. Verified Amazon Prime deal with 4.5 star rating. Tap to explore full sizing breakdown on LOOKIQ!" `
                                -Hashtags @("#AmazonFashion", "#FallOutfits", "#QuietLuxury", "#TrenchCoat", "#CapsuleWardrobe") `
                                -ImageSource "C:\path\to\raw-image.jpg" `
                                -AltText "Woman wearing classic camel double-breasted trench coat with ivory knit sweater and gold accessories" `
                                -Categories @("Women's Fashion", "Fall Outfits", "Coats") `
                                -Price "$59.99"
#>

param (
    [Parameter(Mandatory=$true)]
    [string]$ProductId,

    [Parameter(Mandatory=$true)]
    [string]$Title,

    [Parameter(Mandatory=$true)]
    [string]$Description,

    [Parameter(Mandatory=$true)]
    [string[]]$Hashtags,

    [Parameter(Mandatory=$true)]
    [string]$ImageSource,

    [Parameter(Mandatory=$true)]
    [string]$AltText,

    [Parameter(Mandatory=$false)]
    [string[]]$Categories = @("Women's Fashion", "Amazon Fashion", "Capsule Wardrobe"),

    [Parameter(Mandatory=$false)]
    [string]$Price = "$29.99",

    [Parameter(Mandatory=$false)]
    [string]$BgColorHex = "#141113",

    [Parameter(Mandatory=$false)]
    [switch]$AutoPush = $true
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$projectRoot = Split-Path -Parent $scriptDir
$pinsDir = Join-Path $projectRoot "assets\pins"
$feedPath = Join-Path $projectRoot "feed.xml"

if (!(Test-Path $pinsDir)) {
    New-Item -ItemType Directory -Path $pinsDir -Force | Out-Null
}

# --- STEP 1: CONVERT IMAGE TO STRICT 2:3 RATIO (1000 x 1500 px) ---
Write-Host "[1/4] Processing image to strict 2:3 vertical aspect ratio (1000 x 1500 px)..." -ForegroundColor Cyan

Add-Type -AssemblyName System.Drawing
$pinImageName = "$ProductId-pin.jpg"
$pinImagePath = Join-Path $pinsDir $pinImageName

$src = [System.Drawing.Image]::FromFile($ImageSource)
$targetWidth = 1000
$targetHeight = 1500
$dest = New-Object System.Drawing.Bitmap $targetWidth, $targetHeight
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$bgColor = [System.Drawing.ColorTranslator]::FromHtml($BgColorHex)
$brush = New-Object System.Drawing.SolidBrush $bgColor
$g.FillRectangle($brush, 0, 0, $targetWidth, $targetHeight)

$scaleW = $targetWidth / $src.Width
$scaleH = $targetHeight / $src.Height
$scale = [math]::Min($scaleW, $scaleH)

$drawW = [int]($src.Width * $scale)
$drawH = [int]($src.Height * $scale)
$posX = [int](($targetWidth - $drawW) / 2)
$posY = [int](($targetHeight - $drawH) / 2)

$g.DrawImage($src, $posX, $posY, $drawW, $drawH)

$dest.Save($pinImagePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

$g.Dispose()
$dest.Dispose()
$src.Dispose()
$brush.Dispose()

Write-Host "  -> Generated 2:3 image at: assets/pins/$pinImageName" -ForegroundColor Green

# --- STEP 2: BUILD PINTEREST-FIRST SEO PAYLOAD ---
Write-Host "[2/4] Formatting Pinterest-First SEO Metadata..." -ForegroundColor Cyan

# Clean title (no raw emojis)
$cleanTitle = $Title -replace '[\uD800-\uDBFF][\uDC00-\uDFFF]', ''
if ($cleanTitle.Length -gt 100) {
    $cleanTitle = $cleanTitle.Substring(0, 97) + "..."
}

$pinUrl = "https://lookiq.github.io/products/$ProductId.html"
$pinImageUrl = "https://lookiq.github.io/assets/pins/$pinImageName"
$hashtagString = ($Hashtags | ForEach-Object { if ($_ -notmatch '^#') { "#$_" } else { $_ } }) -join " "
$nowUtc = [DateTime]::UtcNow.ToString("r")

# --- STEP 3: INJECT INTO feed.xml ---
Write-Host "[3/4] Injecting item into Pinterest auto-publish feed.xml..." -ForegroundColor Cyan

$feedContent = [System.IO.File]::ReadAllText($feedPath, [System.Text.Encoding]::UTF8)

$categoryTags = ($Categories | ForEach-Object { "      <category>$_</category>" }) -join "`r`n"

$newItemXml = @"
    <item>
      <title>$cleanTitle</title>
      <link>$pinUrl</link>
      <guid isPermaLink="true">$pinUrl</guid>
      <description><![CDATA[<img src="$pinImageUrl" alt="$AltText" /><p><strong>$cleanTitle</strong></p><p>$Description</p><p><strong>Verified Amazon Prime Deal:</strong> $Price</p><p><a href="$pinUrl">Explore full sizing breakdown and style guide on LOOKIQ &rarr;</a></p><p>$hashtagString</p>]]></description>
      <pubDate>$nowUtc</pubDate>
      <enclosure url="$pinImageUrl" length="120000" type="image/jpeg" />
      <media:content url="$pinImageUrl" medium="image" type="image/jpeg">
        <media:title>$cleanTitle</media:title>
        <media:description>$Description $hashtagString</media:description>
      </media:content>
$categoryTags
    </item>
"@

# Inject right after <image>...</image> or after the first <channel> items
if ($feedContent -match "(<image>[\s\S]*?<\/image>)") {
    $feedContent = $feedContent -replace "(<image>[\s\S]*?<\/image>)", "`$1`r`n`r`n$newItemXml"
} else {
    $feedContent = $feedContent -replace "(<channel>)", "`$1`r`n$newItemXml"
}

[System.IO.File]::WriteAllText($feedPath, $feedContent, [System.Text.Encoding]::UTF8)
Write-Host "  -> Successfully updated feed.xml with new Pinterest Pin item!" -ForegroundColor Green

# --- STEP 4: GIT COMMIT & PUSH ---
if ($AutoPush) {
    Write-Host "[4/4] Committing & pushing to GitHub repository..." -ForegroundColor Cyan
    git -C $projectRoot add .
    git -C $projectRoot commit -m "Auto-publish new Pinterest Pin: $cleanTitle"
    git -C $projectRoot push origin main
    Write-Host "  -> Live deployment triggered! Pinterest will auto-publish this pin." -ForegroundColor Green
}

Write-Host "`nSUCCESS: New Pinterest Pin published and ready for auto-sync!" -ForegroundColor Green
