import React from "react";
import type { IGroup } from "../../interfaces";
import type { INotification } from "@goodtechsoft/xs-notification-native";
type Props = {
    joinButton?: boolean;
    data: IGroup;
    notifData?: INotification;
};
declare const GroupHeaderItem: React.MemoExoticComponent<(props: Props) => React.JSX.Element | null>;
export { GroupHeaderItem };
//# sourceMappingURL=group-header.d.ts.map