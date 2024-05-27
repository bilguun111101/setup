"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.username = void 0;
const username = user => {
  if (user.nickname) {
    return user.nickname;
  } else {
    return `${user.lastName} ${user.firstName}`;
  }
};
exports.username = username;
//# sourceMappingURL=username.js.map