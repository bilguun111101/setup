import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { ArrowRightIcon, Colors } from "@goodtechsoft/xs-core-native";
const ActionItem = /*#__PURE__*/memo(props => {
  const {
    title,
    suffixIcon,
    onPress,
    badgeNumber
  } = props;
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: onPress,
    style: styles.card
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.subTitle
  }, title), badgeNumber > 0 && /*#__PURE__*/React.createElement(View, {
    style: styles.badge
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.badgeText
  }, badgeNumber)), suffixIcon && /*#__PURE__*/React.createElement(ArrowRightIcon, {
    color: Colors.primary
  }));
});
ActionItem.displayName = "ActionItem";
export { ActionItem };
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  badge: {
    backgroundColor: Colors.sub200,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeText: {
    fontSize: 10,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.white
  },
  subTitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    fontFamily: "Inter",
    color: Colors.primary
  }
});
//# sourceMappingURL=action-item.js.map