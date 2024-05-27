function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { memo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { AppBar, ArrowLeftIcon, Button, Colors, IconSizes, PlusIcon } from "@goodtechsoft/xs-core-native";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import { NavigationRoutes } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { DiscoveredTabScreen } from "../../components/tab-list/discovered-groups";
import { MyGroupTabScreen } from "../../components/tab-list/my-groups";
import { LabelRenderer } from "../../components/layout/tab-bar-label-render";
const width = Dimensions.get("window").width;
const HomeScreen = /*#__PURE__*/memo(() => {
  const navigation = useNavigation();
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
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
    right: /*#__PURE__*/React.createElement(Button, {
      type: "text",
      icon: /*#__PURE__*/React.createElement(PlusIcon, {
        size: IconSizes.ExtraLarge
      }),
      onPress: () => navigation.navigate(NavigationRoutes.Group_CreateScreen)
    }),
    center: /*#__PURE__*/React.createElement(Text, {
      style: styles.title
    }, "\u0411\u04AF\u043B\u044D\u0433")
  })), /*#__PURE__*/React.createElement(Tabs.Container, {
    initialTabName: "MY",
    renderHeader: () => /*#__PURE__*/React.createElement(View, null),
    headerContainerStyle: {
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20,
      shadowOpacity: 0,
      shadowRadius: 0
    },
    lazy: true,
    renderTabBar: props => /*#__PURE__*/React.createElement(View, {
      style: {
        marginHorizontal: 18
      }
    }, /*#__PURE__*/React.createElement(MaterialTabBar, _extends({}, props, {
      indicatorStyle: {
        backgroundColor: Colors.primary
      },
      width: width - 30
    })))
  }, /*#__PURE__*/React.createElement(Tabs.Tab, {
    name: "MY",
    label: props => /*#__PURE__*/React.createElement(LabelRenderer, {
      tabProps: props
    })
  }, /*#__PURE__*/React.createElement(MyGroupTabScreen, null)), /*#__PURE__*/React.createElement(Tabs.Tab, {
    name: "DISCOVER",
    label: props => /*#__PURE__*/React.createElement(LabelRenderer, {
      tabProps: props
    })
  }, /*#__PURE__*/React.createElement(DiscoveredTabScreen, null))));
});
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    zIndex: 10,
    overflow: "hidden"
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.primary
  }
});
HomeScreen.displayName = "UserHomeScreen";
export { HomeScreen };
//# sourceMappingURL=home.js.map