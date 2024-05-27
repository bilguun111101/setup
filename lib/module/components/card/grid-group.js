import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Button, Colors } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation/types";
import useSwr, { useSWRConfig } from "swr";
import { GroupApi } from "../../apis";
import useSWRInfinite from "swr/infinite";
import { CoverImage } from "../layout/cover";
const SCREEN_WIDTH = Dimensions.get("window").width;
const GridGroupCard = /*#__PURE__*/memo(props => {
  const {
    payload,
    isModal,
    joined,
    onAction
  } = props;
  const {
    mutate
  } = useSWRConfig();
  const {
    data
  } = useSwr(`swr.group.${payload._id}`, {
    fallbackData: payload
  });
  if (!data) {
    return null;
  }
  const {
    mutate: listMutate
  } = useSWRInfinite(index => `swr.group.my.${index}`);
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    if (isModal && !data?.isJoined) {
      return navigation.navigate(NavigationRoutes.Group_JoinSheet, {
        payload: data
      });
    } else {
      return navigation.navigate(NavigationRoutes.Group_GroupDetailScreen, {
        payload: payload
      });
    }
  }, [navigation, data, payload]);
  if (!data) {
    return null;
  }
  const join = useCallback(async () => {
    if (data.privacy === "PUBLIC" || data.isInvited) {
      data.setSignCount(mutate);
      data.setJoin(mutate, true);
    } else {
      data.setPending(mutate, true);
    }
    await GroupApi.join(data._id);
    setTimeout(() => {
      listMutate();
    }, 200);
  }, [data, mutate, listMutate]);
  const cancel = useCallback(async () => {
    try {
      data.setPending(mutate, false);
      await GroupApi.cancelRequest(data._id);
    } catch (error) {
      console.log(error);
    }
  }, [data]);
  const renderButton = useCallback(() => {
    if (data.isJoined || joined) {
      return /*#__PURE__*/React.createElement(Button, {
        type: "default",
        title: "Үзэх",
        style: styles.button,
        onPress: () => navigation.navigate(NavigationRoutes.Group_GroupDetailScreen, {
          payload: data
        })
      });
    }
    if (data.isPending) {
      return /*#__PURE__*/React.createElement(Button, {
        type: "default",
        title: "Хүсэлт цуцлах",
        style: styles.button,
        onPress: cancel
      });
    }
    return /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      title: "Нэгдэх",
      style: styles.button,
      onPress: join
    });
  }, [data]);
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: onAction || onPress,
    style: [styles.root, {
      width: SCREEN_WIDTH / 2 - 23
    }]
  }, /*#__PURE__*/React.createElement(CoverImage, {
    image: data.coverImage,
    style: styles.cover,
    width: 120,
    height: 70
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.ph10, styles.between]
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 2,
    style: styles.name
  }, data.name), /*#__PURE__*/React.createElement(View, {
    style: styles.h4
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.memberCount
  }, `${data.membersCount} хэрэглэгчтэй`), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  })), /*#__PURE__*/React.createElement(View, null, renderButton(), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }))));
});
GridGroupCard.displayName = "GridGroupCard";
export { GridGroupCard };
const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.white,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: Colors.gray101,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15
  },
  between: {
    justifyContent: "space-between",
    flex: 1
  },
  ph10: {
    paddingHorizontal: 10
  },
  h4: {
    height: 4
  },
  h10: {
    height: 10
  },
  name: {
    fontFamily: "Inter",
    fontWeight: "500",
    color: Colors.primary,
    fontSize: 14
  },
  memberCount: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray103
  },
  button: {
    width: "100%"
  },
  cover: {
    height: 60
  }
});
//# sourceMappingURL=grid-group.js.map