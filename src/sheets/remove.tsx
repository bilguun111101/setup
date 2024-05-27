import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import {
  Avatar,
  AvatarSizes,
  Button,
  Colors,
  Image,
  ImageSizes,
} from "@goodtechsoft/xs-core-native";
import type {
  BottomSheetParamList,
  NavigationRoutes,
} from "../navigation/types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GroupApi } from "../apis";
import type { IGroup } from "../interfaces";
import { username } from "../utils/username";
import useSwr, { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import type { IUser } from "@goodtechsoft/xs-user-native";
import { useToast } from "react-native-toast-notifications";
import { GroupVector } from "../assets/image/group-vector";

type Props = NativeStackScreenProps<
  BottomSheetParamList,
  NavigationRoutes.Group_RemoveSheet
>;

const RemoveSheet = memo(({ route }: Props) => {
  const { user, payload } = route.params;
  const sfArea = useSafeAreaInsets();
  const toast = useToast();
  const { mutate } = useSWRConfig();
  const { data: userMe } = useSwr<IUser>("swr.user.me");
  const { mutate: suggestMutate } = useSWRInfinite(
    index => `swr.group.suggest.${index}`,
  );
  const { mutate: myMutate } = useSWRInfinite(
    index => `swr.group.my.query=.${index}`,
  );
  const { data } = useSwr<IGroup>(`swr.group.${payload._id}`);
  const { mutate: userListMutate } = useSWRInfinite(
    index => `${payload._id}swr.group.members.${index}`,
  );
  const { mutate: adminGroupMutate } = useSWRInfinite(
    index => `swr.group.admin.${index}`,
  );

  const navigation = useNavigation();

  const removeGroupUser = useCallback(async () => {
    await GroupApi.removeUser(payload._id, user._id);
    toast.show("Бүлгээс хаслаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
    data?.setMinusCount(mutate);
    setTimeout(() => {
      userListMutate();
    }, 300);
  }, [userListMutate]);

  const onPress = useCallback(async () => {
    data?.setJoin(mutate, false);
    await GroupApi.leaveGroup(payload._id);
    setTimeout(() => {
      suggestMutate();
      adminGroupMutate();
      myMutate();
    }, 300);
    data?.setMinusCount(mutate);
    toast.show("Бүлгээс гарлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
    navigation.dispatch(StackActions.pop(2));
    navigation.goBack();
  }, [data, payload, suggestMutate, myMutate, navigation]);

  const renderText = useCallback(() => {
    if (user._id === userMe?._id) {
      return (
        <Text style={styles.title}>
          <Text style={styles.username}>{data?.name}</Text> бүлгээс гарах
          итгэлтэй байна уу?
        </Text>
      );
    }
    return (
      <Text style={styles.title}>
        Та <Text style={styles.username}>{username(user)}</Text>
        -ийг бүлгээс хасахдаа итгэлтэй байна уу?
      </Text>
    );
  }, []);

  const renderButton = useCallback(() => {
    if (user._id === userMe?._id) {
      return (
        <Button
          type={"primary"}
          title={"Зөвшөөрөх"}
          style={styles.button}
          onPress={onPress}
        />
      );
    }
    return (
      <Button
        type={"primary"}
        title={"Зөвшөөрөх"}
        style={styles.button}
        onPress={removeGroupUser}
      />
    );
  }, []);

  const renderTitle = useCallback(() => {
    if (userMe?._id === user._id) {
      return "Бүлгээс гарах";
    }
    return "Бүлгээс хасах";
  }, []);

  const renderAvatar = useCallback(() => {
    if (!data?.coverImage) {
      return (
        <View style={styles.cover}>
          <GroupVector width={45} height={60} />
        </View>
      );
    }
    if (user._id === userMe?._id) {
      return (
        <View style={styles.cover}>
          <Image
            style={styles.cover}
            source={data?.coverImage!}
            size={ImageSizes.Large}
          />
        </View>
      );
    }
    return <Avatar source={user.avatar?.large} size={AvatarSizes.Large} />;
  }, []);

  return (
    <View style={styles.root}>
      <Text style={styles.headerTitle}>{renderTitle()}</Text>
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>{renderAvatar()}</View>
        <View style={styles.h10}></View>
        {renderText()}
        <View style={styles.h15}></View>
        {renderButton()}
      </View>
      <View style={{ height: sfArea.bottom }}></View>
    </View>
  );
});

RemoveSheet.displayName = "RemoveSheet";

export { RemoveSheet };

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    paddingHorizontal: 18,
  },
  h10: {
    height: 10,
  },
  h15: {
    height: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    lineHeight: 20,
    textAlign: "center",
    color: Colors.primary,
    marginVertical: 12,
  },
  contentContainer: {
    backgroundColor: Colors.gray101,
    borderRadius: 12,
    flex: 1,
  },
  iconContainer: {
    alignSelf: "center",
    marginTop: 32,
  },
  username: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    lineHeight: 18,
    textAlign: "center",
    color: Colors.primary,
    marginHorizontal: 24,
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter",
    lineHeight: 18,
    textAlign: "center",
    color: Colors.primary,
    marginHorizontal: 24,
  },
  description: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    lineHeight: 15,
    color: Colors.gray103,
    textAlign: "center",
    marginTop: 12,
    marginHorizontal: 24,
  },
  button: {
    marginHorizontal: 24,
  },
  cover: {
    width: 58,
    height: 58,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: Colors.gray102,
    alignItems: "center",
    justifyContent: "center",
  },
});
