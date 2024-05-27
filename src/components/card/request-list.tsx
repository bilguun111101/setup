import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useMemo } from "react";
import {
  ArrowRightIcon,
  Avatar,
  AvatarSizes,
  Colors,
} from "@goodtechsoft/xs-core-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationRoutes } from "../../navigation";
import type { IUser } from "@goodtechsoft/xs-user-native";
import type { IGroup } from "../../interfaces";
import { username } from "../../utils/username";

type Props = {
  data: IUser[];
  payload: IGroup;
};

const RequestListCard = memo((props: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { data, payload } = props;

  const renderUserImage = useMemo(() => {
    if (data.length > 1) {
      return (
        <View style={styles.avatarImages}>
          <View style={styles.image1}>
            <Avatar
              source={(data[0] && data[0]?.avatar?.large) || ""}
              size={AvatarSizes.Medium}
            />
          </View>
          <View style={styles.image2}>
            <Avatar
              source={(data[1] && data[1]?.avatar?.large) || ""}
              size={AvatarSizes.Medium}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.image}>
        <Avatar
          source={(data[0] && data[0].avatar?.large) || ""}
          size={AvatarSizes.Large}
        />
      </View>
    );
  }, [data]);

  if (!data?.length) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(NavigationRoutes.Group_RequestedUsersScreen, {
          payload: payload,
        })
      }
      style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.avatarImages}>{renderUserImage}</View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Нэгдэх хүсэлт</Text>
          <Text numberOfLines={1} style={styles.descriptionContainer}>
            <Text style={styles.boldDescription} numberOfLines={1}>
              {username(data[0]!)}
            </Text>
            {data.length > 1 && (
              <>
                <Text style={styles.description}> болон </Text>
                <Text style={styles.boldDescription}>{data.length - 1}</Text>
                <Text style={styles.description}> хүн байна</Text>
              </>
            )}
          </Text>
        </View>
      </View>
      <View style={styles.rightIcon}>
        <ArrowRightIcon color={Colors.gray103} size={30} />
      </View>
    </TouchableOpacity>
  );
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
    justifyContent: "space-between",
  },
  w4: {
    width: 4,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  avatarImages: {
    position: "relative",
    height: 62,
    width: 62,
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image1: {},
  image2: {
    position: "absolute",
    left: 15,
    top: 15,
    borderWidth: 1.5,
    borderColor: Colors.white,
    borderRadius: AvatarSizes.Medium / 2.5,
  },
  title: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    lineHeight: 18,
    color: Colors.primary,
  },
  descriptionContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  boldDescription: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: Colors.gray103,
    lineHeight: 17,
  },
  description: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: Colors.gray103,
    lineHeight: 17,
  },
  rightIcon: {},
});
