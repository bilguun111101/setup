"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImage = exports.image = exports.avatar = void 0;
var _utils = require("../utils");
/* eslint-disable prettier/prettier */

const httpRequest = new _utils.HttpRequest();
const image = async data => {
  const res = await httpRequest.upload("/media/image/USER/upload", data);
  return res;
};
exports.image = image;
const avatar = async data => {
  const res = await httpRequest.upload("/media/audio/upload", data);
  return res;
};
exports.avatar = avatar;
const uploadImage = async (data, type) => {
  //general/upload
  const res = await httpRequest.upload(`/media/image/${type}/upload`, data);
  return res;
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=media.js.map