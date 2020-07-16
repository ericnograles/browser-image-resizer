# Contributing to browser-image-resizer

## Overview

Thanks for helping to shake out any issues with this library! The setup is very small, but I figured I'd outline your typical build environment should you choose to contribute.

## Development Environment

### Prerequisites

- Node.js LTS
- `npm i -g yarn`

### Setup

1. Clone this repo
1. `yarn install`
1. `yarn build` to generate the dist/index.js file

### Symlinking

To test this locally on a web app of your choosing, you'll want to symlink this library in your NPM. That way, any changes locally can be reflected in your test app.

1. In this directory, execute `npm link`
1. In your test web app, execute `npm link browser-image-resizer`

Now any changes (via `yarn build` above) will be reflected in your web app.

### Removing Symlinks

1. In your test web app, execute `npm unlink --no-save browser-image-resizer`
1. In this directory, execute `npm unlink`
