import React from "react";
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";
import { RootStackNavigator } from "./root-stack-navigator";
import { NavigationRoutes } from "./types";
import { SheetBackdrop } from "@goodtechsoft/xs-core-native";
import { RuleSheet } from "../sheets/rule";
import { UserMoreSheet } from "../sheets/user-more";
import { AskPasswordSheet } from "../sheets/ask-password";
import { RemoveSheet } from "../sheets/remove";
import { JoinSheet } from "../sheets/join";
import { ChangePrivacySheet } from "../sheets/change-privacy";
import { ChangeCategorySheet } from "../sheets/change-category";
import { ChangeNameSheet } from "../sheets/change-name";
import { userBottomSheetRootStack } from "@goodtechsoft/xs-user-native";
import { ChangePostTypeSheet } from "../sheets/change-post-type";
import { postBottomSheetRootStack } from "@goodtechsoft/xs-post-native";
import { DeleteConfirmSheet } from "../sheets/delete-confirm";
import { chatBottomSheetRootStack } from "@goodtechsoft/xs-chat-native";
import { settingsBottomSheetRootStack } from "@goodtechsoft/xs-settings-native";
const BottomSheet = createBottomSheetNavigator();
const {
  Navigator,
  Screen,
  Group
} = BottomSheet;
const groupBottomSheetRootStack = insets => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Group, null, /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_RuleSheet,
    component: RuleSheet,
    options: {
      backdropComponent: SheetBackdrop,
      snapPoints: [240],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_UserMoreSheet,
    component: UserMoreSheet,
    options: {
      backdropComponent: SheetBackdrop,
      snapPoints: [400],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_RemoveSheet,
    component: RemoveSheet,
    options: {
      backdropComponent: SheetBackdrop,
      snapPoints: [320],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_AskPasswordSheet,
    component: AskPasswordSheet,
    options: {
      backdropComponent: SheetBackdrop,
      snapPoints: [80],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_JoinSheet,
    component: JoinSheet,
    options: {
      backdropComponent: SheetBackdrop,
      snapPoints: ["90%"],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_ChangePrivacySheet,
    component: ChangePrivacySheet,
    options: {
      backdropComponent: SheetBackdrop,
      snapPoints: [250],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_ChangePostTypeSheet,
    component: ChangePostTypeSheet,
    options: {
      backdropComponent: SheetBackdrop,
      snapPoints: [250],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_ChangeCategorySheet,
    component: ChangeCategorySheet,
    options: {
      backdropComponent: SheetBackdrop,
      snapPoints: [460],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_ChangeNameSheet,
    component: ChangeNameSheet,
    options: {
      backdropComponent: SheetBackdrop,
      snapPoints: [220],
      index: 1,
      topInset: insets.top
    }
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_DeleteConfirmSheet,
    component: DeleteConfirmSheet,
    options: {
      backdropComponent: SheetBackdrop,
      snapPoints: [300],
      index: 1,
      topInset: insets.top
    }
  })));
};
const BottomSheetNavigator = () => {
  return /*#__PURE__*/React.createElement(Navigator, null, /*#__PURE__*/React.createElement(Screen, {
    name: "Group_RootStackNavigator",
    component: RootStackNavigator
  }));
};
export { BottomSheetNavigator, userBottomSheetRootStack, groupBottomSheetRootStack, postBottomSheetRootStack, chatBottomSheetRootStack, settingsBottomSheetRootStack };
//# sourceMappingURL=bottom-sheet-navigator.js.map