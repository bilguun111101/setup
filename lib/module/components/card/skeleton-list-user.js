import React, { memo } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const SkeletonListUserCard = /*#__PURE__*/memo(() => {
  return /*#__PURE__*/React.createElement(SkeletonPlaceholder, {
    borderRadius: 4
  }, /*#__PURE__*/React.createElement(SkeletonPlaceholder.Item, {
    flexDirection: "row",
    alignItems: "center"
  }, /*#__PURE__*/React.createElement(SkeletonPlaceholder.Item, {
    width: 58,
    height: 58,
    borderRadius: 24
  }), /*#__PURE__*/React.createElement(SkeletonPlaceholder.Item, {
    marginLeft: 10
  }, /*#__PURE__*/React.createElement(SkeletonPlaceholder.Item, {
    width: 120,
    height: 15
  }))));
});
SkeletonListUserCard.displayName = "SkeletonListUserCard";
export { SkeletonListUserCard };
//# sourceMappingURL=skeleton-list-user.js.map