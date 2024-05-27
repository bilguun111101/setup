/* eslint-disable prettier/prettier */
import { HttpRequest } from "../utils";
const httpRequest = new HttpRequest();
export const image = async data => {
  const res = await httpRequest.upload("/media/image/USER/upload", data);
  return res;
};
export const avatar = async data => {
  const res = await httpRequest.upload("/media/audio/upload", data);
  return res;
};
export const uploadImage = async (data, type) => {
  //general/upload
  const res = await httpRequest.upload(`/media/image/${type}/upload`, data);
  return res;
};
//# sourceMappingURL=media.js.map