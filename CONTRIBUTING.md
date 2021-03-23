# Contributing to browser-image-resizer

## Overview

Thanks for helping to shake out any issues with this library! The setup is very small, but I figured I'd outline your typical build environment should you choose to contribute.

## Development Environment

### Prerequisites

- Node.js 14.16.0 and above

### Setup

1. Clone this repo
1. `npm i`
1. `npm run dev` to run a webpack-dev-server + babel which will autoreload the library on changes

### Symlinking

To test this locally on a web app of your choosing, you'll want to symlink this library in your NPM. That way, any changes locally can be reflected in your test app.

1. In this directory, execute `npm link`
1. Go to `tests/bir-vue`
1. Execute `npm i`
1. Execute `npm link browser-image-resizer`

Now any changes (via `npm run dev` above) will be reflected in the test web app that ships with this library.

### Removing Symlinks

1. Go to `tests/bir-vue`
1. Execute `npm unlink --no-save browser-image-resizer`
1. In the top level `browser-image-resizer` directory, execute `npm unlink`
