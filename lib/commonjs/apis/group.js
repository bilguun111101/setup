"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suggestList = exports.ruleChange = exports.requestList = exports.removeUser = exports.removeGroup = exports.removeAdmin = exports.refuseAdmin = exports.privacyChange = exports.nameChange = exports.memberList = exports.leaveGroup = exports.join = exports.inviteMember = exports.inviteDecline = exports.inviteCancel = exports.inviteAdmin = exports.invitationList = exports.groupList = exports.get = exports.directPost = exports.descriptionChange = exports.deleteGroup = exports.declineAdmin = exports.create = exports.coverChange = exports.categoryList = exports.cancelRequest = exports.cancelAdminRequest = exports.approveAdmin = exports.adminList = exports.acceptMember = void 0;
var _models = require("../models");
var _utils = require("../utils");
var _xsUserNative = require("@goodtechsoft/xs-user-native");
const httpRequest = new _utils.HttpRequest();
const suggestList = async ({
  page,
  query
}) => {
  const {
    rows,
    count
  } = await httpRequest.get("/search/group-suggest", {
    page: page,
    limit: 10,
    query: query
  });
  return _models.Result.fromJson({
    rows: rows.map(row => new _models.Group(row)),
    count
  });
};
exports.suggestList = suggestList;
const requestList = async ({
  page,
  id,
  query
}) => {
  const {
    rows,
    count
  } = await httpRequest.get(`/groups/${id}/members/requests`, {
    page: page,
    limit: 10,
    query: query
  });
  return _models.Result.fromJson({
    rows: rows.map(row => new _xsUserNative.User(row)),
    count
  });
};
exports.requestList = requestList;
const categoryList = async ({
  page
}) => {
  const {
    rows,
    count
  } = await httpRequest.get("/groups/categories", {
    page: page,
    limit: 10
  });
  return _models.Result.fromJson({
    rows: rows.map(row => new _models.Category(row)),
    count
  });
};
exports.categoryList = categoryList;
const groupList = async ({
  page,
  isAdmin,
  query
}) => {
  const {
    rows,
    count
  } = await httpRequest.get("/groups/user-list", {
    page: page,
    isAdmin: isAdmin,
    query: query,
    limit: 10
  });
  return _models.Result.fromJson({
    rows: rows.map(row => new _models.Group(row)),
    count
  });
};
exports.groupList = groupList;
const memberList = async ({
  page,
  id,
  query
}) => {
  const {
    rows,
    count
  } = await httpRequest.get(`/groups/${id}/members`, {
    page: page,
    limit: 10,
    query: query
  });
  return _models.Result.fromJson({
    rows: rows.map(row => new _xsUserNative.User(row)),
    count
  });
};
exports.memberList = memberList;
const invitationList = async ({
  page,
  limit,
  id,
  query
}) => {
  const {
    rows,
    count
  } = await httpRequest.get(`/search/group/${id}/invitation-users`, {
    page: page,
    limit: limit,
    query: query
  });
  return _models.Result.fromJson({
    rows: rows.map(row => new _xsUserNative.User(row)),
    count
  });
};
exports.invitationList = invitationList;
const create = async data => {
  const res = await httpRequest.post("/groups", data);
  return res;
};
exports.create = create;
const descriptionChange = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/description`, data);
  return res;
};
exports.descriptionChange = descriptionChange;
const ruleChange = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/rule`, data);
  return res;
};
exports.ruleChange = ruleChange;
const privacyChange = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/privacy`, data);
  return res;
};
exports.privacyChange = privacyChange;
const coverChange = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/coverimage`, data);
  return res;
};
exports.coverChange = coverChange;
const join = async id => {
  const res = await httpRequest.post(`/groups/${id}/join`);
  return res;
};
exports.join = join;
const cancelRequest = async id => {
  const res = await httpRequest.post(`/groups/${id}/request-cancel`);
  return res;
};
exports.cancelRequest = cancelRequest;
const nameChange = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/name`, data);
  return res;
};
exports.nameChange = nameChange;
const get = async id => {
  const res = await httpRequest.get(`/groups/${id}`);
  return _models.Group.fromJson(res);
};
exports.get = get;
const deleteGroup = async id => {
  const res = await httpRequest.del(`/groups/${id}`);
  return res;
};
exports.deleteGroup = deleteGroup;
const acceptMember = async ({
  id,
  userId
}) => {
  const res = await httpRequest.post(`/groups/${id}/members/${userId}/accept`);
  return res;
};
exports.acceptMember = acceptMember;
const adminList = async ({
  page,
  id
}) => {
  const {
    rows,
    count
  } = await httpRequest.get(`/groups/${id}/admins`, {
    page: page,
    limit: 10
  });
  return _models.Result.fromJson({
    rows: rows.map(row => new _xsUserNative.User(row)),
    count
  });
};
exports.adminList = adminList;
const inviteAdmin = async ({
  id,
  userId
}) => {
  const res = await httpRequest.post(`/groups/${id}/admins/${userId}/invite`);
  return res;
};
exports.inviteAdmin = inviteAdmin;
const leaveGroup = async id => {
  const res = await httpRequest.del(`/groups/${id}/leave`);
  return res;
};
exports.leaveGroup = leaveGroup;
const removeUser = async (id, userId) => {
  const res = await httpRequest.del(`/groups/${id}/members/${userId}/remove`);
  return res;
};
exports.removeUser = removeUser;
const removeAdmin = async (id, userId) => {
  const res = await httpRequest.post(`/groups/${id}/admins/${userId}/remove`);
  return res;
};
exports.removeAdmin = removeAdmin;
const cancelAdminRequest = async (id, userId) => {
  const res = await httpRequest.post(`/groups/${id}/admins/${userId}/request-cancel`);
  return res;
};
exports.cancelAdminRequest = cancelAdminRequest;
const refuseAdmin = async id => {
  const res = await httpRequest.post(`/groups/${id}/admins/refuse`);
  return res;
};
exports.refuseAdmin = refuseAdmin;
const declineAdmin = async id => {
  const res = await httpRequest.post(`/groups/${id}/admins/request-decline`);
  return res;
};
exports.declineAdmin = declineAdmin;
const approveAdmin = async id => {
  const res = await httpRequest.post(`/groups/${id}/admins/request-approve`);
  return res;
};
exports.approveAdmin = approveAdmin;
const inviteMember = async ({
  id,
  data
}) => {
  const res = await httpRequest.post(`/groups/${id}/invite`, data);
  return res;
};
exports.inviteMember = inviteMember;
const inviteDecline = async id => {
  const res = await httpRequest.post(`/groups/${id}/invite/decline`);
  return res;
};
exports.inviteDecline = inviteDecline;
const inviteCancel = async ({
  id,
  data
}) => {
  const res = await httpRequest.post(`/groups/${id}/invite/cancel`, data);
  return res;
};
exports.inviteCancel = inviteCancel;
const removeGroup = async (id, userId) => {
  const res = await httpRequest.del(`/groups/${id}/members/${userId}/remove`);
  return res;
};
exports.removeGroup = removeGroup;
const directPost = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/direct-post`, data);
  return res;
};
exports.directPost = directPost;
//# sourceMappingURL=group.js.map