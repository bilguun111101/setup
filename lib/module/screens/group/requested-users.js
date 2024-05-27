import React, { memo, useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AppBar, ArrowLeftIcon, Button, Colors, Empty, IconSizes, Loader, SearchIcon, TextInput, UserIcon, useDebounce } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import { ListUserCard } from "../../components/card/list-user";
import { GroupApi } from "../../apis";
import useSWRInfinite from "swr/infinite";
import { useToast } from "react-native-toast-notifications";
import useSwr, { useSWRConfig } from "swr";
import { SkeletonListUserCard } from "../../components/card/skeleton-list-user";
const RequestedUsersScreen = /*#__PURE__*/memo(({
  route
}) => {
  const navigation = useNavigation();
  const {
    payload
  } = route.params;
  const toast = useToast();
  const [nextPage, setNextPage] = useState(false);
  const [value, setValue] = useState("");
  const query = useDebounce(value, 300);
  const {
    mutate: groupMutate
  } = useSWRConfig();
  const {
    data,
    size,
    setSize,
    isLoading,
    mutate
  } = useSWRInfinite(index => `${payload._id}.swr.request.users.${index}`, async index => {
    const page = index.split(".").pop() || "";
    const res = await GroupApi.requestList({
      id: payload._id,
      page: parseInt(`${page || 1}`, 10) + 1,
      query: query
    });
    return res;
  }, {
    revalidateAll: true
  });
  const {
    mutate: memberList
  } = useSWRInfinite(index => `${payload._id}swr.group.members.${index}`);
  const {
    data: groupData
  } = useSwr(`swr.group.${payload._id}`);
  const acceptRequest = async item => {
    await GroupApi.acceptMember({
      id: payload._id,
      userId: item._id
    });
    groupData?.setMinusPendingCount(groupMutate);
    toast.show("Зөвшөөрлөө", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    setTimeout(() => {
      mutate();
      memberList();
      groupData?.setSignCount(groupMutate);
    }, 300);
  };
  const renderItem = useCallback(({
    item
  }) => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
      style: styles.h15
    }), /*#__PURE__*/React.createElement(ListUserCard, {
      onPress: async (user, type) => {
        switch (type) {
          case "isJoin":
            return acceptRequest(user);
          default:
            break;
        }
      },
      isJoin: true,
      user: item
    }));
  }, []);
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
  const renderEmpty = useCallback(() => {
    if (isLoading) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.empty
      }, /*#__PURE__*/React.createElement(Loader, null));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.empty
    }, query ? /*#__PURE__*/React.createElement(Empty, {
      title: "Хоосон байна",
      description: `'${query}' нэртэй хэрэглэгч байхгүй байна`,
      icon: /*#__PURE__*/React.createElement(UserIcon, {
        size: IconSizes.Medium,
        color: Colors.white
      })
    }) : /*#__PURE__*/React.createElement(Empty, {
      title: "Хоосон байна",
      icon: /*#__PURE__*/React.createElement(UserIcon, {
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
    }, "\u0425\u04AF\u0441\u044D\u043B\u0442\u04AF\u04AF\u0434")
  })), /*#__PURE__*/React.createElement(FlatList, {
    ListHeaderComponent: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
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
    onEndReached: async () => {
      setNextPage(true);
      setSize(size + 1);
      setNextPage(false);
    },
    ListEmptyComponent: renderEmpty,
    keyExtractor: item => `${item._id}`,
    renderItem: renderItem,
    contentContainerStyle: styles.listContent,
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
    flexGrow: 1,
    backgroundColor: Colors.gray101
  },
  header: {
    zIndex: 10
  },
  h15: {
    height: 15
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
  listContent: {
    marginTop: 10,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.primary
  },
  input: {
    backgroundColor: Colors.gray101
  },
  inputContainer: {
    paddingHorizontal: 18
  },
  card: {
    backgroundColor: Colors.white,
    padding: 18
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
RequestedUsersScreen.displayName = "RequestedUsersScreen";
export { RequestedUsersScreen };
//# sourceMappingURL=requested-users.js.map