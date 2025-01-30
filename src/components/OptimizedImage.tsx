import Image from 'next/image';

type OptimizedImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

export default function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  fill = false,
  width,
  height
}: OptimizedImageProps) {
  // Convierte la ruta de la imagen a .webp
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return (
    <Image
      src={`/images/optimized${webpSrc}`}
      alt={alt}
      className={className}
      priority={priority}
      fill={fill}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={85}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
}