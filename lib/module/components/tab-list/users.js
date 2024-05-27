import React, { memo, useCallback, useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { Colors, Empty, IconSizes, Loader, SearchIcon, TextInput, UserIcon, UsersIcon, useDebounce } from "@goodtechsoft/xs-core-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { ListUserCard } from "../card/list-user";
import { User } from "@goodtechsoft/xs-user-native";
import { GroupApi, UserApi } from "../../apis";
import useSWRInfinite from "swr/infinite";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";
import { UserNavigationRoutes } from "@goodtechsoft/xs-user-native";
import { useSWRConfig } from "swr";
import { SkeletonListUserCard } from "../card/skeleton-list-user";
const UsersTabScreen = /*#__PURE__*/memo(props => {
  const {
    payload
  } = props;
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState("");
  const query = useDebounce(value, 300);
  const {
    mutate
  } = useSWRConfig();
  const [nextPage, setNextPage] = useState(false);
  const navigation = useNavigation();
  const {
    data,
    size,
    setSize,
    isLoading
  } = useSWRInfinite(index => `${payload._id}swr.group.members.${index}${query}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await GroupApi.memberList({
      page: parseInt(`${page || 1}`, 10) + 1,
      query: query,
      id: payload._id
    });
    return res;
  }, {
    revalidateAll: true
  });
  const {
    data: adminData,
    isLoading: adminIsLoading
  } = useSWRInfinite(index => `${payload._id}swr.group.admins.${index}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await GroupApi.adminList({
      page: parseInt(`${page || 1}`, 10) + 1,
      id: payload._id
    });
    return res;
  }, {
    revalidateAll: true
  });
  const flatData = (data || [])?.map(row => row?.rows).flat();
  if (flatData && (flatData || [])[0] === null) {
    return /*#__PURE__*/React.createElement(View, null);
  }
  const flatAdminData = (adminData || [])?.map(row => row?.rows).flat();
  if (flatAdminData && (flatAdminData || [])[0] === null) {
    return /*#__PURE__*/React.createElement(View, null);
  }
  const onUnFollow = useCallback(user => {
    const _user = User.fromJson(user);
    if (_user.profilePrivacy) {
      navigation.navigate(UserNavigationRoutes.User_UnfollowConfirmSheet, {
        payload: user
      });
    } else {
      _user.setUnFollow(mutate);
      UserApi.unfollow(_user._id);
    }
  }, [mutate, navigation]);
  const onFollow = useCallback(async user => {
    const _user = User.fromJson(user);
    if (_user.profilePrivacy) {
      const res = await UserApi.follow(_user._id);
      _user.updateRequest(res._id, mutate);
    } else {
      _user.setFollow(mutate);
      await UserApi.follow(_user._id);
    }
  }, [mutate]);
  const onRemoveRequest = useCallback(user => {
    const _user = User.fromJson(user);
    _user.setRemoveRequest(mutate);
    UserApi.removeRequestCancel(_user.userRequest);
  }, [mutate]);
  const onLike = useCallback(user => {
    const _user = User.fromJson(user);
    _user.setPageLike(mutate, user._id);
    UserApi.likePage(user._id);
  }, []);
  const unLike = useCallback(user => {
    const _user = User.fromJson(user);
    _user.setPageUnLike(mutate, user._id);
    UserApi.unlikePage(user._id);
  }, []);
  const onPress = useCallback(async (user, type) => {
    switch (type) {
      case "me":
        navigation.navigate(NavigationRoutes.Group_UserMoreSheet, {
          user: user,
          payload: payload
        });
        break;
      case "isFollowing":
        onUnFollow(user);
        break;
      case "userRequested":
        onRemoveRequest(user);
        break;
      case "follow":
        onFollow(user);
        break;
      case "isLike":
        onLike(user);
        break;
      case "unLike":
        unLike(user);
        break;
      default:
        break;
    }
  }, []);
  const renderItem = useCallback(({
    index,
    item
  }) => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, index !== 0 && /*#__PURE__*/React.createElement(View, {
      style: styles.h15
    }), /*#__PURE__*/React.createElement(ListUserCard, {
      onPress: onPress,
      user: item
    }));
  }, []);
  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.empty
      }, /*#__PURE__*/React.createElement(Loader, null));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.empty
    }, query ? /*#__PURE__*/React.createElement(Empty, {
      title: "Хайсан хэрэглэгч олдсонгүй",
      description: `'${query}' нэртэй хэрэглэгч байхгүй байна`,
      icon: /*#__PURE__*/React.createElement(UserIcon, {
        size: IconSizes.Medium,
        color: Colors.white
      })
    }) : /*#__PURE__*/React.createElement(Empty, {
      title: "Хоосон байна",
      description: "\u042D\u043D\u044D \u0431\u04AF\u043B\u044D\u0433\u0442 \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447 \u0431\u0430\u0439\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430",
      icon: /*#__PURE__*/React.createElement(UsersIcon, {
        size: IconSizes.Medium,
        color: Colors.white
      })
    }));
  }, [isLoading]);
  const listFooter = useCallback(() => {
    if (nextPage) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.ph18
      }, /*#__PURE__*/React.createElement(View, {
        style: styles.h15
      }), /*#__PURE__*/React.createElement(SkeletonListUserCard, null), /*#__PURE__*/React.createElement(View, {
        style: styles.h15
      }), /*#__PURE__*/React.createElement(SkeletonListUserCard, null));
    } else {
      return /*#__PURE__*/React.createElement(View, null);
    }
  }, [nextPage]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, payload.isJoined || payload.privacy === "PUBLIC" ? /*#__PURE__*/React.createElement(Tabs.FlatList, {
    data: flatData,
    renderItem: renderItem,
    style: styles.root,
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
    showsVerticalScrollIndicator: false,
    ListHeaderComponent: /*#__PURE__*/React.createElement(View, {
      style: styles.headerContainer
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.adminCard
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.ph18
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.subTitle
    }, "\u0410\u0434\u043C\u0438\u043D")), /*#__PURE__*/React.createElement(View, {
      style: styles.h15
    }), /*#__PURE__*/React.createElement(Tabs.FlatList, {
      ListEmptyComponent: adminIsLoading ? /*#__PURE__*/React.createElement(View, {
        style: styles.loader
      }, /*#__PURE__*/React.createElement(Loader, null)) : /*#__PURE__*/React.createElement(View, null),
      data: flatAdminData,
      renderItem: renderItem
    })), /*#__PURE__*/React.createElement(View, {
      style: [styles.h10, styles.bgGray]
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.borderTopRadius
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.allUser
    }, /*#__PURE__*/React.createElement(View, {
      style: styles.h10
    }), /*#__PURE__*/React.createElement(Text, {
      style: styles.subTitle
    }, "\u041D\u0438\u0439\u0442 \u0433\u0438\u0448\u04AF\u04AF\u0434"), /*#__PURE__*/React.createElement(View, {
      style: styles.h15
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.inputContainer
    }, /*#__PURE__*/React.createElement(TextInput, {
      placeholder: "\u0425\u0430\u0439\u0445",
      onChangeText: value => setValue(value),
      style: styles.input,
      prefix: /*#__PURE__*/React.createElement(SearchIcon, {
        color: Colors.gray103,
        size: IconSizes.Medium
      })
    })))),
    ListFooterComponent: listFooter,
    ListEmptyComponent: renderEmpty,
    keyExtractor: item => item._id,
    contentContainerStyle: styles.listContent,
    contentInset: {
      top: 0,
      bottom: 20,
      left: 0,
      right: 0
    },
    onEndReached: async () => {
      setNextPage(true);
      setSize(size + 1);
      setNextPage(false);
    },
    contentInsetAdjustmentBehavior: "automatic"
  }) : /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }));
});
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101
  },
  h20: {
    height: 20
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
  bgGray: {
    backgroundColor: Colors.gray101
  },
  listContent: {
    marginTop: 0,
    backgroundColor: Colors.white,
    paddingBottom: 20
  },
  subTitle: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary
  },
  allUser: {
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingBottom: 15
  },
  inputContainer: {},
  input: {
    backgroundColor: Colors.gray101
  },
  headerContainer: {
    backgroundColor: Colors.gray101
  },
  card: {
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 10
  },
  loader: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  borderTopRadius: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: Colors.white,
    height: 10
  },
  adminCard: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingVertical: 18
  },
  empty: {
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center"
  }
});
UsersTabScreen.displayName = "UsersTabScreen";
export { UsersTabScreen };
//# sourceMappingURL=users.js.map