# browser-image-resizer

A tiny (~7kb uncompressed, ~1kb compressed) browser-based library to downscale and/or resize images using `<canvas>`.

## Introduction

The code was part of Ross Turner's [HTML5-ImageUploader](https://github.com/rossturner/HTML5-ImageUploader).  Note that this is meant to be a browser-only utility and will not work in Node.js.

## Demo

- [Code Sandbox - NPM](https://codesandbox.io/s/6x20vw7l4r)
- [Code Sandbox - In-Browser](https://codesandbox.io/s/nroxwpn21p)

## Installation

### NPM/Yarn

- `npm install browser-image-resizer`
- `yarn add browser-image-resizer`

### Browser

```
<script src="https://cdn.jsdelivr.net/gh/ericnograles/browser-image-resizer@2.4.0/dist/index.js"></script>
```

## Usage

### NPM/Yarn

#### Promises

```javascript
import { readAndCompressImage } from 'browser-image-resizer';

const config = {
  quality: 0.5,
  maxWidth: 800,
  maxHeight: 600,
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

#### Async/Await

```javascript
import { readAndCompressImage } from 'browser-image-resizer';

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

### Browser

#### Promises

```javascript
const config = {
  quality: 0.5,
  maxWidth: 800,
  maxHeight: 600,
  debug: true
};

// Note: A single file comes from event.target.files on <input>
BrowserImageResizer.readAndCompressImage(file, config)
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

#### Async/Await

```javascript

const config = {
  quality: 0.7,
  width: 800,
  height: 600
};

// Note: A single file comes from event.target.files on <input>
async function uploadImage(file) {
  try {
    let resizedImage = await BrowserImageResizer.readAndCompressImage(file, config);

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
| `quality`      | The quality of the image | 0.5 |
| `maxWidth`      | The maximum width for the downscaled image | 800 |
| `maxHeight` | The maximum height for the downscaled image | 600 |
| `autoRotate` | Reads EXIF data on the image to determine orientation | true |
| `debug` | console.log image update operations | false |
| `mimeType` | specify image output type other than jpeg  | 'image/jpeg' |

### Outputs

A Promise that yields an Image Blob

## Contributing

The fastest way to contribute back is to fork the repl.it of this repo (https://replit.com/@grales/browser-image-resizer). Please open any Issues if you have trouble spinning it up.

### repl.it First-time Setup

Upon forking of the repl.it, open a new Shell and follow these instructions:

1. Execute `npm link` at the top `~/browser-image-resizer` folder
1. Execute `cd tests/bir-vue`
2. Execute `npm i && npm link browser-image-resizer && npm run serve`
3. Your repl.it should automatically boot to a webview of a Vue 3 CLI SPA
  - This SPA will point to your built copy of browser-image-resizer that runs automatically when the repl.it boots
4. Modify any code at the top level `src/` and it will reflect on your Vue 3 CLI SPA test app

### repl.it Specifics

-  The repl.it above is configured to run the `dev` script of the library, which is a webpack-dev-server that auto-generates the `dist/` library which is the entry point of this library
- The subsequent commands gives you an actual web application on which to verify your changes
- If you prefer, you can do this locally as well, but the repl.it ensures a faster and more consistent onboarding
   