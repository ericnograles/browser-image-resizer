import { initializeOrGetImg } from './browser_operations';
import { scaleImage } from './scaling_operations';

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
    let img = initializeOrGetImg();
    let reader = new FileReader();
    let config = Object.assign({}, DEFAULT_CONFIG, userConfig);

    reader.onload = function(e) {
      img.onerror = function() {
        reject("cannot load image.");
      }
      img.onload = function() {
        let scaleImageOptions = { img, config }
        try {
          let blob = scaleImage(scaleImageOptions);
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
