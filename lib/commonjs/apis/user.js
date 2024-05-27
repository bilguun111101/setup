"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unlikePage = exports.unfollow = exports.removeRequestCancel = exports.me = exports.likePage = exports.follow = void 0;
var _utils = require("../utils");
const httpRequest = new _utils.HttpRequest();
const me = async () => {
  const res = await httpRequest.get("/user/me");
  return res;
};
exports.me = me;
const unfollow = async userId => {
  const res = await httpRequest.post("/user/unfollow", {
    user: userId
  });
  return res;
};
exports.unfollow = unfollow;
const follow = async userId => {
  const res = await httpRequest.post("/user/follow", {
    user: userId
  });
  return res;
};

// bi ooriin ywuulsan req ustgana
exports.follow = follow;
const removeRequestCancel = async userId => {
  const res = await httpRequest.post("/user/request/cancel", {
    request: userId
  });
  return res;
};
exports.removeRequestCancel = removeRequestCancel;
const likePage = async id => {
  const res = await httpRequest.post(`/user/page/${id}/like`);
  return res;
};
exports.likePage = likePage;
const unlikePage = async id => {
  const res = await httpRequest.post(`/user/page/${id}/unlike`);
  return res;
};
exports.unlikePage = unlikePage;
//# sourceMappingURL=user.js.map