import React, { memo, useCallback, useRef, useState } from "react";
import { DeviceEventEmitter, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Avatar, AvatarSizes, Colors, Empty, IconSizes, ImagePlusIcon, Loader, PostIcon, TaskStatusItem, useTaskWorker } from "@goodtechsoft/xs-core-native";
import useSWRInfinite from "swr/infinite";
import { Tabs } from "react-native-collapsible-tab-view";
import { PostApi } from "../../apis";
import { Post, PostCard } from "@goodtechsoft/xs-post-native";
import { PostNavigationRoutes } from "@goodtechsoft/xs-post-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useSwr from "swr";
const PostTabScreen = /*#__PURE__*/memo(props => {
  const {
    payload,
    focusChanged
  } = props;
  const navigation = useNavigation();
  const [blockEndReached, setBlockEndReached] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const taskWorker = useTaskWorker("Post_Created", payload => {
    console.log("Post_Created done!", payload);
  });
  const {
    data: user
  } = useSwr("swr.user.me");
  const {
    data,
    size,
    setSize,
    isLoading
  } = useSWRInfinite((_, _prev) => {
    return `${payload._id}.swr.group|${_prev?.nextPage || ""}`;
  }, async url => {
    const nextPage = url.split("|").pop() || undefined;
    let res;
    res = await PostApi.groupPostList(nextPage, payload._id);
    return res;
  }, {
    revalidateAll: true
  });
  const renderItem = useCallback(({
    item,
    index
  }) => {
    if (!item) {
      return /*#__PURE__*/React.createElement(React.Fragment, null);
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.card
    }, /*#__PURE__*/React.createElement(PostCard, {
      key: item._id,
      useSafeArea: false,
      useTimeline: false,
      inGroup: true,
      focusChanged: focusChanged,
      activeIndex: activeIndex,
      payload: Post.fromJson(item),
      focused: index === activeIndex
    }));
  }, [activeIndex, focusChanged]);
  const flatData = (data || [])?.map(row => row?.rows).flat();
  if (flatData && (flatData || [])[0] === null) {
    return /*#__PURE__*/React.createElement(View, null);
  }
  const createPost = useCallback(() => {
    navigation.navigate(PostNavigationRoutes.Post_NewScreen, {
      group: payload
    });
  }, [navigation]);
  const emptyRender = useCallback(() => {
    if (isLoading) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.empty
      }, /*#__PURE__*/React.createElement(Loader, null));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.empty
    }, /*#__PURE__*/React.createElement(Empty, {
      title: "Хоосон байна",
      description: "\u042D\u043D\u044D \u0431\u04AF\u043B\u044D\u0433\u0442 \u043F\u043E\u0441\u0442 \u043D\u0438\u0439\u0442\u043B\u044D\u0433\u0434\u044D\u044D\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430!",
      icon: /*#__PURE__*/React.createElement(PostIcon, {
        size: IconSizes.Medium,
        color: Colors.white
      })
    }));
  }, [isLoading]);
  if (!payload) {
    return null;
  }
  const flatListHeader = () => {
    const {
      activeTask
    } = taskWorker;
    if (activeTask && activeTask.isRunning && activeTask.name === "Post_TaskWorker") {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
        style: styles.loaderContainer
      }, /*#__PURE__*/React.createElement(TaskStatusItem, {
        image: activeTask?.payload.image,
        title: activeTask?.payload.text
      })));
    } else {
      return /*#__PURE__*/React.createElement(View, null);
    }
  };
  const _onViewableItemsChanged = useRef(({
    changed
  }) => {
    setActiveIndex(changed[0]?.index || 0);
  });
  useFocusEffect(() => {
    DeviceEventEmitter.addListener("newsfeed.block.end.reached", value => {
      console.log("liked blocked end reached ");
      setBlockEndReached(value);
    });
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, payload.isJoined || payload.privacy === "PUBLIC" ? /*#__PURE__*/React.createElement(Tabs.FlatList, {
    refreshControl: /*#__PURE__*/React.createElement(RefreshControl, {
      onRefresh: async () => {
        setRefreshing(true);
        setSize(1);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      },
      refreshing: refreshing
    }),
    ListHeaderComponent: payload.isJoined ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Pressable, {
      onPress: createPost,
      style: styles.headerCard
    }, /*#__PURE__*/React.createElement(Avatar, {
      source: user?.avatar?.large,
      size: AvatarSizes.Medium
    }), /*#__PURE__*/React.createElement(Text, {
      style: styles.createText
    }, "\u041D\u0438\u0439\u0442\u043B\u044D\u043B \u043E\u0440\u0443\u0443\u043B\u0430\u0445"), /*#__PURE__*/React.createElement(ImagePlusIcon, {
      color: Colors.primary,
      size: IconSizes.Large
    })), flatListHeader()) : /*#__PURE__*/React.createElement(View, null),
    style: styles.root,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: styles.listContent,
    ListEmptyComponent: emptyRender(),
    data: flatData,
    windowSize: 5,
    initialNumToRender: 3,
    maxToRenderPerBatch: 3,
    contentInset: {
      top: 0,
      bottom: 20,
      left: 0,
      right: 0
    },
    contentInsetAdjustmentBehavior: "automatic",
    renderItem: renderItem,
    onEndReached: () => {
      if (blockEndReached) {
        return;
      }
      setSize(size + 1);
    },
    onViewableItemsChanged: _onViewableItemsChanged.current,
    viewabilityConfig: {
      itemVisiblePercentThreshold: 110
    },
    removeClippedSubviews: true,
    keyExtractor: item => item?._id,
    onEndReachedThreshold: 0.7
  }) : /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }));
});
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10
  },
  h60: {
    height: 60
  },
  h15: {
    height: 15
  },
  loaderContainer: {
    marginTop: 8
  },
  h4: {
    height: 4
  },
  w4: {
    width: 4
  },
  ph18: {
    paddingHorizontal: 18
  },
  createText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter",
    color: Colors.primary
  },
  headerCard: {
    marginTop: 10,
    padding: 18,
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  listContent: {
    backgroundColor: Colors.gray101
  },
  card: {
    marginTop: 8
  },
  flex: {
    flex: 1
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: Colors.primary
  },
  cover: {
    height: 150,
    width: "100%"
  },
  groupName: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 24,
    color: Colors.primary
  },
  groupPrivacy: {
    flexDirection: "row"
  },
  privacyText: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray103
  },
  empty: {
    marginTop: 8,
    borderWidth: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  }
});
PostTabScreen.displayName = "PostTabScreen";
export { PostTabScreen };
//# sourceMappingURL=post.js.map