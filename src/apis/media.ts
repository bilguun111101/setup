/* eslint-disable prettier/prettier */
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const image = async (data: FormData) => {
  const res = await httpRequest.upload(
    "/media/image/USER/upload",
    data as unknown as { file: Blob },
  );
  return res;
};

export const avatar = async (data: FormData) => {
  const res = await httpRequest.upload(
    "/media/audio/upload",
    data as unknown as { file: Blob },
  );
  return res;
};

export const uploadImage = async (data: FormData, type: string) => {
  //general/upload
  const res = await httpRequest.upload(
    `/media/image/${type}/upload`,
    data as unknown as { file: Blob },
  );
  return res;
};
