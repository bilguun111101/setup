import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomSheetParamList, NavigationRoutes } from "../navigation/types";
type Props = NativeStackScreenProps<BottomSheetParamList, NavigationRoutes.Group_ChangePostTypeSheet>;
export type IPostType = {
    name: string;
    value: boolean;
};
declare const ChangePostTypeSheet: React.MemoExoticComponent<({ route }: Props) => React.JSX.Element>;
export { ChangePostTypeSheet };
//# sourceMappingURL=change-post-type.d.ts.map