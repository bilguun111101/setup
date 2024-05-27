import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useMemo } from "react";
import { ArrowRightIcon, Avatar, AvatarSizes, Colors } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";
import { username } from "../../utils/username";
const RequestListCard = /*#__PURE__*/memo(props => {
  const navigation = useNavigation();
  const {
    data,
    payload
  } = props;
  const renderUserImage = useMemo(() => {
    if (data.length > 1) {
      return /*#__PURE__*/React.createElement(View, {
        style: styles.avatarImages
      }, /*#__PURE__*/React.createElement(View, {
        style: styles.image1
      }, /*#__PURE__*/React.createElement(Avatar, {
        source: data[0] && data[0]?.avatar?.large || "",
        size: AvatarSizes.Medium
      })), /*#__PURE__*/React.createElement(View, {
        style: styles.image2
      }, /*#__PURE__*/React.createElement(Avatar, {
        source: data[1] && data[1]?.avatar?.large || "",
        size: AvatarSizes.Medium
      })));
    }
    return /*#__PURE__*/React.createElement(View, {
      style: styles.image
    }, /*#__PURE__*/React.createElement(Avatar, {
      source: data[0] && data[0].avatar?.large || "",
      size: AvatarSizes.Large
    }));
  }, [data]);
  if (!data?.length) {
    return null;
  }
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: () => navigation.navigate(NavigationRoutes.Group_RequestedUsersScreen, {
      payload: payload
    }),
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.contentContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.avatarImages
  }, renderUserImage), /*#__PURE__*/React.createElement(View, {
    style: styles.textContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, "\u041D\u044D\u0433\u0434\u044D\u0445 \u0445\u04AF\u0441\u044D\u043B\u0442"), /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 1,
    style: styles.descriptionContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.boldDescription,
    numberOfLines: 1
  }, username(data[0])), data.length > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    style: styles.description
  }, " \u0431\u043E\u043B\u043E\u043D "), /*#__PURE__*/React.createElement(Text, {
    style: styles.boldDescription
  }, data.length - 1), /*#__PURE__*/React.createElement(Text, {
    style: styles.description
  }, " \u0445\u04AF\u043D \u0431\u0430\u0439\u043D\u0430"))))), /*#__PURE__*/React.createElement(View, {
    style: styles.rightIcon
  }, /*#__PURE__*/React.createElement(ArrowRightIcon, {
    color: Colors.gray103,
    size: 30
  })));
});
RequestListCard.displayName = "RequestListCard";
export { RequestListCard };
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.gray101,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  w4: {
    width: 4
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  textContainer: {
    marginLeft: 12,
    flex: 1
  },
  avatarImages: {
    position: "relative",
    height: 62,
    width: 62
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image1: {},
  image2: {
    position: "absolute",
    left: 15,
    top: 15,
    borderWidth: 1.5,
    borderColor: Colors.white,
    borderRadius: AvatarSizes.Medium / 2.5
  },
  title: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    lineHeight: 18,
    color: Colors.primary
  },
  descriptionContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  boldDescription: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: Colors.gray103,
    lineHeight: 17
  },
  description: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: Colors.gray103,
    lineHeight: 17
  },
  rightIcon: {}
});
//# sourceMappingURL=request-list.js.map