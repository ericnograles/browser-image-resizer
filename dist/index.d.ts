export interface Config {
  quality?: number
  maxWidth?: number
  maxHeight?: number
  autoRotate?: boolean
  debug?: boolean
  mimeType?: string
}


export function readAndCompressImage(file: File, userConfig?: Config): Promise<Blob>;
