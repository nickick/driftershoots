import { PromisePool } from '@supercharge/promise-pool';
import fs from 'fs';
import imagemagick from 'imagemagick';
import path from 'path';

interface ThumbnailOptions {
  sourceFolder: string;
  outputFolder?: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: string;
}

/**
 * Generates thumbnails for all images in a specified folder
 * @param options - Configuration options for thumbnail generation
 */
const generateThumbnails = async (options: ThumbnailOptions) => {
  const {
    sourceFolder,
    outputFolder,
    width = 100,
    height,
    quality = 90,
    format = 'jpg',
  } = options;

  // Validate source folder exists
  const sourcePath = path.join(process.cwd(), 'public', sourceFolder);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source folder does not exist: ${sourcePath}`);
  }

  // Create output folder
  const outputPath = outputFolder
    ? path.join(process.cwd(), 'public', outputFolder)
    : path.join(sourcePath, 'thumbnails');

  // Remove existing thumbnails folder if it exists
  if (fs.existsSync(outputPath)) {
    fs.rmSync(outputPath, { recursive: true, force: true });
  }
  fs.mkdirSync(outputPath, { recursive: true });

  // Get all image files from source folder
  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.tiff',
    '.webp',
  ];
  const files = fs.readdirSync(sourcePath).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });

  if (files.length === 0) {
    console.log(`No image files found in ${sourceFolder}`);
    return;
  }

  console.log(`Found ${files.length} image files in ${sourceFolder}`);

  // Generate thumbnails with concurrency control
  await PromisePool.for(files)
    .withConcurrency(5)
    .process(async (filename) => {
      const sourceFilePath = path.join(sourcePath, filename);
      const nameWithoutExt = path.parse(filename).name;
      const thumbnailPath = path.join(
        outputPath,
        `${nameWithoutExt}.${format}`
      );

      return new Promise<void>((resolve, reject) => {
        const resizeOptions: any = {
          srcPath: sourceFilePath,
          dstPath: thumbnailPath,
          width: width,
          quality: quality,
        };

        // If height is specified, use it; otherwise let ImageMagick calculate it
        if (height) {
          resizeOptions.height = height;
        }

        imagemagick.resize(resizeOptions, (err) => {
          if (err) {
            console.error(`Error processing ${filename}:`, err);
            reject(err);
          } else {
            console.log(`✓ Generated thumbnail for ${filename}`);
            resolve();
          }
        });
      });
    });

  console.log(
    `\n✅ Successfully generated ${files.length} thumbnails in ${outputPath}`
  );
};

/**
 * CLI interface for the thumbnail generator
 */
const main = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage: yarn generate-folder-thumbnails <source-folder> [options]

Arguments:
  source-folder    Path to the folder in /public containing images (e.g., "book", "gallery")

Options:
  --output <path>  Output folder path (default: <source-folder>/thumbnails)
  --width <px>     Thumbnail width in pixels (default: 100)
  --height <px>    Thumbnail height in pixels (optional, maintains aspect ratio if not specified)
  --quality <1-100> JPEG quality (default: 90)
  --format <ext>   Output format: jpg, png, gif, webp (default: jpg)

Examples:
  yarn generate-folder-thumbnails book
  yarn generate-folder-thumbnails gallery --width 150 --height 150
  yarn generate-folder-thumbnails prints --output prints/thumbnails --format png
    `);
    return;
  }

  const sourceFolder = args[0];
  const options: ThumbnailOptions = { sourceFolder };

  // Parse command line options
  for (let i = 1; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];

    switch (flag) {
      case '--output':
        options.outputFolder = value;
        break;
      case '--width':
        options.width = parseInt(value);
        break;
      case '--height':
        options.height = parseInt(value);
        break;
      case '--quality':
        options.quality = parseInt(value);
        break;
      case '--format':
        options.format = value;
        break;
      default:
        console.warn(`Unknown option: ${flag}`);
    }
  }

  try {
    await generateThumbnails(options);
  } catch (error) {
    console.error('❌ Error generating thumbnails:', error);
    process.exit(1);
  }
};

// Run the script if called directly
if (require.main === module) {
  main();
}

export { generateThumbnails };
export type { ThumbnailOptions };
