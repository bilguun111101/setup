import type { IPost } from "@goodtechsoft/xs-post-native/lib/typescript/interfaces/post";
import { Result } from "../models/result";
import { Post } from "@goodtechsoft/xs-post-native";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const groupPostList = async (
  nextPage: string | undefined,
  groupId: string,
) => {
  const { rows, nextPage: _nextPage } = await httpRequest.get(
    `/newsfeed/groups/${groupId}`,
    {
      cursor: nextPage,
    },
  );

  return Result.fromJson<IPost>({
    rows: rows.map((row: IPost) => Post.fromJson(row)),
    count: rows.nextPage,
    nextPage: _nextPage,
  });
};

export const postRequestList = async ({
  page,
  id,
  limit,
}: {
  page: number;
  id: string;
  limit?: number
}) => {
  const { rows, count } = await httpRequest.get(
    `/groups/${id}/posts/requests`,
    {
      page: page,
      limit: limit,
    },
  );

  return Result.fromJson<IPost>({
    rows: rows.map((row: IPost) => new Post(row)),
    count,
  });
};

export const approvePost = async (id: string, postId: string) => {
  const res = await httpRequest.post(`/groups/${id}/posts/${postId}/request-accept`);
  return res;
};

export const deletePost = async (id: string) => {
  const res = await httpRequest.del(`/post/${id}`);
  return res;
};