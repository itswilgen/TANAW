import type { ComponentProps } from 'react'
import type { PhotoName } from '../../data/photos.generated'
import { getImage } from '../../lib/images'

interface Props extends Omit<ComponentProps<'img'>, 'src' | 'srcSet' | 'width' | 'height'> {
  name: PhotoName
  alt: string
  /** Responsive `sizes` attribute, so the browser picks the smallest file that looks sharp. */
  sizes: string
  priority?: boolean
}

/** Responsive WebP with intrinsic width/height (no layout shift). Lazy unless `priority`. */
export function Image({ name, alt, sizes, priority = false, ...rest }: Props) {
  const img = getImage(name)
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      {...rest}
    />
  )
}
