import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Avatar, AvatarSizes, Button, Colors, EllipsisHIcon, IconSizes } from "@goodtechsoft/xs-core-native";
import { UserNavigationRoutes } from "@goodtechsoft/xs-user-native";
import { useNavigation } from "@react-navigation/native";
import "@goodtechsoft/xs-user-native";
import { username } from "../../utils/username";
import useSwr from "swr";
import { PageNavigationRoutes } from "@goodtechsoft/xs-page-native";
const ListUserCard = /*#__PURE__*/memo(props => {
  const {
    user,
    more,
    isJoin,
    onPress,
    invite,
    isShowAdminReq
  } = props;
  if (!user) {
    return null;
  }
  const {
    data: userMe
  } = useSwr("swr.user.me");
  const navigation = useNavigation();
  const {
    data
  } = useSwr(`swr.user.${user._id}`, {
    fallbackData: user
  });
  if (!data) {
    return null;
  }
  const renderButton = useCallback(() => {
    if (data.isInvited) {
      return /*#__PURE__*/React.createElement(Button, {
        onPress: () => {
          onPress(data, "invited");
        },
        title: "Урисан"
      });
    }
    if (more) {
      return /*#__PURE__*/React.createElement(Button, {
        onPress: () => {
          onPress(data, "more");
        },
        icon: /*#__PURE__*/React.createElement(EllipsisHIcon, null),
        type: "text"
      });
    }
    if (invite && !data.isInvited) {
      return /*#__PURE__*/React.createElement(Button, {
        type: "primary",
        onPress: () => {
          onPress(data, "invite");
        },
        title: "Урих"
      });
    }
    if (isJoin) {
      return /*#__PURE__*/React.createElement(Button, {
        onPress: () => {
          onPress(data, "isJoin");
        },
        title: "Зөвшөөрөх"
      });
    }
    if (data.accountType !== "NORMAL") {
      if (data._id === userMe?._id) {
        return /*#__PURE__*/React.createElement(View, null);
      } else {
        if (data.isLiked) {
          return /*#__PURE__*/React.createElement(Button, {
            onPress: () => {
              onPress(data, "unLike");
            },
            title: "Таалагдсан"
          });
        } else {
          return /*#__PURE__*/React.createElement(Button, {
            type: "primary",
            onPress: () => {
              onPress(data, "isLike");
            },
            title: "Таалагдлаа"
          });
        }
      }
    }
    if (data.isFollowing) {
      return /*#__PURE__*/React.createElement(Button, {
        onPress: () => {
          onPress(data, "isFollowing");
        },
        title: "Дагасан"
      });
    }
    if (data.isUserRequested) {
      return /*#__PURE__*/React.createElement(Button, {
        onPress: () => {
          onPress(data, "userRequested");
        },
        title: "Хүсэлт илгээсэн"
      });
    }
    if (data._id === userMe?._id) {
      return /*#__PURE__*/React.createElement(Button, {
        onPress: () => {
          onPress(data, "me");
        },
        icon: /*#__PURE__*/React.createElement(EllipsisHIcon, {
          size: IconSizes.Large,
          color: Colors.primary
        })
      });
    }
    if (!data.isFollowing) {
      return /*#__PURE__*/React.createElement(Button, {
        type: "primary",
        onPress: () => {
          onPress(data, "follow");
        },
        title: "Дагах"
      });
    }
    return /*#__PURE__*/React.createElement(View, null);
  }, [data]);
  const goProfile = useCallback(() => {
    if (data.accountType === "NORMAL") {
      navigation.navigate(UserNavigationRoutes.User_ProfileScreen, {
        userId: data._id
      });
    } else navigation.navigate(PageNavigationRoutes.Page_ProfileScreen, {
      userId: data._id
    });
  }, [data, navigation]);
  const renderAdmin = useCallback(() => {
    if (data.isAdmin) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.adminContainer
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.adminText
      }, "\u0410\u0434\u043C\u0438\u043D"));
    }
    return /*#__PURE__*/React.createElement(View, null);
  }, [data]);
  const renderAvatarInvite = useCallback(() => {
    if (data.isAdminInvited && isShowAdminReq) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.requestAdmin
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.requestText
      }, "\u0410\u0434\u043C\u0438\u043D \u0445\u04AF\u0441\u044D\u043B\u0442 \u0438\u043B\u0433\u044D\u044D\u0441\u044D\u043D"));
    }
    return /*#__PURE__*/React.createElement(View, null);
  }, [data]);
  console.log(`[${username(data)}]`, data.isLiked, data.isFollowing);
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: goProfile,
    style: styles.card
  }, /*#__PURE__*/React.createElement(Avatar, {
    size: AvatarSizes.Large,
    source: data.avatar?.large,
    isPage: data.accountType === "NORMAL" ? false : true
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.username
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.nameText
  }, username(data)), renderAdmin(), renderAvatarInvite()), renderButton());
});
ListUserCard.displayName = "ListUserCard";
export { ListUserCard };
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 18
  },
  nameText: {
    fontFamily: "Inter",
    color: Colors.primary,
    fontWeight: "500"
  },
  button: {},
  username: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5
  },
  adminContainer: {
    paddingVertical: 1,
    paddingHorizontal: 3,
    backgroundColor: Colors.primary,
    borderRadius: 4
  },
  requestAdmin: {
    paddingVertical: 1.5,
    backgroundColor: Colors.gray101,
    borderRadius: 4,
    paddingHorizontal: 4
  },
  adminText: {
    fontSize: 11,
    color: Colors.white,
    fontFamily: "Inter",
    fontWeight: "500"
  },
  requestText: {
    fontSize: 11,
    color: Colors.primary,
    fontFamily: "Inter",
    fontWeight: "500"
  }
});
//# sourceMappingURL=list-user.js.map