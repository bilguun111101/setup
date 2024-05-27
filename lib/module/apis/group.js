import { Result, Category, Group } from "../models";
import { HttpRequest } from "../utils";
import { User } from "@goodtechsoft/xs-user-native";
const httpRequest = new HttpRequest();
export const suggestList = async ({
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
  return Result.fromJson({
    rows: rows.map(row => new Group(row)),
    count
  });
};
export const requestList = async ({
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
  return Result.fromJson({
    rows: rows.map(row => new User(row)),
    count
  });
};
export const categoryList = async ({
  page
}) => {
  const {
    rows,
    count
  } = await httpRequest.get("/groups/categories", {
    page: page,
    limit: 10
  });
  return Result.fromJson({
    rows: rows.map(row => new Category(row)),
    count
  });
};
export const groupList = async ({
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
  return Result.fromJson({
    rows: rows.map(row => new Group(row)),
    count
  });
};
export const memberList = async ({
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
  return Result.fromJson({
    rows: rows.map(row => new User(row)),
    count
  });
};
export const invitationList = async ({
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
  return Result.fromJson({
    rows: rows.map(row => new User(row)),
    count
  });
};
export const create = async data => {
  const res = await httpRequest.post("/groups", data);
  return res;
};
export const descriptionChange = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/description`, data);
  return res;
};
export const ruleChange = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/rule`, data);
  return res;
};
export const privacyChange = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/privacy`, data);
  return res;
};
export const coverChange = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/coverimage`, data);
  return res;
};
export const join = async id => {
  const res = await httpRequest.post(`/groups/${id}/join`);
  return res;
};
export const cancelRequest = async id => {
  const res = await httpRequest.post(`/groups/${id}/request-cancel`);
  return res;
};
export const nameChange = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/name`, data);
  return res;
};
export const get = async id => {
  const res = await httpRequest.get(`/groups/${id}`);
  return Group.fromJson(res);
};
export const deleteGroup = async id => {
  const res = await httpRequest.del(`/groups/${id}`);
  return res;
};
export const acceptMember = async ({
  id,
  userId
}) => {
  const res = await httpRequest.post(`/groups/${id}/members/${userId}/accept`);
  return res;
};
export const adminList = async ({
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
  return Result.fromJson({
    rows: rows.map(row => new User(row)),
    count
  });
};
export const inviteAdmin = async ({
  id,
  userId
}) => {
  const res = await httpRequest.post(`/groups/${id}/admins/${userId}/invite`);
  return res;
};
export const leaveGroup = async id => {
  const res = await httpRequest.del(`/groups/${id}/leave`);
  return res;
};
export const removeUser = async (id, userId) => {
  const res = await httpRequest.del(`/groups/${id}/members/${userId}/remove`);
  return res;
};
export const removeAdmin = async (id, userId) => {
  const res = await httpRequest.post(`/groups/${id}/admins/${userId}/remove`);
  return res;
};
export const cancelAdminRequest = async (id, userId) => {
  const res = await httpRequest.post(`/groups/${id}/admins/${userId}/request-cancel`);
  return res;
};
export const refuseAdmin = async id => {
  const res = await httpRequest.post(`/groups/${id}/admins/refuse`);
  return res;
};
export const declineAdmin = async id => {
  const res = await httpRequest.post(`/groups/${id}/admins/request-decline`);
  return res;
};
export const approveAdmin = async id => {
  const res = await httpRequest.post(`/groups/${id}/admins/request-approve`);
  return res;
};
export const inviteMember = async ({
  id,
  data
}) => {
  const res = await httpRequest.post(`/groups/${id}/invite`, data);
  return res;
};
export const inviteDecline = async id => {
  const res = await httpRequest.post(`/groups/${id}/invite/decline`);
  return res;
};
export const inviteCancel = async ({
  id,
  data
}) => {
  const res = await httpRequest.post(`/groups/${id}/invite/cancel`, data);
  return res;
};
export const removeGroup = async (id, userId) => {
  const res = await httpRequest.del(`/groups/${id}/members/${userId}/remove`);
  return res;
};
export const directPost = async ({
  id,
  data
}) => {
  const res = await httpRequest.put(`/groups/${id}/direct-post`, data);
  return res;
};
//# sourceMappingURL=group.js.map