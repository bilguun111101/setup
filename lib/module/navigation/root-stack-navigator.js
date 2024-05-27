import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationRoutes } from "./types";
import { useNavigation } from "@react-navigation/native";
import { AuthApi } from "../apis";
import { HomeScreen } from "../screens/home/home";
import { GroupDetailScreen } from "../screens/group/detail";
import { SettingsScreen } from "../screens/group/settings";
import { AuthNavigationRoutes, authMainRootStack } from "@goodtechsoft/xs-auth-native";
import useSwr from "swr";
import { InfoScreen } from "../screens/group/info";
import { AllUsersScreen } from "../screens/group/all-users";
import { CreateScreen } from "../screens/group/create/step1";
import { CreateStep2Screen } from "../screens/group/create/step2";
import { userMainRootStack } from "@goodtechsoft/xs-user-native";
import { postMainRootStack } from "@goodtechsoft/xs-post-native";
import { chatMainRootStack } from "@goodtechsoft/xs-chat-native";
import { pageMainRootStack } from "@goodtechsoft/xs-page-native";
import { RequestedUsersScreen } from "../screens/group/requested-users";
import { AllPendingPostScreen } from "../screens/group/all-pending-post";
import { InviteUsersScreen } from "../screens/group/invite-users";
import { settingsMainRootStack } from "@goodtechsoft/xs-settings-native";
const Stack = createNativeStackNavigator();
const {
  Navigator,
  Screen,
  Group
} = Stack;
const groupMainRootStack = () => {
  return /*#__PURE__*/React.createElement(Group, {
    screenOptions: {
      headerShown: false
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_HomeScreen,
    component: HomeScreen
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_GroupDetailScreen,
    component: GroupDetailScreen
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_SettingsScreen,
    component: SettingsScreen
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_InfoScreen,
    component: InfoScreen
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_AllUsersScreen,
    component: AllUsersScreen
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_CreateScreen,
    component: CreateScreen
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_CreateStep2Screen,
    component: CreateStep2Screen
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_RequestedUsersScreen,
    component: RequestedUsersScreen
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_AllPendingPostScreen,
    component: AllPendingPostScreen
  }), /*#__PURE__*/React.createElement(Screen, {
    name: NavigationRoutes.Group_InviteUsersScreen,
    component: InviteUsersScreen
  }));
};
const RootStackNavigator = () => {
  const navigation = useNavigation();
  const {
    data: user
  } = useSwr("swr.user.me", async () => await AuthApi.me());
  useEffect(() => {
    if (user) {
      navigation.navigate(NavigationRoutes.Group_HomeScreen);
    } else {
      navigation.navigate(AuthNavigationRoutes.Auth_LoginScreen);
    }
  }, [user]);
  const navigationOptions = () => {
    return {
      headerShown: false
    };
  };
  return /*#__PURE__*/React.createElement(Navigator, {
    screenOptions: navigationOptions,
    initialRouteName: NavigationRoutes.Group_HomeScreen
  }, authMainRootStack(), groupMainRootStack());
};
export { RootStackNavigator, groupMainRootStack, chatMainRootStack, userMainRootStack, postMainRootStack, authMainRootStack, pageMainRootStack, settingsMainRootStack };
//# sourceMappingURL=root-stack-navigator.js.map