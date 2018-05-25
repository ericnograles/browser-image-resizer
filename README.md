# browser-image-resizer

## Introduction

This library allows for cross-browser image downscaling and resizing utilizing `<canvas>`. The code was part of Ross Turner's [HTML5-ImageUploader](https://github.com/rossturner/HTML5-ImageUploader).  Note that this is meant to be a browser-only utility and will not work in Node.js.

## Demo

[https://browser-image-resizer-test.firebaseapp.com/](https://browser-image-resizer-test.firebaseapp.com/)

## Installation

* `npm install browser-image-resizer`
* `yarn add browser-image-resizer`

## Sample - Promises

```javascript
import readAndCompressImage from 'browser-image-resizer';

const config = {
  quality: 0.5,
  maxWidth: 800,
  maxHeight: 600,
  autoRotate: true,
  debug: true
};

// Note: A single file comes from event.target.files on <input>
readAndCompressImage(file, config)
  .then(resizedImage => {
    // Upload file to some Web API
    const url = `http://localhost:3001/upload`;
    const formData = new FormData();
    formData.append('images', resizedImage);
    const options = {
      method: 'POST',
      body: formData
    };

    return fetch(url, options);
  })
  .then(result => {
    // TODO: Handle the result
    console.log(result);
  });
```

## Sample - Async/Await

```javascript
import readAndCompressImage from 'browser-image-resizer';

const config = {
  quality: 0.7,
  width: 800,
  height: 600
};

// Note: A single file comes from event.target.files on <input>
async function uploadImage(file) {
  try {
    let resizedImage = await readAndCompressImage(file, config);

    const url = `http://localhost:3001/upload`;
    const formData = new FormData();
    formData.append('images', resizedImage);
    const options = {
      method: 'POST',
      body: formData
    };

    let result = await fetch(url, options);

    // TODO: Handle the result
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw(error);
  }
}
```

### readAndCompressImage(file, config) => Promise<Blob>

#### Inputs

* `file`: A File object, usually from an `<input>`
* `config`: See below

| Property Name        | Purpose           | Default Value  |
| ------------- |-------------| -----:|
| `quality`      | The quality of the JPEG | 0.5 |
| `maxWidth`      | The maximum width for the downscaled image | 800 |
| `maxHeight` | The maximum height for the downscaled image | 600 |
| `autoRotate` | Reads EXIF data on the image to determine orientation | true |
| `debug` | console.log image update operations | false |
| `mimeType` | specify image output type other than jpeg  | 'image/jpeg' |

### Outputs

A Promise that yields a JPEG Blob
