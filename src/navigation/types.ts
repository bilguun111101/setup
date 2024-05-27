import type { IUser } from "@goodtechsoft/xs-user-native";
import type { NavigationProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { IGroup } from "../interfaces/group";
import type { INotification } from "@goodtechsoft/xs-notification-native";

export enum NavigationRoutes {
  Group_HomeScreen = "Group_HomeScreen",
  Group_GroupDetailScreen = "Group_GroupDetailScreen",
  Group_SettingsScreen = "Group_SettingsScreen",
  Group_InfoScreen = "Group_InfoScreen",
  Group_AllUsersScreen = "Group_AllUsersScreen",
  Group_CreateScreen = "Group_CreateScreen",
  Group_CreateStep2Screen = "Group_CreateStep2Screen",
  Group_ImagePermissionScreen = "Group_ImagePermissionScreen",
  Group_RequestedUsersScreen = "Group_RequestedUsersScreen",
  Group_AllPendingPostScreen = "Group_AllPendingPostScreen",
  Group_InviteUsersScreen = "Group_InviteUsersScreen",

  Group_RuleSheet = "Group_RuleSheet",
  Group_UserMoreSheet = "Group_UserMoreSheet",
  Group_AskPasswordSheet = "Group_AskPasswordSheet",
  Group_ChangePrivacySheet = "Group_ChangePrivacySheet",
  Group_RootStackNavigator = "Group_RootStackNavigator",
  Group_RemoveSheet = "Group_RemoveSheet",
  Group_JoinSheet = "Group_JoinSheet",
  Group_ChangeCategorySheet = "Group_ChangeCategorySheet",
  Group_ChangeNameSheet = "Group_ChangeNameSheet",
  Group_ChangePostTypeSheet = "Group_ChangePostTypeSheet",
  Group_DeleteConfirmSheet = "Group_DeleteConfirmSheet",
}

export const GroupNavigationRoutes = NavigationRoutes;

export type RootStackParamList = {
  Group_HomeScreen: undefined;
  Group_CreateScreen: undefined;
  Group_RequestedUsersScreen: {
    payload: IGroup;
  };
  Group_GroupDetailScreen: {
    payload: IGroup;
    notifData?: INotification;
  };
  Group_SettingsScreen: {
    payload: IGroup;
  };
  Group_AllUsersScreen: {
    payload: IGroup;
  };
  Group_InfoScreen: {
    payload: IGroup;
  };
  Group_ImagePermissionScreen: {
    permission: {
      gallery: boolean;
      camera: boolean;
      loading: boolean;
    };
  };
  Group_InviteUsersScreen: {
    payload: IGroup;
  };
  Group_AllPendingPostScreen: {
    payload: IGroup;
  };
  Group_CreateStep2Screen: { data: IGroup };
};

export type GroupRootStackParamList = RootStackParamList;

export type BottomSheetParamList = {
  Group_RootStackNavigator: undefined;
  Group_RuleSheet: {
    onPress: (
      navigation: NavigationProp<ReactNavigation.RootParamList>,
    ) => void;
  };
  Group_UserMoreSheet: {
    user: IUser;
    payload: IGroup;
  };
  Group_AskPasswordSheet: undefined;
  Group_JoinSheet: {
    payload: IGroup;
  };
  Group_ChangePrivacySheet: { onChange: (type: string, item: any) => void };
  Group_ChangePostTypeSheet: { onChange: (type: string, item: any) => void };
  Group_ChangeCategorySheet: { onChange: any };
  Group_ChangeNameSheet: {
    payload: IGroup;
  };
  Group_RemoveSheet: {
    user: IUser;
    payload: IGroup;
  };
  Group_DeleteConfirmSheet: { onChange: () => void };
};

export type GroupBottomSheetParamList = BottomSheetParamList;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
export type BottomSheetScreenProps<T extends keyof BottomSheetParamList> =
  NativeStackScreenProps<BottomSheetParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
    interface RootParamList extends BottomSheetParamList { }
  }
}
