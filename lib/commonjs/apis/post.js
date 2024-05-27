"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postRequestList = exports.groupPostList = exports.deletePost = exports.approvePost = void 0;
var _result = require("../models/result");
var _xsPostNative = require("@goodtechsoft/xs-post-native");
var _utils = require("../utils");
const httpRequest = new _utils.HttpRequest();
const groupPostList = async (nextPage, groupId) => {
  const {
    rows,
    nextPage: _nextPage
  } = await httpRequest.get(`/newsfeed/groups/${groupId}`, {
    cursor: nextPage
  });
  return _result.Result.fromJson({
    rows: rows.map(row => _xsPostNative.Post.fromJson(row)),
    count: rows.nextPage,
    nextPage: _nextPage
  });
};
exports.groupPostList = groupPostList;
const postRequestList = async ({
  page,
  id,
  limit
}) => {
  const {
    rows,
    count
  } = await httpRequest.get(`/groups/${id}/posts/requests`, {
    page: page,
    limit: limit
  });
  return _result.Result.fromJson({
    rows: rows.map(row => new _xsPostNative.Post(row)),
    count
  });
};
exports.postRequestList = postRequestList;
const approvePost = async (id, postId) => {
  const res = await httpRequest.post(`/groups/${id}/posts/${postId}/request-accept`);
  return res;
};
exports.approvePost = approvePost;
const deletePost = async id => {
  const res = await httpRequest.del(`/post/${id}`);
  return res;
};
exports.deletePost = deletePost;
//# sourceMappingURL=post.js.map