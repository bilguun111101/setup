import { AppBar, ArrowLeftIcon, Button, Colors, Empty, IconSizes, Loader, SearchIcon, TextInput, UsersIcon, useDebounce } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import useSWRInfinite from "swr/infinite";
import { GroupApi } from "../../apis";
import { ListUserCard } from "../../components/card/list-user";
import { RequestListCard } from "../../components/card/request-list";
import { NavigationRoutes } from "../../navigation";
import { SkeletonListUserCard } from "../../components/card/skeleton-list-user";
const AllUsersScreen = /*#__PURE__*/memo(({
  route
}) => {
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const query = useDebounce(value, 300);
  const {
    payload
  } = route.params;
  const {
    data,
    size,
    setSize,
    isLoading
  } = useSWRInfinite(index => `${payload._id}${query}swr.group.members.${index}`, async index => {
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
    data: requestedData
  } = useSWRInfinite(index => `${payload._id}.swr.request.users.${index}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await GroupApi.requestList({
      id: payload._id,
      page: parseInt(`${page || 1}`, 10) + 1
    });
    return res;
  }, {
    revalidateAll: false
  });
  const onPress = useCallback(item => {
    navigation.navigate(NavigationRoutes.Group_UserMoreSheet, {
      payload: payload,
      user: item
    });
  }, []);
  const renderItem = useCallback(({
    index,
    item
  }) => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, index !== 0 && /*#__PURE__*/React.createElement(View, {
      style: styles.h15
    }), /*#__PURE__*/React.createElement(ListUserCard, {
      onPress: user => onPress(user),
      more: true,
      user: item,
      isShowAdminReq: true
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
    }, /*#__PURE__*/React.createElement(Empty, {
      title: "Хоосон байна",
      description: "\u042D\u043D\u044D \u0431\u04AF\u043B\u044D\u0433\u0442 \u043F\u043E\u0441\u0442 \u043D\u0438\u0439\u0442\u043B\u044D\u0433\u0434\u044D\u044D\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430!",
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
  const reqData = (requestedData || [])?.map(item => item.rows).flat();
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
    }, "\u0413\u0438\u0448\u04AF\u04AF\u0434")
  })), /*#__PURE__*/React.createElement(FlatList, {
    showsVerticalScrollIndicator: false,
    ListHeaderComponent: /*#__PURE__*/React.createElement(View, {
      style: styles.headerContainer
    }, reqData.length > 0 && /*#__PURE__*/React.createElement(View, {
      style: styles.requestCard
    }, /*#__PURE__*/React.createElement(RequestListCard, {
      data: reqData,
      payload: payload
    }), /*#__PURE__*/React.createElement(View, {
      style: [styles.h10, styles.bgGray]
    })), /*#__PURE__*/React.createElement(View, {
      style: styles.borderTopRadius
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
    }))),
    data: flatData,
    ListFooterComponent: listFooter,
    renderItem: renderItem,
    ListEmptyComponent: renderEmpty,
    onEndReached: async () => {
      setNextPage(true);
      setSize(size + 1);
      setNextPage(false);
    },
    contentContainerStyle: styles.listContent,
    style: styles.list,
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
  list: {
    flex: 1
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
    lineHeight: 22,
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
  requestCard: {},
  borderTopRadius: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
    height: 10
  },
  input: {
    backgroundColor: Colors.gray101
  },
  inputContainer: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: Colors.white
  }
});
AllUsersScreen.displayName = "AllUsersScreen";
export { AllUsersScreen };
//# sourceMappingURL=all-users.js.map