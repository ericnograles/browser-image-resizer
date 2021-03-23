import ExifReader from 'exifreader';
import { initializeOrGetImg } from './browser_operations';
import { scaleImage } from './scaling_operations';
import { dataURItoBuffer } from './data_operations';

const DEFAULT_CONFIG = {
  quality: 0.5,
  maxWidth: 800,
  maxHeight: 600,
  autoRotate: true,
  debug: false,
  mimeType: 'image/jpeg'
};

export function readAndCompressImage(file, userConfig) {
  return new Promise((resolve, reject) => {
    let img = initializeOrGetImg()
    let reader = new FileReader();
    let config = Object.assign({}, DEFAULT_CONFIG, userConfig);

    reader.onload = function(e) {
      img.onerror = function() {
        reject("cannot load image.");
      }
      img.onload = function() {
        let scaleImageOptions = { img, config }
        if (config.autoRotate) {
          if (config.debug)
            console.log(
              'browser-image-resizer: detecting image orientation...'
            );
          let buffer = dataURItoBuffer(img.src);
          let Orientation = {};
          try {
            const Result = ExifReader.load(buffer);
            Orientation = Result.Orientation || {};
          } catch (err) {
            console.error('browser-image-resizer: Error getting orientation')
            console.error(err)
          }
          if (config.debug) {
            console.log(
              'browser-image-resizer: image orientation from EXIF tag = ' +
                Orientation
            );
          }
          scaleImageOptions.orientation = Orientation.value
        } else if (config.debug) {
            console.log(
              'browser-image-resizer: ignoring EXIF orientation tag because autoRotate is false...'
            );
        }
        try {
          let blob = scaleImage(scaleImageOptions)
          resolve(blob)
        } catch (err) {
          reject(err) 
        }
      };
      img.src = e.target.result;
    };

    try {
      reader.onerror = function() {
        reject("cannot read image file.");
      }
      reader.readAsDataURL(file);
    } catch (err) {
      reject(err)
    }
  });
}
