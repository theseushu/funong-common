'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var REST_KEY = 'a32257d72fc19975701feac6c6ab3743';

var locationThumbnail = exports.locationThumbnail = function locationThumbnail(_ref, name) {
  var longitude = _ref.longitude,
      latitude = _ref.latitude;
  return {
    thumbnail: 'http://restapi.amap.com/v3/staticmap?location=' + longitude + ',' + latitude + '&zoom=10&size=400*300&markers=small,0x0000FF,:' + longitude + ',' + latitude + '&key=' + REST_KEY,
    url: 'http://uri.amap.com/marker?position=' + longitude + ',' + latitude + '&name=' + (name || '地址') + '&coordinate=gaode&callnative=0'
  };
};

// export const distance = (source, target) => {
//   if (!window || !window.AMap) {
//     return null;
//   }
//   const sourceLnglat = new window.AMap.LngLat(source.longitude, source.latitude);
//   return sourceLnglat.distance([target.longitude, target.latitude]);
// };

var distance = exports.distance = function distance(source, target) {
  var startLatitude = source.latitude;
  var startLongitude = source.longitude;
  var endLatitude = target.latitude;
  var endLongitude = target.longitude;

  var R = 12742001.579854401;
  var P = 0.01745329251994329;
  var lon1 = P * startLongitude;
  var lat1 = P * startLatitude;
  var lon2 = P * endLongitude;
  var lat2 = P * endLatitude;
  var d1 = Math.sin(lon1);
  var d2 = Math.sin(lat1);
  var d3 = Math.cos(lon1);
  var d4 = Math.cos(lat1);
  var d5 = Math.sin(lon2);
  var d6 = Math.sin(lat2);
  var d7 = Math.cos(lon2);
  var d8 = Math.cos(lat2);
  var tmp = Math.sqrt((d4 * d3 - d8 * d7) * (d4 * d3 - d8 * d7) + (d4 * d1 - d8 * d5) * (d4 * d1 - d8 * d5) + (d2 - d6) * (d2 - d6)); // eslint-disable-line
  return Math.asin(tmp / 2.0) * R;
};