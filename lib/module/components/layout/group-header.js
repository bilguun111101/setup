import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { ArrowBottomIcon, Button, Colors, CommentIcon, GlobeIcon, IconSizes, LockIcon, UserPlusAltIcon } from "@goodtechsoft/xs-core-native";
import { MutualFriendsItem } from "../mutual-friends";
import { DescriptionItem } from "../description";
import { useNavigation } from "@react-navigation/native";
import { GroupApi } from "../../apis";
import { NavigationRoutes } from "../../navigation";
import useSwr, { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import { CoverImage } from "./cover";
import { ChatNavigationRoutes } from "@goodtechsoft/xs-chat-native";
const GroupHeaderItem = /*#__PURE__*/memo(props => {
  const {
    joinButton = false,
    data,
    notifData
  } = props;
  const {
    mutate
  } = useSWRConfig();
  const navigation = useNavigation();
  const {
    data: user
  } = useSwr("swr.user.me");
  const {
    mutate: thisGroupMutate
  } = useSwr(`swr.group.${data._id}`);
  const {
    mutate: myMutate
  } = useSWRInfinite(index => `swr.group.my.${index}`);
  if (!data) {
    return null;
  }
  const onInfo = useCallback(() => {
    console.log("INFO");
  }, []);
  const onRule = useCallback(() => {}, [navigation]);
  const onPress = useCallback(() => {
    navigation.navigate(NavigationRoutes.Group_UserMoreSheet, {
      user: user,
      payload: data
    });
  }, []);
  const join = useCallback(async () => {
    try {
      if (notifData) {
        notifData.setIsDone(mutate);
      }
      await GroupApi.join(data._id);
      if (data.privacy === "PRIVATE") {
        if (data.isInvited) {
          data.setSignCount(mutate);
          data.setJoin(mutate, true);
          myMutate();
          thisGroupMutate();
        } else {
          data.setPending(mutate, true);
        }
      } else {
        data.setSignCount(mutate);
        data.setJoin(mutate, true);
        myMutate();
        thisGroupMutate();
      }
    } catch (error) {
      console.log(error);
    }
  }, [data, mutate, myMutate, thisGroupMutate]);
  const cancel = useCallback(async () => {
    try {
      await GroupApi.cancelRequest(data._id);
      data.setPending(mutate, false);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const inviteUsers = useCallback(() => {
    navigation.navigate(NavigationRoutes.Group_InviteUsersScreen, {
      payload: data
    });
  }, []);
  const goChat = useCallback(() => {
    navigation.navigate(ChatNavigationRoutes.Chat_CommunityListScreen, {
      payload: data
    });
  }, []);
  const renderButton = useCallback(() => {
    if (data.isAdmin) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.row
      }, /*#__PURE__*/React.createElement(Button, {
        onPress: inviteUsers,
        type: "primary",
        icon: /*#__PURE__*/React.createElement(UserPlusAltIcon, {
          color: Colors.white,
          size: IconSizes.Large
        })
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.w4
      }), /*#__PURE__*/React.createElement(Button, {
        style: styles.actionButton,
        onPress: onPress,
        title: "\u041D\u044D\u0433\u0434\u0441\u044D\u043D",
        type: "default",
        icon: /*#__PURE__*/React.createElement(ArrowBottomIcon, {
          color: Colors.primary,
          size: IconSizes.Medium
        })
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.w4
      }), /*#__PURE__*/React.createElement(Button, {
        onPress: goChat,
        type: "primary",
        icon: /*#__PURE__*/React.createElement(CommentIcon, {
          color: Colors.white,
          size: IconSizes.Large
        })
      }));
    }
    if (data.isJoined) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.row
      }, /*#__PURE__*/React.createElement(Button, {
        onPress: inviteUsers,
        type: "primary",
        icon: /*#__PURE__*/React.createElement(UserPlusAltIcon, {
          color: Colors.white,
          size: IconSizes.Large
        })
      }), /*#__PURE__*/React.createElement(Button, {
        style: styles.actionButton,
        onPress: onPress,
        title: "\u041D\u044D\u0433\u0434\u0441\u044D\u043D",
        type: "default",
        icon: /*#__PURE__*/React.createElement(ArrowBottomIcon, {
          color: Colors.primary,
          size: IconSizes.Medium
        })
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.w4
      }), /*#__PURE__*/React.createElement(Button, {
        onPress: goChat,
        type: "primary",
        icon: /*#__PURE__*/React.createElement(CommentIcon, {
          color: Colors.white,
          size: IconSizes.Large
        })
      }));
    }
    if (data.isPending) {
      return /*#__PURE__*/React.createElement(Button, {
        onPress: cancel,
        title: "\u0425\u04AF\u0441\u044D\u043B\u0442 \u0446\u0443\u0446\u043B\u0430\u0445",
        type: "default"
      });
    }
    if (data.isInvited) {
      return /*#__PURE__*/React.createElement(Button, {
        onPress: join,
        title: "\u041D\u044D\u0433\u0434\u044D\u0445",
        type: "primary"
      });
    }
    return /*#__PURE__*/React.createElement(Button, {
      onPress: join,
      title: "\u041D\u044D\u0433\u0434\u044D\u0445",
      type: "primary"
    });
  }, [data]);
  const renderPrivacy = useCallback(() => {
    if (data.privacy === "PUBLIC") {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
        style: styles.groupPrivacy
      }, /*#__PURE__*/React.createElement(GlobeIcon, {
        color: Colors.gray103,
        size: IconSizes.Small
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.w4
      }), /*#__PURE__*/React.createElement(Text, {
        style: styles.privacyText
      }, "\u041D\u044D\u044D\u043B\u0442\u0442\u044D\u0439 \u0431\u04AF\u043B\u044D\u0433")));
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
      style: styles.groupPrivacy
    }, /*#__PURE__*/React.createElement(LockIcon, {
      color: Colors.gray103,
      size: IconSizes.Small
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.w4
    }), /*#__PURE__*/React.createElement(Text, {
      style: styles.privacyText
    }, "\u041D\u0443\u0443\u0446\u043B\u0430\u043B\u0442\u0430\u0439 \u0431\u04AF\u043B\u044D\u0433")));
  }, [data]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(View, {
    pointerEvents: "none",
    style: styles.cover
  }, /*#__PURE__*/React.createElement(CoverImage, {
    image: data.coverImage,
    width: 230,
    height: 170
  })), /*#__PURE__*/React.createElement(View, {
    style: styles.headerCard,
    pointerEvents: "none"
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.groupName
  }, data.name), /*#__PURE__*/React.createElement(View, {
    style: styles.h4
  }), renderPrivacy(), /*#__PURE__*/React.createElement(View, {
    style: styles.h4
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.privacyText
  }, data.membersCount, " \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447"), /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  })), /*#__PURE__*/React.createElement(View, {
    pointerEvents: "box-none",
    style: styles.ph18
  }, joinButton && /*#__PURE__*/React.createElement(React.Fragment, null, renderButton(), /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  })), !data.isJoined && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DescriptionItem, {
    title: "Тухай",
    onPress: onInfo,
    description: data.description
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  }), data.rule && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DescriptionItem, {
    title: "Дүрэм",
    onPress: onRule,
    description: data.rule
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.h15
  })), data.followers && /*#__PURE__*/React.createElement(MutualFriendsItem, {
    data: data.followers
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.h20
  }))));
});
GroupHeaderItem.displayName = "GroupHeaderItem";
export { GroupHeaderItem };
const styles = StyleSheet.create({
  root: {
    pointerEvents: "box-none"
  },
  header: {
    zIndex: 10
  },
  row: {
    flexDirection: "row"
  },
  ph18: {
    paddingHorizontal: 18
  },
  h15: {
    height: 15
  },
  h20: {
    height: 20
  },
  h4: {
    height: 4
  },
  w4: {
    width: 4
  },
  actionButton: {
    flex: 1
  },
  headerCard: {
    paddingHorizontal: 18,
    backgroundColor: Colors.white
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: Colors.primary
  },
  cover: {
    height: 210,
    width: "100%",
    backgroundColor: Colors.gray102
  },
  groupName: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 24,
    color: Colors.primary
  },
  groupPrivacy: {
    flexDirection: "row"
  },
  privacyText: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray103
  }
});
//# sourceMappingURL=group-header.js.map