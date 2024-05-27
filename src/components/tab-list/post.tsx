import React, { memo, useCallback, useRef, useState } from "react";
import {
  DeviceEventEmitter,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Avatar,
  AvatarSizes,
  Colors,
  Empty,
  IconSizes,
  ImagePlusIcon,
  Loader,
  PostIcon,
  TaskStatusItem,
  useTaskWorker,
} from "@goodtechsoft/xs-core-native";
import useSWRInfinite from "swr/infinite";
import { Tabs } from "react-native-collapsible-tab-view";
import { PostApi } from "../../apis";
import { type IPost, Post, PostCard } from "@goodtechsoft/xs-post-native";
import { PostNavigationRoutes } from "@goodtechsoft/xs-post-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { type IGroup } from "../../interfaces";
import type { IUser } from "@goodtechsoft/xs-user-native";
import useSwr from "swr";

type Props = {
  payload: IGroup;
  focusChanged: boolean;
};

const PostTabScreen = memo((props: Props) => {
  const { payload, focusChanged } = props;
  const navigation = useNavigation();
  const [blockEndReached, setBlockEndReached] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>();

  const taskWorker = useTaskWorker("Post_Created", payload => {
    console.log("Post_Created done!", payload);
  });

  const { data: user } = useSwr<IUser>("swr.user.me");

  const { data, size, setSize, isLoading } = useSWRInfinite(
    (_, _prev) => {
      return `${payload._id}.swr.group|${_prev?.nextPage || ""}`;
    },
    async url => {
      const nextPage = url.split("|").pop() || undefined;
      let res;
      res = await PostApi.groupPostList(nextPage, payload._id);
      return res;
    },
    {
      revalidateAll: true,
    },
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IPost; index: number }) => {
      if (!item) {
        return <></>;
      }
      return (
        <View style={styles.card}>
          <PostCard
            key={item._id}
            useSafeArea={false}
            useTimeline={false}
            inGroup={true}
            focusChanged={focusChanged}
            activeIndex={activeIndex!}
            payload={Post.fromJson(item)}
            focused={index === activeIndex}
          />
        </View>
      );
    },
    [activeIndex, focusChanged],
  );

  const flatData = (data || [])?.map(row => row?.rows).flat();

  if (flatData && (flatData || [])[0] === null) {
    return <View />;
  }

  const createPost = useCallback(() => {
    navigation.navigate(PostNavigationRoutes.Post_NewScreen, {
      group: payload,
    });
  }, [navigation]);

  const emptyRender = useCallback(() => {
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
          description="Энэ бүлэгт пост нийтлэгдээгүй байна!"
          icon={<PostIcon size={IconSizes.Medium} color={Colors.white} />}
        />
      </View>
    );
  }, [isLoading]);

  if (!payload) {
    return null;
  }

  const flatListHeader = () => {
    const { activeTask } = taskWorker;

    if (
      activeTask &&
      activeTask.isRunning &&
      activeTask.name === "Post_TaskWorker"
    ) {
      return (
        <>
          <View style={styles.loaderContainer}>
            <TaskStatusItem
              image={activeTask?.payload.image}
              title={activeTask?.payload.text}
            />
          </View>
        </>
      );
    } else {
      return <View />;
    }
  };

  const _onViewableItemsChanged = useRef<any>(
    ({
      changed,
    }: {
      changed: { isVisible: boolean; item: IPost; index: number }[];
    }) => {
      setActiveIndex(changed[0]?.index || 0);
    },
  );

  useFocusEffect(() => {
    DeviceEventEmitter.addListener("newsfeed.block.end.reached", value => {
      console.log("liked blocked end reached ");
      setBlockEndReached(value);
    });
  });

  return (
    <>
      {payload.isJoined || payload.privacy === "PUBLIC" ? (
        <Tabs.FlatList
          refreshControl={
            <RefreshControl
              onRefresh={async () => {
                setRefreshing(true);
                setSize(1);
                setTimeout(() => {
                  setRefreshing(false);
                }, 1000);
              }}
              refreshing={refreshing}
            />
          }
          ListHeaderComponent={
            payload.isJoined ? (
              <>
                <Pressable onPress={createPost} style={styles.headerCard}>
                  <Avatar
                    source={user?.avatar?.large}
                    size={AvatarSizes.Medium}
                  />
                  <Text style={styles.createText}>Нийтлэл оруулах</Text>
                  <ImagePlusIcon
                    color={Colors.primary}
                    size={IconSizes.Large}
                  />
                </Pressable>
                {flatListHeader()}
              </>
            ) : (
              <View />
            )
          }
          style={styles.root}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={emptyRender()}
          data={flatData}
          windowSize={5}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          contentInset={{ top: 0, bottom: 20, left: 0, right: 0 }}
          contentInsetAdjustmentBehavior="automatic"
          renderItem={renderItem}
          onEndReached={() => {
            if (blockEndReached) {
              return;
            }
            setSize(size + 1);
          }}
          onViewableItemsChanged={_onViewableItemsChanged.current}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 110,
          }}
          removeClippedSubviews={true}
          keyExtractor={item => item?._id}
          onEndReachedThreshold={0.7}
        />
      ) : (
        <View style={styles.root} />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101,
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10,
  },
  h60: {
    height: 60,
  },
  h15: {
    height: 15,
  },
  loaderContainer: {
    marginTop: 8,
  },
  h4: {
    height: 4,
  },
  w4: {
    width: 4,
  },
  ph18: {
    paddingHorizontal: 18,
  },
  createText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter",
    color: Colors.primary,
  },
  headerCard: {
    marginTop: 10,
    padding: 18,
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  listContent: {
    backgroundColor: Colors.gray101,
  },
  card: {
    marginTop: 8,
  },
  flex: { flex: 1 },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: Colors.primary,
  },
  cover: {
    height: 150,
    width: "100%",
  },
  groupName: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 24,
    color: Colors.primary,
  },
  groupPrivacy: {
    flexDirection: "row",
  },
  privacyText: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray103,
  },
  empty: {
    marginTop: 8,
    borderWidth: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
});

PostTabScreen.displayName = "PostTabScreen";

export { PostTabScreen };
