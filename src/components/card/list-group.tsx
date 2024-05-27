import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Colors, Image, ImageSizes } from "@goodtechsoft/xs-core-native";
import { type IGroup } from "../../interfaces";
import { useNavigation } from "@react-navigation/native";
import { NavigationRoutes } from "../../navigation";
import useSwr from "swr";
import { GroupVector } from "../../assets/image/group-vector";

type Props = {
  payload: IGroup;
};

const ListGroupCard = memo((props: Props) => {
  const { payload } = props;
  const navigation = useNavigation();

  const { data } = useSwr<IGroup>(`swr.group.${payload._id}`, {
    fallbackData: payload,
  });

  if (!data) {
    return null;
  }

  const imageRender = useCallback(() => {
    if (!data.coverImage) {
      return <GroupVector width={45} height={60} />;
    }
    return <Image size={ImageSizes.Large} source={data.coverImage} />;
  }, [data]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(NavigationRoutes.Group_GroupDetailScreen, {
          payload: data,
        })
      }
      style={styles.root}>
      <View style={styles.cover}>{imageRender()}</View>
      <View style={styles.w10} />
      <View style={styles.secondCol}>
        <Text numberOfLines={2} style={styles.name}>
          {data.name}
        </Text>
        <View style={styles.h4} />
        <Text style={styles.memberCount}>{data.membersCount} хэрэглэгч</Text>
      </View>
    </Pressable>
  );
});

ListGroupCard.displayName = "ListGroupCard";

export { ListGroupCard };

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
  },
  w10: {
    width: 10,
  },
  h4: {
    height: 4,
  },
  secondCol: {
    flex: 1,
  },
  name: {
    fontFamily: "Inter",
    fontWeight: "500",
    color: Colors.primary,
    fontSize: 14,
  },
  memberCount: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray103,
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: Colors.gray102,
  },
});
