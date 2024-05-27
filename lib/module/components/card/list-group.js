import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Colors, Image, ImageSizes } from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";
import useSwr from "swr";
import { GroupVector } from "../../assets/image/group-vector";
const ListGroupCard = /*#__PURE__*/memo(props => {
  const {
    payload
  } = props;
  const navigation = useNavigation();
  const {
    data
  } = useSwr(`swr.group.${payload._id}`, {
    fallbackData: payload
  });
  if (!data) {
    return null;
  }
  const imageRender = useCallback(() => {
    if (!data.coverImage) {
      return /*#__PURE__*/React.createElement(GroupVector, {
        width: 45,
        height: 60
      });
    }
    return /*#__PURE__*/React.createElement(Image, {
      size: ImageSizes.Large,
      source: data.coverImage
    });
  }, [data]);
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: () => navigation.navigate(NavigationRoutes.Group_GroupDetailScreen, {
      payload: data
    }),
    style: styles.root
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.cover
  }, imageRender()), /*#__PURE__*/React.createElement(View, {
    style: styles.w10
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.secondCol
  }, /*#__PURE__*/React.createElement(Text, {
    numberOfLines: 2,
    style: styles.name
  }, data.name), /*#__PURE__*/React.createElement(View, {
    style: styles.h4
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.memberCount
  }, data.membersCount, " \u0445\u044D\u0440\u044D\u0433\u043B\u044D\u0433\u0447")));
});
ListGroupCard.displayName = "ListGroupCard";
export { ListGroupCard };
const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center"
  },
  w10: {
    width: 10
  },
  h4: {
    height: 4
  },
  secondCol: {
    flex: 1
  },
  name: {
    fontFamily: "Inter",
    fontWeight: "500",
    color: Colors.primary,
    fontSize: 14
  },
  memberCount: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray103
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: Colors.gray102
  }
});
//# sourceMappingURL=list-group.js.map