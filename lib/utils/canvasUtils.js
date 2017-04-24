'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scaleCanvas = scaleCanvas;
exports.getRoundedScaledCanvas = getRoundedScaledCanvas;
function scaleCanvas(canvas) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : canvas.width;
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : canvas.height;

  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;

  var retCanvas = document.createElement('canvas');
  var retCtx = retCanvas.getContext('2d');
  retCanvas.width = width;
  retCanvas.height = height;
  retCtx.drawImage(canvas, 0, 0, canvasWidth, canvasHeight, 0, 0, width, height);
  return retCanvas;
}

function getRoundedScaledCanvas(sourceCanvas, width, height) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var sWidth = sourceCanvas.width;
  var sHeight = sourceCanvas.height;
  context.imageSmoothingEnabled = true;

  canvas.width = width;
  canvas.height = height;

  context.drawImage(sourceCanvas, 0, 0, sWidth, sHeight, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
  context.fill();
  return canvas;
}