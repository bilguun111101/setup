import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { type BottomSheetParamList, NavigationRoutes } from "../navigation/types";
type Props = NativeStackScreenProps<BottomSheetParamList, NavigationRoutes.Group_ChangeCategorySheet>;
export type IPrivacyType = {
    name: string;
    value: string;
};
declare const ChangeCategorySheet: React.MemoExoticComponent<({ route }: Props) => React.JSX.Element>;
export { ChangeCategorySheet };
//# sourceMappingURL=change-category.d.ts.map