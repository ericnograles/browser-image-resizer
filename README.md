# browser-image-resizer

## Introduction

This library allows for cross-browser image downscaling and resizing utilizing `<canvas>`. The code was part of Ross Turner's [HTML5-ImageUploader](https://github.com/rossturner/HTML5-ImageUploader).  Note that this is meant to be a browser-only utility and will not work in Node.js.

## Installation

`npm install browser-image-resizer`
`yarn add browser-image-resizer`

## Usage

`import readAndCompressImage from 'browser-image-resizer';`
`readAndCompressImage(file, config)`

### readAndCompressImage(file, config) => Promise<Blob>

#### Inputs

* `file`: A File object, usually from an `<input>`
* `config`: See below

| Property Name        | Purpose           | Default Value  |
| ------------- |-------------| -----:|
| `quality`      | The quality of the JPEG | 0.5 |
| `maxWidth`      | The maximum width for the downscaled image | 800 |
| `maxHeight` | The maximum height for the downscaled image | 600 |

### Outputs

A Promise that yields a JPEG Blob