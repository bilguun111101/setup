function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { memo, useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { AppBar, ArrowLeftIcon, Button, Colors, IconSizes, Loader, SettingIcon } from "@goodtechsoft/xs-core-native";
import { NavigationRoutes } from "../../navigation/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useSwr from "swr";
import { GroupHeaderItem } from "../../components/layout/group-header";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import { LabelRenderer } from "../../components/layout/tab-bar-label-render";
import { UsersTabScreen } from "../../components/tab-list/users";
import { InfoTabScreen } from "../../components/tab-list/info";
import { GroupApi } from "../../apis";
import { PostTabScreen } from "../../components/tab-list/post";
import { InviteMemberSheet } from "../../components/bottomsheet/invite-members";
import { AdminInvitedCard } from "../../components/card/admin-invited";
const SCREEN_WIDTH = Dimensions.get("window").width;
const GroupDetailScreen = /*#__PURE__*/memo(({
  route
}) => {
  const [isActive, setIsActive] = useState(false);
  const [focusChanged, setFocusChanged] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const {
    payload,
    notifData
  } = route.params;
  const blurListener = useCallback(() => {
    setFocusChanged(false);
  }, []);
  useFocusEffect(() => {
    if (tabIndex === 0) {
      setFocusChanged(true);
    } else {
      setFocusChanged(false);
    }
    navigation.addListener("blur", blurListener);
    return () => {
      navigation.removeListener("blur", blurListener);
    };
  });
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 1000);
  }, []);
  const {
    data,
    isLoading
  } = useSwr(`swr.group.${payload._id}`, async () => {
    const res = await GroupApi.get(payload._id);
    return res;
  });
  if (isLoading) {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.loaderContainer
    }, /*#__PURE__*/React.createElement(Loader, null));
  }
  if (!data) {
    return null;
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(AppBar, {
    style: styles.appBar,
    left: /*#__PURE__*/React.createElement(Button, {
      type: "text",
      icon: /*#__PURE__*/React.createElement(ArrowLeftIcon, {
        size: IconSizes.ExtraLarge
      }),
      onPress: () => navigation.goBack()
    }),
    center: /*#__PURE__*/React.createElement(Text, {
      numberOfLines: 1,
      style: styles.title
    }, data?.name),
    right: data?.isAdmin && /*#__PURE__*/React.createElement(Button, {
      onPress: () => {
        navigation.navigate(NavigationRoutes.Group_SettingsScreen, {
          payload: data
        });
      },
      type: "text",
      icon: /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(SettingIcon, {
        color: Colors.primary,
        size: IconSizes.ExtraLarge
      }), data.pendingMembersCount > 0 && /*#__PURE__*/React.createElement(View, {
        style: styles.badge
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.badgeText
      }, data.pendingMembersCount)))
    })
  }), data?.isAdminInvited && /*#__PURE__*/React.createElement(AdminInvitedCard, {
    data: data,
    notifData: notifData
  })), /*#__PURE__*/React.createElement(Tabs.Container, {
    initialTabName: "POST",
    onIndexChange: index => setTabIndex(index),
    allowHeaderOverscroll: true,
    renderHeader: () => /*#__PURE__*/React.createElement(GroupHeaderItem, {
      data: data,
      joinButton: true,
      notifData: notifData
    }),
    headerContainerStyle: {
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20,
      shadowOpacity: 0,
      shadowRadius: 0
    },
    lazy: false,
    renderTabBar: props => /*#__PURE__*/React.createElement(View, {
      style: {
        marginHorizontal: 18
      }
    }, /*#__PURE__*/React.createElement(MaterialTabBar, _extends({}, props, {
      indicatorStyle: {
        backgroundColor: Colors.primary
      },
      width: SCREEN_WIDTH - 30
    })))
  }, /*#__PURE__*/React.createElement(Tabs.Tab, {
    name: "POST",
    label: props => /*#__PURE__*/React.createElement(LabelRenderer, {
      tabProps: props
    })
  }, /*#__PURE__*/React.createElement(PostTabScreen, {
    payload: data,
    focusChanged: focusChanged
  }), /*#__PURE__*/React.createElement(View, null)), /*#__PURE__*/React.createElement(Tabs.Tab, {
    name: "USERS",
    label: props => /*#__PURE__*/React.createElement(LabelRenderer, {
      tabProps: props
    })
  }, /*#__PURE__*/React.createElement(UsersTabScreen, {
    payload: data
  })), /*#__PURE__*/React.createElement(Tabs.Tab, {
    name: "INFO",
    label: props => /*#__PURE__*/React.createElement(LabelRenderer, {
      tabProps: props
    })
  }, /*#__PURE__*/React.createElement(InfoTabScreen, {
    data: data
  })))), payload?.isNew && isActive && /*#__PURE__*/React.createElement(InviteMemberSheet, {
    payload: data
  }));
});
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10
  },
  appBar: {
    gap: 20
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: Colors.primary,
    textAlign: "center"
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: Colors.sub200,
    width: 16,
    height: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeText: {
    fontSize: 10,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.white
  }
});
GroupDetailScreen.displayName = "GroupDetailScreen";
export { GroupDetailScreen };
//# sourceMappingURL=detail.js.map