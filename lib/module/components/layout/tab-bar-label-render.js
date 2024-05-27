import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors, IconSizes, InfoCircleIcon, PostIcon, UsersIcon } from "@goodtechsoft/xs-core-native";
const LabelRenderer = /*#__PURE__*/React.memo(props => {
  const {
    tabProps
  } = props;
  const {
    name
  } = tabProps;
  if (name === "MY") {
    return /*#__PURE__*/React.createElement(Text, {
      style: styles.title
    }, "\u0422\u0430\u043D\u044B \u0431\u04AF\u043B\u044D\u0433");
  }
  if (name === "DISCOVER") {
    return /*#__PURE__*/React.createElement(Text, {
      style: styles.title
    }, "\u0421\u0430\u043D\u0430\u043B \u0431\u043E\u043B\u0433\u043E\u0445");
  }
  if (name === "POST") {
    return /*#__PURE__*/React.createElement(PostIcon, {
      color: Colors.primary,
      size: IconSizes.Large
    });
  }
  if (name === "USERS") {
    return /*#__PURE__*/React.createElement(UsersIcon, {
      color: Colors.primary,
      size: IconSizes.Large
    });
  }
  if (name === "INFO") {
    return /*#__PURE__*/React.createElement(InfoCircleIcon, {
      color: Colors.primary,
      size: IconSizes.Large
    });
  }
  return /*#__PURE__*/React.createElement(Text, null);
});
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter",
    color: Colors.primary
  }
});
LabelRenderer.displayName = "LabelRenderer";
export { LabelRenderer };
//# sourceMappingURL=tab-bar-label-render.js.map