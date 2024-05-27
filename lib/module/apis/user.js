import { HttpRequest } from "../utils";
const httpRequest = new HttpRequest();
export const me = async () => {
  const res = await httpRequest.get("/user/me");
  return res;
};
export const unfollow = async userId => {
  const res = await httpRequest.post("/user/unfollow", {
    user: userId
  });
  return res;
};
export const follow = async userId => {
  const res = await httpRequest.post("/user/follow", {
    user: userId
  });
  return res;
};

// bi ooriin ywuulsan req ustgana
export const removeRequestCancel = async userId => {
  const res = await httpRequest.post("/user/request/cancel", {
    request: userId
  });
  return res;
};
export const likePage = async id => {
  const res = await httpRequest.post(`/user/page/${id}/like`);
  return res;
};
export const unlikePage = async id => {
  const res = await httpRequest.post(`/user/page/${id}/unlike`);
  return res;
};
//# sourceMappingURL=user.js.map