import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  Avatar,
  AvatarSizes,
  Colors,
  CommentIcon,
  IconSizes,
  UserCircleIcon,
  UserMinusIcon,
  UserNurseIcon,
} from "@goodtechsoft/xs-core-native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  type BottomSheetParamList,
  NavigationRoutes,
} from "../navigation/types";
import { BottomsheetListCard } from "../components/card/bottomsheet-list";
import { username } from "../utils/username";
import { useNavigation } from "@react-navigation/native";
import { type IUser, UserNavigationRoutes } from "@goodtechsoft/xs-user-native";
import { GroupApi } from "../apis";
import { useToast } from "react-native-toast-notifications";
import useSwr, { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import { ChatNavigationRoutes } from "@goodtechsoft/xs-chat-native";

type Props = NativeStackScreenProps<
  BottomSheetParamList,
  NavigationRoutes.Group_UserMoreSheet
>;

const UserMoreSheet = memo(({ route }: Props) => {
  const { user, payload } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const toast = useToast();
  const { mutate } = useSWRConfig();
  const { data: userMe } = useSwr<IUser>("swr.user.me");

  const { mutate: adminMutate } = useSWRInfinite(
    index => `${payload._id}swr.group.admins.${index}`,
  );
  const { mutate: membersMutate } = useSWRInfinite(
    index => `${payload._id}swr.group.members.${index}`,
  );

  const inviteAdmin = useCallback(async () => {
    user.setAdminInvited(mutate, user._id);
    await GroupApi.inviteAdmin({ id: payload._id, userId: user._id });
    navigation.goBack();
    toast.show("Амжилттай илгээлээ", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
  }, [navigation]);

  const declineAdminInvite = useCallback(async () => {
    user.setAdminInvitedCancel(mutate, user._id);
    await GroupApi.cancelAdminRequest(payload._id, user._id);
    navigation.goBack();
    toast.show("Хүсэлт цуцлагдлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
  }, []);

  const leaveGroup = useCallback(() => {
    navigation.navigate(NavigationRoutes.Group_RemoveSheet, {
      user: user,
      payload: payload,
    });
  }, [navigation]);

  const removeGroup = useCallback(async () => {
    payload.setMinusCount(mutate);
    await GroupApi.removeGroup(payload._id, user._id);
    navigation.goBack();
    toast.show("Бүлгээс хаслаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
    setTimeout(() => {
      membersMutate();
    }, 300);
  }, [navigation]);

  const removeAdmin = useCallback(async () => {
    user.setUnTakeAdmin(mutate, user._id);
    await GroupApi.removeAdmin(payload._id, user._id);
    navigation.goBack();
    toast.show("Амдинаас хаслаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
  }, [navigation, user]);

  const refuseAdmin = useCallback(async () => {
    user.setUnTakeAdmin(mutate, user._id);
    await GroupApi.refuseAdmin(payload._id);
    navigation.goBack();
    toast.show("Админ эрх ариллаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
    setTimeout(() => {
      adminMutate();
    }, 300);
  }, [navigation, adminMutate, user]);

  const seeProfile = useCallback(() => {
    navigation.navigate(UserNavigationRoutes.User_ProfileScreen, {
      userId: user._id,
    });
  }, [navigation]);

  const goChat = useCallback(() => {
    navigation.navigate(ChatNavigationRoutes.Chat_ChatScreen, {
      user: user,
      type: "SINGLE",
      payload: user._id,
    });
  }, [navigation]);

  const renderButtons = useCallback(() => {
    if (user._id === userMe!._id) {
      if (payload.isGroupOwner) {
        return <></>;
      }
      if (payload.isAdmin) {
        return (
          <>
            <BottomsheetListCard
              title="Админ эрхээ арилгах"
              icon={
                <UserNurseIcon color={Colors.primary} size={IconSizes.Medium} />
              }
              onPress={refuseAdmin}
            />
            <View style={styles.h10} />
            <BottomsheetListCard
              title="Бүлгээс гарах"
              icon={
                <UserMinusIcon color={Colors.primary} size={IconSizes.Medium} />
              }
              onPress={leaveGroup}
            />
          </>
        );
      }
      return (
        <>
          <BottomsheetListCard
            title="Бүлгээс гарах"
            icon={
              <UserMinusIcon color={Colors.primary} size={IconSizes.Medium} />
            }
            onPress={leaveGroup}
          />
        </>
      );
    }
    if (user.isGroupOwner) {
      return (
        <>
          <BottomsheetListCard
            title="Профайл үзэх"
            icon={
              <UserCircleIcon color={Colors.primary} size={IconSizes.Medium} />
            }
            onPress={seeProfile}
          />
          <View style={styles.h10} />
          <BottomsheetListCard
            title="Чат бичих"
            icon={
              <CommentIcon color={Colors.primary} size={IconSizes.Medium} />
            }
            onPress={goChat}
          />
        </>
      );
    }
    if (user.isAdmin) {
      return (
        <>
          <BottomsheetListCard
            title="Админаас хасах"
            icon={
              <UserNurseIcon color={Colors.primary} size={IconSizes.Medium} />
            }
            onPress={removeAdmin}
          />
          <View style={styles.h10} />
          <BottomsheetListCard
            title="Бүлгээс гаргах"
            icon={
              <UserMinusIcon color={Colors.primary} size={IconSizes.Medium} />
            }
            onPress={removeGroup}
          />
          <View style={styles.h10} />
          <BottomsheetListCard
            title="Профайл үзэх"
            icon={
              <UserCircleIcon color={Colors.primary} size={IconSizes.Medium} />
            }
            onPress={seeProfile}
          />
          <View style={styles.h10} />
          <BottomsheetListCard
            title="Чат бичих"
            icon={
              <CommentIcon color={Colors.primary} size={IconSizes.Medium} />
            }
            onPress={goChat}
          />
        </>
      );
    }
    return (
      <>
        {user.isAdminInvited ? (
          <BottomsheetListCard
            title="Админ урилга цуцлах"
            icon={
              <UserNurseIcon color={Colors.primary} size={IconSizes.Medium} />
            }
            onPress={declineAdminInvite}
          />
        ) : (
          <BottomsheetListCard
            title="Админ урилга илгээх"
            icon={
              <UserNurseIcon color={Colors.primary} size={IconSizes.Medium} />
            }
            onPress={inviteAdmin}
          />
        )}
        <View style={styles.h10} />
        <BottomsheetListCard
          title="Бүлгээс гаргах"
          icon={
            <UserMinusIcon color={Colors.primary} size={IconSizes.Medium} />
          }
          onPress={removeGroup}
        />
        <View style={styles.h10} />
        <BottomsheetListCard
          title="Профайл үзэх"
          icon={
            <UserCircleIcon color={Colors.primary} size={IconSizes.Medium} />
          }
          onPress={seeProfile}
        />
        <View style={styles.h10} />
        <BottomsheetListCard
          title="Чат бичих"
          icon={<CommentIcon color={Colors.primary} size={IconSizes.Medium} />}
          onPress={goChat}
        />
      </>
    );
  }, [user]);

  return (
    <BottomSheetScrollView
      style={styles.root}
      showsVerticalScrollIndicator={false}>
      <View style={styles.h15}></View>
      <View style={styles.userContainer}>
        <Avatar source={user.avatar?.large} size={AvatarSizes.Large} />
        <View style={styles.h10}></View>
        <Text style={styles.username}>{username(user)}</Text>
      </View>
      <View style={styles.h15}></View>
      {renderButtons()}
    </BottomSheetScrollView>
  );
});

UserMoreSheet.displayName = "UserMoreSheet";

export { UserMoreSheet };

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 18,
  },
  h15: {
    height: 15,
  },
  h10: {
    height: 10,
  },
  userContainer: {
    alignItems: "center",
  },
  username: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    color: Colors.primary,
  },
  card: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.gray101,
    borderWidth: 1,
    padding: 10,
  },
});
