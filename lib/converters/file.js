'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var thumbnailURL = function thumbnailURL(width, height, q, scaleToFit, f) {
  var url = this.attributes.url;
  if (!url) {
    throw new Error('Invalid url.');
  }
  if (!width || !height || width <= 0 || height <= 0) {
    throw new Error('Invalid width or height value.');
  }
  var quality = q || 100;
  if (quality <= 0 || quality > 100) {
    throw new Error('Invalid quality value.');
  }
  var fmt = f || 'png';
  var mode = scaleToFit ? 2 : 1;
  return url + '?imageView/' + mode + '/w/' + width + '/h/' + height + '/q/' + quality + '/format/' + fmt;
};

exports.default = function (file) {
  if (file && file.get('url')) {
    var _file$toJSON = file.toJSON(),
        id = _file$toJSON.id,
        metaData = _file$toJSON.metaData,
        mime_type = _file$toJSON.mime_type,
        name = _file$toJSON.name,
        objectId = _file$toJSON.objectId,
        url = _file$toJSON.url;

    return {
      id: id,
      metaData: metaData,
      mime_type: mime_type,
      name: name,
      objectId: objectId,
      url: url,
      thumbnail_80_80: thumbnailURL.bind(file)(80, 80, 100, false),
      thumbnail_160_160: thumbnailURL.bind(file)(160, 160, 100, false),
      thumbnail_300_300: thumbnailURL.bind(file)(300, 300, 100, false),
      thumbnail_600_600: thumbnailURL.bind(file)(600, 600, 100, false)
    };
  }
  return undefined;
};