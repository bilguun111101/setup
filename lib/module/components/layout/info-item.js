import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { ArrowRightIcon, Colors } from "@goodtechsoft/xs-core-native";
const InfoItem = /*#__PURE__*/memo(({
  title,
  description,
  onSubmit,
  primary,
  isRemove
}) => {
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: [styles.content, isRemove && styles.redBorder],
    onPress: onSubmit
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.contentTitle, primary && {
      color: Colors.primary
    }, isRemove && styles.redText]
  }, title), /*#__PURE__*/React.createElement(View, {
    style: styles.contentResultContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.contentResult,
    numberOfLines: 1,
    ellipsizeMode: "tail"
  }, description), /*#__PURE__*/React.createElement(ArrowRightIcon, {
    color: isRemove ? Colors.sub200 : Colors.gray103,
    size: 20
  })));
});
InfoItem.displayName = "InfoItem";
export { InfoItem };
const styles = StyleSheet.create({
  content: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 8,
    alignItems: "center"
  },
  contentTitle: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: Colors.gray103,
    flex: 1
  },
  contentResultContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end"
  },
  contentResult: {
    marginRight: 8,
    fontFamily: "Inter-Medium",
    fontSize: 14,
    lineHeight: 16,
    color: Colors.primary
  },
  redText: {
    color: Colors.sub200
  },
  redBorder: {
    borderColor: Colors.sub200,
    borderWidth: 1
  }
});
//# sourceMappingURL=info-item.js.map