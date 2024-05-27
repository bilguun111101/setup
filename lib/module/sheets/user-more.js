import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Avatar, AvatarSizes, Colors, CommentIcon, IconSizes, UserCircleIcon, UserMinusIcon, UserNurseIcon } from "@goodtechsoft/xs-core-native";
import { NavigationRoutes } from "../navigation/types";
import { BottomsheetListCard } from "../components/card/bottomsheet-list";
import { username } from "../utils/username";
import { useNavigation } from "@react-navigation/native";
import { UserNavigationRoutes } from "@goodtechsoft/xs-user-native";
import { GroupApi } from "../apis";
import { useToast } from "react-native-toast-notifications";
import useSwr, { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import { ChatNavigationRoutes } from "@goodtechsoft/xs-chat-native";
const UserMoreSheet = /*#__PURE__*/memo(({
  route
}) => {
  const {
    user,
    payload
  } = route.params;
  const navigation = useNavigation();
  const toast = useToast();
  const {
    mutate
  } = useSWRConfig();
  const {
    data: userMe
  } = useSwr("swr.user.me");
  const {
    mutate: adminMutate
  } = useSWRInfinite(index => `${payload._id}swr.group.admins.${index}`);
  const {
    mutate: membersMutate
  } = useSWRInfinite(index => `${payload._id}swr.group.members.${index}`);
  const inviteAdmin = useCallback(async () => {
    user.setAdminInvited(mutate, user._id);
    await GroupApi.inviteAdmin({
      id: payload._id,
      userId: user._id
    });
    navigation.goBack();
    toast.show("Амжилттай илгээлээ", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
  }, [navigation]);
  const declineAdminInvite = useCallback(async () => {
    user.setAdminInvitedCancel(mutate, user._id);
    await GroupApi.cancelAdminRequest(payload._id, user._id);
    navigation.goBack();
    toast.show("Хүсэлт цуцлагдлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
  }, []);
  const leaveGroup = useCallback(() => {
    navigation.navigate(NavigationRoutes.Group_RemoveSheet, {
      user: user,
      payload: payload
    });
  }, [navigation]);
  const removeGroup = useCallback(async () => {
    payload.setMinusCount(mutate);
    await GroupApi.removeGroup(payload._id, user._id);
    navigation.goBack();
    toast.show("Бүлгээс хаслаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    setTimeout(() => {
      membersMutate();
    }, 300);
  }, [navigation]);
  const removeAdmin = useCallback(async () => {
    user.setUnTakeAdmin(mutate, user._id);
    await GroupApi.removeAdmin(payload._id, user._id);
    navigation.goBack();
    toast.show("Амдинаас хаслаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
  }, [navigation, user]);
  const refuseAdmin = useCallback(async () => {
    user.setUnTakeAdmin(mutate, user._id);
    await GroupApi.refuseAdmin(payload._id);
    navigation.goBack();
    toast.show("Админ эрх ариллаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    setTimeout(() => {
      adminMutate();
    }, 300);
  }, [navigation, adminMutate, user]);
  const seeProfile = useCallback(() => {
    navigation.navigate(UserNavigationRoutes.User_ProfileScreen, {
      userId: user._id
    });
  }, [navigation]);
  const goChat = useCallback(() => {
    navigation.navigate(ChatNavigationRoutes.Chat_ChatScreen, {
      user: user,
      type: "SINGLE",
      payload: user._id
    });
  }, [navigation]);
  const renderButtons = useCallback(() => {
    if (user._id === userMe._id) {
      if (payload.isGroupOwner) {
        return /*#__PURE__*/React.createElement(React.Fragment, null);
      }
      if (payload.isAdmin) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BottomsheetListCard, {
          title: "\u0410\u0434\u043C\u0438\u043D \u044D\u0440\u0445\u044D\u044D \u0430\u0440\u0438\u043B\u0433\u0430\u0445",
          icon: /*#__PURE__*/React.createElement(UserNurseIcon, {
            color: Colors.primary,
            size: IconSizes.Medium
          }),
          onPress: refuseAdmin
        }), /*#__PURE__*/React.createElement(View, {
          style: styles.h10
        }), /*#__PURE__*/React.createElement(BottomsheetListCard, {
          title: "\u0411\u04AF\u043B\u0433\u044D\u044D\u0441 \u0433\u0430\u0440\u0430\u0445",
          icon: /*#__PURE__*/React.createElement(UserMinusIcon, {
            color: Colors.primary,
            size: IconSizes.Medium
          }),
          onPress: leaveGroup
        }));
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BottomsheetListCard, {
        title: "\u0411\u04AF\u043B\u0433\u044D\u044D\u0441 \u0433\u0430\u0440\u0430\u0445",
        icon: /*#__PURE__*/React.createElement(UserMinusIcon, {
          color: Colors.primary,
          size: IconSizes.Medium
        }),
        onPress: leaveGroup
      }));
    }
    if (user.isGroupOwner) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BottomsheetListCard, {
        title: "\u041F\u0440\u043E\u0444\u0430\u0439\u043B \u04AF\u0437\u044D\u0445",
        icon: /*#__PURE__*/React.createElement(UserCircleIcon, {
          color: Colors.primary,
          size: IconSizes.Medium
        }),
        onPress: seeProfile
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.h10
      }), /*#__PURE__*/React.createElement(BottomsheetListCard, {
        title: "\u0427\u0430\u0442 \u0431\u0438\u0447\u0438\u0445",
        icon: /*#__PURE__*/React.createElement(CommentIcon, {
          color: Colors.primary,
          size: IconSizes.Medium
        }),
        onPress: goChat
      }));
    }
    if (user.isAdmin) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BottomsheetListCard, {
        title: "\u0410\u0434\u043C\u0438\u043D\u0430\u0430\u0441 \u0445\u0430\u0441\u0430\u0445",
        icon: /*#__PURE__*/React.createElement(UserNurseIcon, {
          color: Colors.primary,
          size: IconSizes.Medium
        }),
        onPress: removeAdmin
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.h10
      }), /*#__PURE__*/React.createElement(BottomsheetListCard, {
        title: "\u0411\u04AF\u043B\u0433\u044D\u044D\u0441 \u0433\u0430\u0440\u0433\u0430\u0445",
        icon: /*#__PURE__*/React.createElement(UserMinusIcon, {
          color: Colors.primary,
          size: IconSizes.Medium
        }),
        onPress: removeGroup
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.h10
      }), /*#__PURE__*/React.createElement(BottomsheetListCard, {
        title: "\u041F\u0440\u043E\u0444\u0430\u0439\u043B \u04AF\u0437\u044D\u0445",
        icon: /*#__PURE__*/React.createElement(UserCircleIcon, {
          color: Colors.primary,
          size: IconSizes.Medium
        }),
        onPress: seeProfile
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.h10
      }), /*#__PURE__*/React.createElement(BottomsheetListCard, {
        title: "\u0427\u0430\u0442 \u0431\u0438\u0447\u0438\u0445",
        icon: /*#__PURE__*/React.createElement(CommentIcon, {
          color: Colors.primary,
          size: IconSizes.Medium
        }),
        onPress: goChat
      }));
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, user.isAdminInvited ? /*#__PURE__*/React.createElement(BottomsheetListCard, {
      title: "\u0410\u0434\u043C\u0438\u043D \u0443\u0440\u0438\u043B\u0433\u0430 \u0446\u0443\u0446\u043B\u0430\u0445",
      icon: /*#__PURE__*/React.createElement(UserNurseIcon, {
        color: Colors.primary,
        size: IconSizes.Medium
      }),
      onPress: declineAdminInvite
    }) : /*#__PURE__*/React.createElement(BottomsheetListCard, {
      title: "\u0410\u0434\u043C\u0438\u043D \u0443\u0440\u0438\u043B\u0433\u0430 \u0438\u043B\u0433\u044D\u044D\u0445",
      icon: /*#__PURE__*/React.createElement(UserNurseIcon, {
        color: Colors.primary,
        size: IconSizes.Medium
      }),
      onPress: inviteAdmin
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.h10
    }), /*#__PURE__*/React.createElement(BottomsheetListCard, {
      title: "\u0411\u04AF\u043B\u0433\u044D\u044D\u0441 \u0433\u0430\u0440\u0433\u0430\u0445",
      icon: /*#__PURE__*/React.createElement(UserMinusIcon, {
        color: Colors.primary,
        size: IconSizes.Medium
      }),
      onPress: removeGroup
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.h10
    }), /*#__PURE__*/React.createElement(BottomsheetListCard, {
      title: "\u041F\u0440\u043E\u0444\u0430\u0439\u043B \u04AF\u0437\u044D\u0445",
      icon: /*#__PURE__*/React.createElement(UserCircleIcon, {
        color: Colors.primary,
        size: IconSizes.Medium
      }),
      onPress: seeProfile
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.h10
    }), /*#__PURE__*/React.createElement(BottomsheetListCard, {
      title: "\u0427\u0430\u0442 \u0431\u0438\u0447\u0438\u0445",
      icon: /*#__PURE__*/React.createElement(CommentIcon, {
        color: Colors.primary,
        size: IconSizes.Medium
      }),
      onPress: goChat
    }));
  }, [user]);
  return /*#__PURE__*/React.createElement(BottomSheetScrollView, {
    style: styles.root,
    showsVerticalScrollIndicator: false
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.userContainer
  }, /*#__PURE__*/React.createElement(Avatar, {
    source: user.avatar?.large,
    size: AvatarSizes.Large
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.username
  }, username(user))), /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  }), renderButtons());
});
UserMoreSheet.displayName = "UserMoreSheet";
export { UserMoreSheet };
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 18
  },
  h15: {
    height: 15
  },
  h10: {
    height: 10
  },
  userContainer: {
    alignItems: "center"
  },
  username: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    color: Colors.primary
  },
  card: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.gray101,
    borderWidth: 1,
    padding: 10
  }
});
//# sourceMappingURL=user-more.js.map