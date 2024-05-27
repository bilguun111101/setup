import React, { memo, useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  AppBar,
  ArrowLeftIcon,
  Button,
  Colors,
  Empty,
  IconSizes,
  Loader,
  PostIcon,
} from "@goodtechsoft/xs-core-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { GroupApi, PostApi } from "../../apis";
import { ActionItem } from "../../components/layout/action-item";
import { NavigationRoutes, type RootStackParamList } from "../../navigation";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useToast } from "react-native-toast-notifications";
import useSWRInfinite from "swr/infinite";
import { type IPost, Post, PostCard } from "@goodtechsoft/xs-post-native";
import useSWR from "swr";
import type { IGroup } from "../../interfaces";

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.Group_SettingsScreen
>;

const SettingsScreen = memo(({ route }: Props) => {
  const { payload } = route.params;
  const navigation = useNavigation();
  const toast = useToast();
  const { mutate: myGroupMutate } = useSWRInfinite(
    index => `swr.group.my.${index}`,
  );
  const { mutate: groupAdminMutate } = useSWRInfinite(
    index => `swr.group.admin.${index}`,
  );
  const { mutate: postListMutate } = useSWRInfinite((_, _prev) => {
    return `${payload._id}.swr.group|${_prev?.nextPage || ""}`;
  });

  const { data: groupData } = useSWR<IGroup>(`swr.group.${payload._id}`, {
    fallbackData: payload,
  });

  if (!groupData) {
    return null;
  }

  const { data, isLoading, mutate } = useSWR(
    `swr.requested.post.${groupData._id}`,
    async _ => {
      const res = await PostApi.postRequestList({
        id: groupData._id,
        page: 1,
        limit: 3,
      });
      return res;
    },
  );

  const goInfo = useCallback(() => {
    return navigation.navigate(NavigationRoutes.Group_InfoScreen, {
      payload: groupData,
    });
  }, [navigation]);

  const goUsersList = useCallback(() => {
    return navigation.navigate(NavigationRoutes.Group_AllUsersScreen, {
      payload: groupData,
    });
  }, [navigation]);

  const deleteGroup = useCallback(async () => {
    navigation.navigate(NavigationRoutes.Group_DeleteConfirmSheet, {
      onChange: async () => {
        await GroupApi.deleteGroup(groupData._id);
        navigation.dispatch(StackActions.pop(2));
        setTimeout(() => {
          myGroupMutate();
          groupAdminMutate();
        }, 300);
      },
    });
  }, [navigation]);

  const postDelete = useCallback(async (item: IPost) => {
    await PostApi.deletePost(item._id);
    setTimeout(() => {
      mutate();
    }, 300);

    toast.show("Амжилттай устлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
  }, []);
  const postApprove = useCallback(async (item: IPost) => {
    await PostApi.approvePost(groupData._id, item._id);
    setTimeout(() => {
      postListMutate();
      mutate();
    }, 300);

    toast.show("Амжилттай нийтлэгдлээ", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
  }, []);

  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.empty}>
          <Loader />
        </View>
      );
    }

    return (
      <View style={styles.empty}>
        <Empty
          title={"Хоосон байна"}
          description="Хүлээгдэж буй пост байхгүй байна"
          icon={<PostIcon size={IconSizes.Medium} color={Colors.white} />}
        />
      </View>
    );
  }, [isLoading]);

  const renderItem = useCallback(({ item }: { item: IPost }) => {
    return (
      <View style={styles.postCard}>
        <PostCard useSafeArea inGroup payload={Post.fromJson(item)} />
        <View style={styles.row}>
          <Button
            style={styles.button}
            onPress={() => postApprove(item)}
            title={"Зөвшөөрөх"}
            type={"primary"}
          />
          <Button
            style={styles.button}
            onPress={() => postDelete(item)}
            title={"Устгах"}
            type={"default"}
          />
        </View>
      </View>
    );
  }, []);

  const goPendingPost = useCallback(() => {
    navigation.navigate(NavigationRoutes.Group_AllPendingPostScreen, {
      payload: groupData,
    });
  }, [navigation]);

  const renderFooter = useCallback(() => {
    if (data?.rows.length! > 3) {
      return (
        <View style={styles.footer}>
          <Button
            onPress={goPendingPost}
            title={"Бусад постыг харах"}
            type={"primary"}
          />
        </View>
      );
    }
    return <View />;
  }, []);

  if (!data) {
    return null;
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <AppBar
          left={
            <Button
              type="text"
              icon={<ArrowLeftIcon size={IconSizes.ExtraLarge} />}
              onPress={() => navigation.goBack()}
            />
          }
          center={<Text style={styles.title}>Тохиргоо</Text>}
        />
      </View>
      <FlatList
        ListHeaderComponent={
          <View style={styles.ph18}>
            <View style={styles.h15} />
            <ActionItem
              onPress={goInfo}
              title={"Бүлгийн мэдээлэл"}
              suffixIcon
            />
            <View style={styles.h10} />
            <ActionItem
              onPress={goUsersList}
              title={"Нийт гишүүд болон админ"}
              badgeNumber={groupData.pendingMembersCount}
              suffixIcon
            />
            <View style={styles.h10} />
            <ActionItem
              onPress={deleteGroup}
              title={"Бүлэг устгах"}
              suffixIcon
            />
            <View style={styles.h15} />
            <Text style={styles.title}>{`Нийтлэх хүсэлт (${data.count})`}</Text>
          </View>
        }
        data={data ? data.rows.flat() : []}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentInset={{ top: 0, bottom: 20, left: 0, right: 0 }}
        contentInsetAdjustmentBehavior="automatic"
        initialNumToRender={3}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101,
  },
  row: {
    gap: 10,
    paddingHorizontal: 18,
    flexDirection: "row",
  },
  ph18: {
    paddingHorizontal: 18,
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10,
  },
  h15: {
    height: 15,
  },
  h10: {
    height: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.primary,
  },
  postCard: {
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: Colors.gray102,
  },
  button: {
    flex: 1,
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginTop: 10,
    marginHorizontal: 18,
  },
});

SettingsScreen.displayName = "SettingsScreen";

export { SettingsScreen };
