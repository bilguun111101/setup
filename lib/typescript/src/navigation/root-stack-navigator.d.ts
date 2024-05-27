import React from "react";
import { authMainRootStack } from "@goodtechsoft/xs-auth-native";
import { userMainRootStack } from "@goodtechsoft/xs-user-native";
import { postMainRootStack } from "@goodtechsoft/xs-post-native";
import { chatMainRootStack } from "@goodtechsoft/xs-chat-native";
import { pageMainRootStack } from "@goodtechsoft/xs-page-native";
import { settingsMainRootStack } from "@goodtechsoft/xs-settings-native";
declare const groupMainRootStack: () => React.JSX.Element;
declare const RootStackNavigator: () => React.JSX.Element;
export { RootStackNavigator, groupMainRootStack, chatMainRootStack, userMainRootStack, postMainRootStack, authMainRootStack, pageMainRootStack, settingsMainRootStack, };
//# sourceMappingURL=root-stack-navigator.d.ts.map