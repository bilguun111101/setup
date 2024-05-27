import type { IUser } from "@goodtechsoft/xs-user-native";

export const username = (user: IUser) => {
  if (user.nickname) {
    return user.nickname;
  } else {
    return `${user.lastName} ${user.firstName}`;
  }
};
