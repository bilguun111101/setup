import { AppBar, ArrowLeftIcon, Button, Colors, Empty, IconSizes, Loader, SearchIcon, TextInput, UserIcon, useDebounce } from "@goodtechsoft/xs-core-native";
import { User } from "@goodtechsoft/xs-user-native";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { GroupApi } from "../../apis";
import { ListUserCard } from "../../components/card/list-user";
import useSWRInfinite from "swr/infinite";
import useSWR, { useSWRConfig } from "swr";
import { SkeletonListUserCard } from "../../components/card/skeleton-list-user";
const InviteUsersScreen = /*#__PURE__*/memo(({
  route
}) => {
  const [value, setValue] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const query = useDebounce(value, 300);
  const navigation = useNavigation();
  const {
    payload
  } = route.params;
  const {
    mutate
  } = useSWRConfig();
  const {
    data: user
  } = useSWR("swr.user.me");
  const {
    data,
    size,
    setSize,
    isLoading
  } = useSWRInfinite(index => {
    return `${user?._id}.${query}.swr.followers|${index}`;
  }, async url => {
    const nextPage = url.split("|").pop() || undefined;
    const res = await GroupApi.invitationList({
      limit: 10,
      page: parseInt(`${nextPage || 1}`, 10) + 1,
      query: query,
      id: payload._id
    });
    return res;
  }, {
    revalidateAll: true
  });
  const onPress = useCallback(async user => {
    const _user = User.fromJson(user);
    const sendData = {
      user: _user._id
    };
    if (!_user.isInvited) {
      _user.setGroupInvite(mutate);
      await GroupApi.inviteMember({
        id: payload._id,
        data: sendData
      });
    } else {
      _user.setGroupUnInvite(mutate);
      await GroupApi.inviteCancel({
        id: payload._id,
        data: sendData
      });
    }
  }, []);
  const renderItem = useCallback(({
    index,
    item
  }) => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, index !== 0 && /*#__PURE__*/React.createElement(View, {
      style: styles.h15
    }), /*#__PURE__*/React.createElement(ListUserCard, {
      onPress: user => onPress(user),
      invite: true,
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
      description: `'${query}' нэртэй хэрэглэгчт байхгүй байна`,
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
    }, "\u0413\u0438\u0448\u04AF\u04AF\u043D \u0443\u0440\u0438\u0445")
  })), /*#__PURE__*/React.createElement(FlatList, {
    showsVerticalScrollIndicator: false,
    ListHeaderComponent: /*#__PURE__*/React.createElement(View, {
      style: styles.headerContainer
    }, /*#__PURE__*/React.createElement(View, {
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
    renderItem: renderItem,
    ListEmptyComponent: renderEmpty(),
    ListFooterComponent: listFooter,
    onEndReached: async () => {
      setNextPage(true);
      setSize(size + 1);
      setNextPage(false);
    },
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
    padding: 18,
    backgroundColor: Colors.white
  }
});
InviteUsersScreen.displayName = "InviteUsersScreen";
export { InviteUsersScreen };
//# sourceMappingURL=invite-users.js.map