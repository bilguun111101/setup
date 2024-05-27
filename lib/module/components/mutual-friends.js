import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Avatar, AvatarSizes, Colors } from "@goodtechsoft/xs-core-native";
import { username } from "../utils/username";
const MutualFriendsItem = /*#__PURE__*/memo(props => {
  const {
    data: followers
  } = props;
  if (!followers.length) {
    return null;
  }
  const renderAvatar = useCallback(() => {
    if (followers.length > 2) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
        style: styles.avatars
      }, /*#__PURE__*/React.createElement(View, {
        style: styles.firstAvatar
      }, /*#__PURE__*/React.createElement(Avatar, {
        source: followers[0]?.avatar?.large,
        size: AvatarSizes.ExtraSmall
      })), /*#__PURE__*/React.createElement(View, {
        style: styles.secondAvatar
      }, /*#__PURE__*/React.createElement(Avatar, {
        source: followers[1]?.avatar?.large,
        size: AvatarSizes.ExtraSmall
      })), /*#__PURE__*/React.createElement(View, {
        style: styles.secondAvatar
      }, /*#__PURE__*/React.createElement(Avatar, {
        source: followers[2]?.avatar?.large,
        size: AvatarSizes.ExtraSmall
      }))));
    }
    if (followers.length === 2) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
        style: styles.avatars
      }, /*#__PURE__*/React.createElement(View, {
        style: styles.firstAvatar
      }, /*#__PURE__*/React.createElement(Avatar, {
        source: followers[0]?.avatar?.large,
        size: AvatarSizes.ExtraSmall
      })), /*#__PURE__*/React.createElement(View, {
        style: styles.secondAvatar
      }, /*#__PURE__*/React.createElement(Avatar, {
        source: followers[1]?.avatar?.large,
        size: AvatarSizes.ExtraSmall
      }))));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.firstAvatar
    }, /*#__PURE__*/React.createElement(Avatar, {
      source: followers[0]?.avatar?.large,
      size: AvatarSizes.ExtraSmall
    }));
  }, []);
  const renderText = useCallback(() => {
    if (followers.length > 2) {
      return /*#__PURE__*/React.createElement(Text, {
        style: styles.mutualText
      }, /*#__PURE__*/React.createElement(Text, {
        style: styles.nameText
      }, username(followers[0])), ` болон таний ${followers.length - 1} дагасан хүн нэгдсэн байна`);
    }
    return /*#__PURE__*/React.createElement(Text, {
      style: styles.mutualText
    }, /*#__PURE__*/React.createElement(Text, {
      style: styles.nameText
    }, username(followers[0])), ` нэгдсэн байна`);
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }, renderAvatar(), /*#__PURE__*/React.createElement(View, {
    style: styles.w4
  }), renderText());
});
MutualFriendsItem.displayName = "MutualFriendsItem";
export { MutualFriendsItem };
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center"
  },
  w4: {
    width: 4
  },
  firstAvatar: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 13
  },
  secondAvatar: {
    marginLeft: -8,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 13
  },
  avatars: {
    flexDirection: "row"
  },
  nameText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary
  },
  mutualText: {
    flex: 1,
    fontFamily: "Inter",
    fontSize: 12,
    color: Colors.gray104
  }
});
//# sourceMappingURL=mutual-friends.js.map