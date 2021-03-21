export function initializeOrGetImg () {
  if (!img) {
    img = document.createElement('img');
  }
  return img
}

export function initializeOrGetCanvas () {
  if (!canvas) {
    canvas = document.createElement('canvas');
  }
  return canvas
}
