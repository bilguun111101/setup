import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Avatar, AvatarSizes, Colors } from "@goodtechsoft/xs-core-native";
import type { IUser } from "@goodtechsoft/xs-user-native";
import { username } from "../utils/username";

type Props = {
  data: IUser[];
};

const MutualFriendsItem = memo((props: Props) => {
  const { data: followers } = props;

  if (!followers.length) {
    return null;
  }

  const renderAvatar = useCallback(() => {
    if (followers.length > 2) {
      return (
        <>
          <View style={styles.avatars}>
            <View style={styles.firstAvatar}>
              <Avatar
                source={followers[0]?.avatar?.large}
                size={AvatarSizes.ExtraSmall}
              />
            </View>
            <View style={styles.secondAvatar}>
              <Avatar
                source={followers[1]?.avatar?.large}
                size={AvatarSizes.ExtraSmall}
              />
            </View>
            <View style={styles.secondAvatar}>
              <Avatar
                source={followers[2]?.avatar?.large}
                size={AvatarSizes.ExtraSmall}
              />
            </View>
          </View>
        </>
      );
    }
    if (followers.length === 2) {
      return (
        <>
          <View style={styles.avatars}>
            <View style={styles.firstAvatar}>
              <Avatar
                source={followers[0]?.avatar?.large}
                size={AvatarSizes.ExtraSmall}
              />
            </View>
            <View style={styles.secondAvatar}>
              <Avatar
                source={followers[1]?.avatar?.large}
                size={AvatarSizes.ExtraSmall}
              />
            </View>
          </View>
        </>
      );
    }
    return (
      <View style={styles.firstAvatar}>
        <Avatar
          source={followers[0]?.avatar?.large}
          size={AvatarSizes.ExtraSmall}
        />
      </View>
    );
  }, []);

  const renderText = useCallback(() => {
    if (followers.length > 2) {
      return (
        <Text style={styles.mutualText}>
          <Text style={styles.nameText}>{username(followers[0]!)}</Text>
          {` болон таний ${followers.length - 1} дагасан хүн нэгдсэн байна`}
        </Text>
      );
    }
    return (
      <Text style={styles.mutualText}>
        <Text style={styles.nameText}>{username(followers[0]!)}</Text>
        {` нэгдсэн байна`}
      </Text>
    );
  }, []);

  return (
    <View style={styles.root}>
      {renderAvatar()}
      <View style={styles.w4} />
      {renderText()}
    </View>
  );
});

MutualFriendsItem.displayName = "MutualFriendsItem";

export { MutualFriendsItem };

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
  },
  w4: {
    width: 4,
  },
  firstAvatar: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 13,
  },
  secondAvatar: {
    marginLeft: -8,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 13,
  },
  avatars: {
    flexDirection: "row",
  },
  nameText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary,
  },
  mutualText: {
    flex: 1,
    fontFamily: "Inter",
    fontSize: 12,
    color: Colors.gray104,
  },
});
