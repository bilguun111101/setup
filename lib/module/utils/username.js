export const username = user => {
  if (user.nickname) {
    return user.nickname;
  } else {
    return `${user.lastName} ${user.firstName}`;
  }
};
//# sourceMappingURL=username.js.map