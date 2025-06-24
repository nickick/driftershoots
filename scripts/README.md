# Scripts

This directory contains utility scripts for the driftershoots project.

## Thumbnail Generation Scripts

### 1. `generate_thumbnails.ts` (Gallery-specific)

Generates thumbnails specifically for the gallery collection by fetching NFT metadata from Alchemy API.

**Usage:**

```bash
yarn generate-thumbnails
```

### 2. `generate_folder_thumbnails.ts` (Generic)

Generates thumbnails for any folder in the `/public` directory using ImageMagick.

**Usage:**

```bash
yarn generate-folder-thumbnails <source-folder> [options]
```

**Arguments:**

- `source-folder` - Path to the folder in `/public` containing images (e.g., "book", "gallery", "prints")

**Options:**

- `--output <path>` - Output folder path (default: `<source-folder>/thumbnails`)
- `--width <px>` - Thumbnail width in pixels (default: 100)
- `--height <px>` - Thumbnail height in pixels (optional, maintains aspect ratio if not specified)
- `--quality <1-100>` - JPEG quality (default: 90)
- `--format <ext>` - Output format: jpg, png, gif, webp (default: jpg)

**Examples:**

```bash
# Generate 100px wide thumbnails for book folder
yarn generate-folder-thumbnails book

# Generate 150x150px square thumbnails for gallery
yarn generate-folder-thumbnails gallery --width 150 --height 150

# Generate PNG thumbnails in custom output folder
yarn generate-folder-thumbnails prints --output prints/thumbnails --format png

# Generate high-quality thumbnails
yarn generate-folder-thumbnails about --quality 95 --width 200
```

**Features:**

- Supports multiple image formats (jpg, jpeg, png, gif, bmp, tiff, webp)
- Concurrent processing for faster generation
- Automatic aspect ratio preservation
- Clean output directory management
- Progress feedback during generation
- Error handling and validation

**Requirements:**

- ImageMagick must be installed on the system
- Node.js dependencies: `imagemagick`, `@supercharge/promise-pool`
