import type { IGroup } from "../interfaces/group";
import type { ICategory } from "../interfaces/category";
import { Result, Category, Group } from "../models";
import { HttpRequest } from "../utils";
import { type IUser, User } from "@goodtechsoft/xs-user-native";

const httpRequest = new HttpRequest();

export const suggestList = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}) => {
  const { rows, count } = await httpRequest.get("/search/group-suggest", {
    page: page,
    limit: 10,
    query: query,
  });

  return Result.fromJson<IGroup>({
    rows: rows.map((row: IGroup) => new Group(row)),
    count,
  });
};

export const requestList = async ({
  page,
  id,
  query,
}: {
  page: number;
  id: string;
  query?: string;
}) => {
  const { rows, count } = await httpRequest.get(
    `/groups/${id}/members/requests`,
    {
      page: page,
      limit: 10,
      query: query,
    },
  );

  return Result.fromJson<IUser>({
    rows: rows.map((row: IUser) => new User(row)),
    count,
  });
};

export const categoryList = async ({ page }: { page: number }) => {
  const { rows, count } = await httpRequest.get("/groups/categories", {
    page: page,
    limit: 10,
  });

  return Result.fromJson<ICategory>({
    rows: rows.map((row: ICategory) => new Category(row)),
    count,
  });
};

export const groupList = async ({
  page,
  isAdmin,
  query,
}: {
  page: number;
  isAdmin?: boolean;
  query?: string;
}) => {
  const { rows, count } = await httpRequest.get("/groups/user-list", {
    page: page,
    isAdmin: isAdmin,
    query: query,
    limit: 10,
  });

  return Result.fromJson<IGroup>({
    rows: rows.map((row: IGroup) => new Group(row)),
    count,
  });
};

export const memberList = async ({
  page,
  id,
  query,
}: {
  page: number;
  id: string;
  query?: string;
}) => {
  const { rows, count } = await httpRequest.get(`/groups/${id}/members`, {
    page: page,
    limit: 10,
    query: query,
  });

  return Result.fromJson<IUser>({
    rows: rows.map((row: IUser) => new User(row)),
    count,
  });
};

export const invitationList = async ({
  page,
  limit,
  id,
  query,
}: {
  page: number;
  limit: number;
  id: string;
  query: string;
}) => {
  const { rows, count } = await httpRequest.get(
    `/search/group/${id}/invitation-users`,
    {
      page: page,
      limit: limit,
      query: query,
    },
  );

  return Result.fromJson<IUser>({
    rows: rows.map((row: IUser) => new User(row)),
    count,
  });
};

export const create = async (data: any) => {
  const res = await httpRequest.post("/groups", data);
  return res;
};

export const descriptionChange = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const res = await httpRequest.put(`/groups/${id}/description`, data);
  return res;
};

export const ruleChange = async ({ id, data }: { id: string; data: any }) => {
  const res = await httpRequest.put(`/groups/${id}/rule`, data);
  return res;
};

export const privacyChange = async ({
  id,
  data,
}: {
  id: string;
  data: any;
}) => {
  const res = await httpRequest.put(`/groups/${id}/privacy`, data);
  return res;
};

export const coverChange = async ({ id, data }: { id: string; data: any }) => {
  const res = await httpRequest.put(`/groups/${id}/coverimage`, data);
  return res;
};

export const join = async (id: string) => {
  const res = await httpRequest.post(`/groups/${id}/join`);
  return res;
};

export const cancelRequest = async (id: string) => {
  const res = await httpRequest.post(`/groups/${id}/request-cancel`);
  return res;
};

export const nameChange = async ({ id, data }: { id: string; data: any }) => {
  const res = await httpRequest.put(`/groups/${id}/name`, data);
  return res;
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/groups/${id}`);
  return Group.fromJson(res);
};

export const deleteGroup = async (id: string) => {
  const res = await httpRequest.del(`/groups/${id}`);
  return res;
};

export const acceptMember = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const res = await httpRequest.post(`/groups/${id}/members/${userId}/accept`);
  return res;
};

export const adminList = async ({ page, id }: { page: number; id: string }) => {
  const { rows, count } = await httpRequest.get(`/groups/${id}/admins`, {
    page: page,
    limit: 10,
  });

  return Result.fromJson<IUser>({
    rows: rows.map((row: IUser) => new User(row)),
    count,
  });
};

export const inviteAdmin = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const res = await httpRequest.post(`/groups/${id}/admins/${userId}/invite`);
  return res;
};

export const leaveGroup = async (id: string) => {
  const res = await httpRequest.del(`/groups/${id}/leave`);
  return res;
};

export const removeUser = async (id: string, userId: string) => {
  const res = await httpRequest.del(`/groups/${id}/members/${userId}/remove`);
  return res;
};

export const removeAdmin = async (id: string, userId: string) => {
  const res = await httpRequest.post(`/groups/${id}/admins/${userId}/remove`);
  return res;
};

export const cancelAdminRequest = async (id: string, userId: string) => {
  const res = await httpRequest.post(
    `/groups/${id}/admins/${userId}/request-cancel`,
  );
  return res;
};

export const refuseAdmin = async (id: string) => {
  const res = await httpRequest.post(`/groups/${id}/admins/refuse`);
  return res;
};

export const declineAdmin = async (id: string) => {
  const res = await httpRequest.post(`/groups/${id}/admins/request-decline`);
  return res;
};

export const approveAdmin = async (id: string) => {
  const res = await httpRequest.post(`/groups/${id}/admins/request-approve`);
  return res;
};

export const inviteMember = async ({
  id,
  data,
}: {
  id: string;
  data: { user: string };
}) => {
  const res = await httpRequest.post(`/groups/${id}/invite`, data);
  return res;
};

export const inviteDecline = async (id: string) => {
  const res = await httpRequest.post(`/groups/${id}/invite/decline`);
  return res;
};

export const inviteCancel = async ({
  id,
  data,
}: {
  id: string;
  data: { user: string };
}) => {
  const res = await httpRequest.post(`/groups/${id}/invite/cancel`, data);
  return res;
};

export const removeGroup = async (id: string, userId: string) => {
  const res = await httpRequest.del(`/groups/${id}/members/${userId}/remove`);
  return res;
};

export const directPost = async ({ id, data }: { id: string; data: any }) => {
  const res = await httpRequest.put(`/groups/${id}/direct-post`, data);
  return res;
};
