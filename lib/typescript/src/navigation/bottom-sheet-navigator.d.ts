import React from "react";
import { type EdgeInsets } from "react-native-safe-area-context";
import { userBottomSheetRootStack } from "@goodtechsoft/xs-user-native";
import { postBottomSheetRootStack } from "@goodtechsoft/xs-post-native";
import { chatBottomSheetRootStack } from "@goodtechsoft/xs-chat-native";
import { settingsBottomSheetRootStack } from "@goodtechsoft/xs-settings-native";
declare const groupBottomSheetRootStack: (insets: EdgeInsets) => React.JSX.Element;
declare const BottomSheetNavigator: () => React.JSX.Element;
export { BottomSheetNavigator, userBottomSheetRootStack, groupBottomSheetRootStack, postBottomSheetRootStack, chatBottomSheetRootStack, settingsBottomSheetRootStack, };
//# sourceMappingURL=bottom-sheet-navigator.d.ts.map