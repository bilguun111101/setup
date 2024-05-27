import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationRoutes, type RootStackParamList } from "./types";
import { useNavigation } from "@react-navigation/native";
import { AuthApi } from "../apis";
import { HomeScreen } from "../screens/home/home";
import { GroupDetailScreen } from "../screens/group/detail";
import { SettingsScreen } from "../screens/group/settings";
import {
  AuthNavigationRoutes,
  authMainRootStack,
} from "@goodtechsoft/xs-auth-native";
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

const Stack = createNativeStackNavigator<RootStackParamList>();
const { Navigator, Screen, Group } = Stack;

const groupMainRootStack = () => {
  return (
    <Group
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={NavigationRoutes.Group_HomeScreen} component={HomeScreen} />
      <Screen
        name={NavigationRoutes.Group_GroupDetailScreen}
        component={GroupDetailScreen}
      />
      <Screen
        name={NavigationRoutes.Group_SettingsScreen}
        component={SettingsScreen}
      />
      <Screen name={NavigationRoutes.Group_InfoScreen} component={InfoScreen} />
      <Screen
        name={NavigationRoutes.Group_AllUsersScreen}
        component={AllUsersScreen}
      />
      <Screen
        name={NavigationRoutes.Group_CreateScreen}
        component={CreateScreen}
      />
      <Screen
        name={NavigationRoutes.Group_CreateStep2Screen}
        component={CreateStep2Screen}
      />
      <Screen
        name={NavigationRoutes.Group_RequestedUsersScreen}
        component={RequestedUsersScreen}
      />
      <Screen
        name={NavigationRoutes.Group_AllPendingPostScreen}
        component={AllPendingPostScreen}
      />
      <Screen
        name={NavigationRoutes.Group_InviteUsersScreen}
        component={InviteUsersScreen}
      />
    </Group>
  );
};

const RootStackNavigator = () => {
  const navigation = useNavigation();
  const { data: user } = useSwr("swr.user.me", async () => await AuthApi.me());

  useEffect(() => {
    if (user) {
      navigation.navigate(NavigationRoutes.Group_HomeScreen);
    } else {
      navigation.navigate(AuthNavigationRoutes.Auth_LoginScreen);
    }
  }, [user]);

  const navigationOptions = () => {
    return { headerShown: false };
  };

  return (
    <Navigator
      screenOptions={navigationOptions}
      initialRouteName={NavigationRoutes.Group_HomeScreen}>
      {authMainRootStack()}
      {groupMainRootStack()}
      {/* {userMainRootStack()} */}
      {/* {postMainRootStack()} */}
      {/* {settingsMainRootStack(user)} */}
      {/* {AccountSwitchComponent()} */}
      {/* {chatMainRootStack()} */}
      {/* {pageMainRootStack()} */}
    </Navigator>
  );
};

export {
  RootStackNavigator,
  groupMainRootStack,
  chatMainRootStack,
  userMainRootStack,
  postMainRootStack,
  authMainRootStack,
  pageMainRootStack,
  settingsMainRootStack,
};
