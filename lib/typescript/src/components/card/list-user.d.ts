import React from "react";
import { type IUser } from "@goodtechsoft/xs-user-native";
type Props = {
    user: IUser;
    more?: boolean;
    invite?: boolean;
    isJoin?: boolean;
    isShowAdminReq?: boolean;
    onPress: (user: IUser, type: string) => void;
};
declare const ListUserCard: React.MemoExoticComponent<(props: Props) => React.JSX.Element | null>;
export { ListUserCard };
//# sourceMappingURL=list-user.d.ts.map