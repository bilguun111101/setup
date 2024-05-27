"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.me = void 0;
var _utils = require("../utils");
const httpRequest = new _utils.HttpRequest();
const me = async () => {
  const res = await httpRequest.get("/user/me");
  return res;
};
exports.me = me;
//# sourceMappingURL=auth.js.map