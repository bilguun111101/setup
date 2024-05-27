"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = void 0;
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
class Image extends _xsCoreNative._Image {
  constructor(props) {
    super(props);
  }
  static fromJson(json) {
    return new Image({
      ...json
    });
  }
}
exports.Image = Image;
//# sourceMappingURL=image.js.map