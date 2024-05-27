import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Colors, EditIcon, IconSizes, InfoCircleIcon } from "@goodtechsoft/xs-core-native";
const ResultForm = /*#__PURE__*/memo(({
  title,
  description,
  onPress
}) => {
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, title), /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), /*#__PURE__*/React.createElement(Pressable, {
    onPress: onPress,
    style: styles.row
  }, /*#__PURE__*/React.createElement(InfoCircleIcon, {
    color: Colors.primary,
    size: IconSizes.Medium
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.description
  }, description), onPress && /*#__PURE__*/React.createElement(EditIcon, {
    color: Colors.primary,
    size: IconSizes.Medium
  })));
});
ResultForm.displayName = "ResultForm";
export { ResultForm };
const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderRadius: 10
  },
  row: {
    flexDirection: "row",
    gap: 10
  },
  h10: {
    height: 10
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.primary
  },
  description: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.primary
  }
});
//# sourceMappingURL=form-result.js.map