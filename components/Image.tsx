import NextImage, { ImageLoaderProps } from 'next/image'

type ImageProps = {
  layout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  src: string
  width: number
  height?: never
  aspectRatio: '1:1' | '4:3' | '16:9'
  fit?: 'pad' | 'fill' | 'crop'
}

function calcAspectRatio(width: number, aspectRatio: string): number {
  const ratio = +aspectRatio.split(':')[0] / +aspectRatio.split(':')[1]
  return width / ratio
}

export default function Image({ layout = 'responsive', src, width, aspectRatio, fit = 'pad' }: ImageProps) {
  const height = calcAspectRatio(width, aspectRatio)

  const loader = (args: ImageLoaderProps): string => {
    return args.src
  }
  console.log(src, width, aspectRatio, height)
  return (
    <NextImage
      layout={layout}
      src={`${src}?h=${height}&w=${width}&fit=${fit}`}
      width={width}
      height={height}
      loader={loader}
    />
  )
}