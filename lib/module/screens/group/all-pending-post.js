import { AppBar, ArrowLeftIcon, Button, Colors, Empty, IconSizes, Loader, UsersIcon } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { PostApi } from "../../apis";
import { Post, PostCard } from "@goodtechsoft/xs-post-native";
import useSWRInfinite from "swr/infinite";
const AllPendingPostScreen = /*#__PURE__*/memo(({
  route
}) => {
  const {
    payload
  } = route.params;
  const navigation = useNavigation();
  const toast = useToast();
  const {
    mutate: postListMutate
  } = useSWRInfinite((_, _prev) => {
    return `${payload._id}.swr.group|${_prev?.nextPage || ""}`;
  });
  const {
    data,
    size,
    setSize,
    isLoading,
    mutate
  } = useSWRInfinite(index => `swr.requested.post.${index}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await PostApi.postRequestList({
      id: payload._id,
      page: parseInt(`${page || 1}`, 10) + 1,
      limit: 10
    });
    return res;
  }, {
    revalidateAll: true
  });
  const postDelete = useCallback(async item => {
    await PostApi.deletePost(item._id);
    setTimeout(() => {
      mutate();
    }, 300);
    toast.show("Амжилттай устлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
  }, []);
  const postApprove = useCallback(async item => {
    await PostApi.approvePost(payload._id, item._id);
    setTimeout(() => {
      postListMutate();
      mutate();
    }, 300);
    toast.show("Амжилттай нийтлэгдлээ", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
  }, []);
  const renderItem = useCallback(({
    item
  }) => {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.postCard
    }, /*#__PURE__*/React.createElement(PostCard, {
      useSafeArea: true,
      inGroup: true,
      payload: Post.fromJson(item)
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.row
    }, /*#__PURE__*/React.createElement(Button, {
      style: styles.button,
      onPress: () => postApprove(item),
      title: "Зөвшөөрөх",
      type: "primary"
    }), /*#__PURE__*/React.createElement(Button, {
      style: styles.button,
      onPress: () => postDelete(item),
      title: "Устгах",
      type: "default"
    })));
  }, []);
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
      icon: /*#__PURE__*/React.createElement(UsersIcon, {
        size: IconSizes.Medium,
        color: Colors.white
      })
    }));
  }, [isLoading]);
  const flatData = (data || [])?.map(row => row?.rows).flat();
  if (flatData && (flatData || [])[0] === null) {
    return /*#__PURE__*/React.createElement(View, null);
  }
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(AppBar, {
    left: /*#__PURE__*/React.createElement(Button, {
      type: "text",
      icon: /*#__PURE__*/React.createElement(ArrowLeftIcon, {
        size: IconSizes.ExtraLarge
      }),
      onPress: () => navigation.goBack()
    }),
    center: /*#__PURE__*/React.createElement(Text, {
      style: styles.title
    }, "\u041D\u0438\u0439\u0442\u043B\u044D\u0445 \u0445\u04AF\u0441\u044D\u043B\u0442\u04AF\u04AF\u0434")
  })), /*#__PURE__*/React.createElement(FlatList, {
    showsVerticalScrollIndicator: false,
    data: flatData,
    initialNumToRender: 7,
    renderItem: renderItem,
    keyExtractor: item => item._id,
    ListEmptyComponent: emptyRender(),
    refreshControl: /*#__PURE__*/React.createElement(RefreshControl, {
      onRefresh: () => {
        setSize(1);
      },
      refreshing: isLoading
    }),
    onEndReached: () => {
      setSize(size + 1);
    },
    contentInset: {
      top: 0,
      bottom: 20,
      left: 0,
      right: 0
    },
    contentInsetAdjustmentBehavior: "automatic"
  }));
});
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101
  },
  header: {
    zIndex: 10
  },
  h15: {
    height: 15
  },
  h10: {
    height: 10
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
  headerContainer: {
    backgroundColor: Colors.gray101
  },
  listContent: {
    marginTop: 10,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 20
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.primary
  },
  bgGray: {
    backgroundColor: Colors.gray101
  },
  card: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 10
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    gap: 10,
    paddingHorizontal: 18,
    flexDirection: "row"
  },
  button: {
    flex: 1
  },
  postCard: {
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: Colors.gray102
  }
});
AllPendingPostScreen.displayName = "AllPendingPostScreen";
export { AllPendingPostScreen };
//# sourceMappingURL=all-pending-post.js.map