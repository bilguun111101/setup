"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeFormat = void 0;
var _format = require("date-fns/format");
const timeFormat = time => {
  if (!time) {
    return null;
  }
  const formattedTime = (0, _format.format)(new Date(time || ""), "yyyy-MM-dd");
  return formattedTime;
};
exports.timeFormat = timeFormat;
//# sourceMappingURL=timeformat.js.map