import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Avatar, AvatarSizes, Button, Colors, Image, ImageSizes } from "@goodtechsoft/xs-core-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GroupApi } from "../apis";
import { username } from "../utils/username";
import useSwr, { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import { useToast } from "react-native-toast-notifications";
import { GroupVector } from "../assets/image/group-vector";
const RemoveSheet = /*#__PURE__*/memo(({
  route
}) => {
  const {
    user,
    payload
  } = route.params;
  const sfArea = useSafeAreaInsets();
  const toast = useToast();
  const {
    mutate
  } = useSWRConfig();
  const {
    data: userMe
  } = useSwr("swr.user.me");
  const {
    mutate: suggestMutate
  } = useSWRInfinite(index => `swr.group.suggest.${index}`);
  const {
    mutate: myMutate
  } = useSWRInfinite(index => `swr.group.my.query=.${index}`);
  const {
    data
  } = useSwr(`swr.group.${payload._id}`);
  const {
    mutate: userListMutate
  } = useSWRInfinite(index => `${payload._id}swr.group.members.${index}`);
  const {
    mutate: adminGroupMutate
  } = useSWRInfinite(index => `swr.group.admin.${index}`);
  const navigation = useNavigation();
  const removeGroupUser = useCallback(async () => {
    await GroupApi.removeUser(payload._id, user._id);
    toast.show("Бүлгээс хаслаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    data?.setMinusCount(mutate);
    setTimeout(() => {
      userListMutate();
    }, 300);
  }, [userListMutate]);
  const onPress = useCallback(async () => {
    data?.setJoin(mutate, false);
    await GroupApi.leaveGroup(payload._id);
    setTimeout(() => {
      suggestMutate();
      adminGroupMutate();
      myMutate();
    }, 300);
    data?.setMinusCount(mutate);
    toast.show("Бүлгээс гарлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    navigation.dispatch(StackActions.pop(2));
    navigation.goBack();
  }, [data, payload, suggestMutate, myMutate, navigation]);
  const renderText = useCallback(() => {
    if (user._id === userMe?._id) {
      return /*#__PURE__*/React.createElement(Text, {
        style: styles.title
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.username
      }, data?.name), " \u0431\u04AF\u043B\u0433\u044D\u044D\u0441 \u0433\u0430\u0440\u0430\u0445 \u0438\u0442\u0433\u044D\u043B\u0442\u044D\u0439 \u0431\u0430\u0439\u043D\u0430 \u0443\u0443?");
    }
    return /*#__PURE__*/React.createElement(Text, {
      style: styles.title
    }, "\u0422\u0430 ", /*#__PURE__*/React.createElement(Text, {
      style: styles.username
    }, username(user)), "-\u0438\u0439\u0433 \u0431\u04AF\u043B\u0433\u044D\u044D\u0441 \u0445\u0430\u0441\u0430\u0445\u0434\u0430\u0430 \u0438\u0442\u0433\u044D\u043B\u0442\u044D\u0439 \u0431\u0430\u0439\u043D\u0430 \u0443\u0443?");
  }, []);
  const renderButton = useCallback(() => {
    if (user._id === userMe?._id) {
      return /*#__PURE__*/React.createElement(Button, {
        type: "primary",
        title: "Зөвшөөрөх",
        style: styles.button,
        onPress: onPress
      });
    }
    return /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      title: "Зөвшөөрөх",
      style: styles.button,
      onPress: removeGroupUser
    });
  }, []);
  const renderTitle = useCallback(() => {
    if (userMe?._id === user._id) {
      return "Бүлгээс гарах";
    }
    return "Бүлгээс хасах";
  }, []);
  const renderAvatar = useCallback(() => {
    if (!data?.coverImage) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.cover
      }, /*#__PURE__*/React.createElement(GroupVector, {
        width: 45,
        height: 60
      }));
    }
    if (user._id === userMe?._id) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.cover
      }, /*#__PURE__*/React.createElement(Image, {
        style: styles.cover,
        source: data?.coverImage,
        size: ImageSizes.Large
      }));
    }
    return /*#__PURE__*/React.createElement(Avatar, {
      source: user.avatar?.large,
      size: AvatarSizes.Large
    });
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerTitle
  }, renderTitle()), /*#__PURE__*/React.createElement(View, {
    style: styles.contentContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, renderAvatar()), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), renderText(), /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  }), renderButton()), /*#__PURE__*/React.createElement(View, {
    style: {
      height: sfArea.bottom
    }
  }));
});
RemoveSheet.displayName = "RemoveSheet";
export { RemoveSheet };
const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    paddingHorizontal: 18
  },
  h10: {
    height: 10
  },
  h15: {
    height: 15
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    lineHeight: 20,
    textAlign: "center",
    color: Colors.primary,
    marginVertical: 12
  },
  contentContainer: {
    backgroundColor: Colors.gray101,
    borderRadius: 12,
    flex: 1
  },
  iconContainer: {
    alignSelf: "center",
    marginTop: 32
  },
  username: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    lineHeight: 18,
    textAlign: "center",
    color: Colors.primary,
    marginHorizontal: 24
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter",
    lineHeight: 18,
    textAlign: "center",
    color: Colors.primary,
    marginHorizontal: 24
  },
  description: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    lineHeight: 15,
    color: Colors.gray103,
    textAlign: "center",
    marginTop: 12,
    marginHorizontal: 24
  },
  button: {
    marginHorizontal: 24
  },
  cover: {
    width: 58,
    height: 58,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: Colors.gray102,
    alignItems: "center",
    justifyContent: "center"
  }
});
//# sourceMappingURL=remove.js.map