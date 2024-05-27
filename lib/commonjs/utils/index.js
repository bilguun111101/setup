"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpRequest = void 0;
var _xsCoreNative = require("@goodtechsoft/xs-core-native");
var _reactNative = require("react-native");
class HttpRequest extends _xsCoreNative.HttpRequest {
  uri = "https://app.xotsocial.mn/app";
  errorHandler = (statusCode, error) => {
    _reactNative.DeviceEventEmitter.emit("http.handler.error", {
      error: error,
      statusCode: statusCode
    });
  };
}
exports.HttpRequest = HttpRequest;
//# sourceMappingURL=index.js.map