const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const inputDir = path.join(process.cwd(), 'public/images');
const outputDir = path.join(process.cwd(), 'public/images/optimized');

async function ensureDirectoryExists(directory) {
  try {
    await fs.access(directory);
  } catch {
    await fs.mkdir(directory, { recursive: true });
  }
}

const optimizationConfig = {
  hero: { width: 1920, height: 1080, quality: 85 },
  collection: { width: 800, height: 1000, quality: 85 },
  product: { width: 800, height: 1000, quality: 85 },
  instagram: { width: 600, height: 600, quality: 85 },
  default: { width: 800, height: null, quality: 85 }
};

async function optimizeImage(inputPath, outputPath, options) {
  try {
    console.log(`📸 Optimizando: ${path.basename(inputPath)}`);
    
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Mantener el aspect ratio si no se especifica height
    const resizeOptions = {
      width: options.width,
      height: options.height,
      fit: 'cover',
      position: 'center'
    };

    // Crear versión WebP
    await image
      .resize(resizeOptions)
      .webp({ quality: options.quality })
      .toFile(outputPath.replace(/\.[^.]+$/, '.webp'));

    // Crear versión AVIF
    await image
      .resize(resizeOptions)
      .avif({ quality: options.quality })
      .toFile(outputPath.replace(/\.[^.]+$/, '.avif'));

    console.log(`✅ Optimizado: ${path.basename(inputPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error optimizando ${path.basename(inputPath)}:`, error);
    return false;
  }
}

async function getOptimizationConfig(filename) {
  if (filename.includes('hero')) return optimizationConfig.hero;
  if (filename.includes('collection')) return optimizationConfig.collection;
  if (filename.includes('product')) return optimizationConfig.product;
  if (filename.includes('instagram')) return optimizationConfig.instagram;
  return optimizationConfig.default;
}

async function processImages() {
  try {
    // Asegurar que los directorios existan
    await ensureDirectoryExists(outputDir);

    // Leer todos los archivos del directorio de entrada
    const files = await fs.readdir(inputDir);
    
    console.log('🚀 Iniciando optimización de imágenes...\n');

    // Filtrar solo archivos de imagen
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file) && 
      !file.includes('optimized')
    );

    if (imageFiles.length === 0) {
      console.log('⚠️ No se encontraron imágenes para optimizar');
      return;
    }

    console.log(`📁 Encontradas ${imageFiles.length} imágenes para optimizar\n`);

    // Procesar cada imagen
    const results = await Promise.all(
      imageFiles.map(async (file) => {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);
        const config = await getOptimizationConfig(file.toLowerCase());
        return optimizeImage(inputPath, outputPath, config);
      })
    );

    // Resumen
    const successful = results.filter(Boolean).length;
    const failed = results.length - successful;

    console.log('\n📊 Resumen de optimización:');
    console.log(`✅ ${successful} imágenes optimizadas correctamente`);
    if (failed > 0) console.log(`❌ ${failed} imágenes fallaron`);

  } catch (error) {
    console.error('❌ Error durante la optimización:', error);
  }
}

// Ejecutar el script
processImages();