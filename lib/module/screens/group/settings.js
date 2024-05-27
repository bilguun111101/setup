import React, { memo, useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AppBar, ArrowLeftIcon, Button, Colors, Empty, IconSizes, Loader, PostIcon } from "@goodtechsoft/xs-core-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { GroupApi, PostApi } from "../../apis";
import { ActionItem } from "../../components/layout/action-item";
import { NavigationRoutes } from "../../navigation";
import { useToast } from "react-native-toast-notifications";
import useSWRInfinite from "swr/infinite";
import { Post, PostCard } from "@goodtechsoft/xs-post-native";
import useSWR from "swr";
const SettingsScreen = /*#__PURE__*/memo(({
  route
}) => {
  const {
    payload
  } = route.params;
  const navigation = useNavigation();
  const toast = useToast();
  const {
    mutate: myGroupMutate
  } = useSWRInfinite(index => `swr.group.my.${index}`);
  const {
    mutate: groupAdminMutate
  } = useSWRInfinite(index => `swr.group.admin.${index}`);
  const {
    mutate: postListMutate
  } = useSWRInfinite((_, _prev) => {
    return `${payload._id}.swr.group|${_prev?.nextPage || ""}`;
  });
  const {
    data: groupData
  } = useSWR(`swr.group.${payload._id}`, {
    fallbackData: payload
  });
  if (!groupData) {
    return null;
  }
  const {
    data,
    isLoading,
    mutate
  } = useSWR(`swr.requested.post.${groupData._id}`, async _ => {
    const res = await PostApi.postRequestList({
      id: groupData._id,
      page: 1,
      limit: 3
    });
    return res;
  });
  const goInfo = useCallback(() => {
    return navigation.navigate(NavigationRoutes.Group_InfoScreen, {
      payload: groupData
    });
  }, [navigation]);
  const goUsersList = useCallback(() => {
    return navigation.navigate(NavigationRoutes.Group_AllUsersScreen, {
      payload: groupData
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
      }
    });
  }, [navigation]);
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
    await PostApi.approvePost(groupData._id, item._id);
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
  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.empty
      }, /*#__PURE__*/React.createElement(Loader, null));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.empty
    }, /*#__PURE__*/React.createElement(Empty, {
      title: "Хоосон байна",
      description: "\u0425\u04AF\u043B\u044D\u044D\u0433\u0434\u044D\u0436 \u0431\u0443\u0439 \u043F\u043E\u0441\u0442 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430",
      icon: /*#__PURE__*/React.createElement(PostIcon, {
        size: IconSizes.Medium,
        color: Colors.white
      })
    }));
  }, [isLoading]);
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
  const goPendingPost = useCallback(() => {
    navigation.navigate(NavigationRoutes.Group_AllPendingPostScreen, {
      payload: groupData
    });
  }, [navigation]);
  const renderFooter = useCallback(() => {
    if (data?.rows.length > 3) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.footer
      }, /*#__PURE__*/React.createElement(Button, {
        onPress: goPendingPost,
        title: "Бусад постыг харах",
        type: "primary"
      }));
    }
    return /*#__PURE__*/React.createElement(View, null);
  }, []);
  if (!data) {
    return null;
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
    }, "\u0422\u043E\u0445\u0438\u0440\u0433\u043E\u043E")
  })), /*#__PURE__*/React.createElement(FlatList, {
    ListHeaderComponent: /*#__PURE__*/React.createElement(View, {
      style: styles.ph18
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.h15
    }), /*#__PURE__*/React.createElement(ActionItem, {
      onPress: goInfo,
      title: "Бүлгийн мэдээлэл",
      suffixIcon: true
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.h10
    }), /*#__PURE__*/React.createElement(ActionItem, {
      onPress: goUsersList,
      title: "Нийт гишүүд болон админ",
      badgeNumber: groupData.pendingMembersCount,
      suffixIcon: true
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.h10
    }), /*#__PURE__*/React.createElement(ActionItem, {
      onPress: deleteGroup,
      title: "Бүлэг устгах",
      suffixIcon: true
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.h15
    }), /*#__PURE__*/React.createElement(Text, {
      style: styles.title
    }, `Нийтлэх хүсэлт (${data.count})`)),
    data: data ? data.rows.flat() : [],
    renderItem: renderItem,
    ListEmptyComponent: renderEmpty,
    ListFooterComponent: renderFooter,
    contentInset: {
      top: 0,
      bottom: 20,
      left: 0,
      right: 0
    },
    contentInsetAdjustmentBehavior: "automatic",
    initialNumToRender: 3
  }));
});
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101
  },
  row: {
    gap: 10,
    paddingHorizontal: 18,
    flexDirection: "row"
  },
  ph18: {
    paddingHorizontal: 18
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10
  },
  h15: {
    height: 15
  },
  h10: {
    height: 10
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.primary
  },
  postCard: {
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: Colors.gray102
  },
  button: {
    flex: 1
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
  footer: {
    marginTop: 10,
    marginHorizontal: 18
  }
});
SettingsScreen.displayName = "SettingsScreen";
export { SettingsScreen };
//# sourceMappingURL=settings.js.map