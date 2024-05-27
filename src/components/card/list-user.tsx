import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import {
  Avatar,
  AvatarSizes,
  Button,
  Colors,
  EllipsisHIcon,
  IconSizes,
} from "@goodtechsoft/xs-core-native";
import { type IUser, UserNavigationRoutes } from "@goodtechsoft/xs-user-native";
import { useNavigation } from "@react-navigation/native";
import {} from "@goodtechsoft/xs-user-native";
import { username } from "../../utils/username";
import useSwr from "swr";
import { PageNavigationRoutes } from "@goodtechsoft/xs-page-native";

type Props = {
  user: IUser;
  more?: boolean;
  invite?: boolean;
  isJoin?: boolean;
  isShowAdminReq?: boolean;
  onPress: (user: IUser, type: string) => void;
};

const ListUserCard = memo((props: Props) => {
  const { user, more, isJoin, onPress, invite, isShowAdminReq } = props;

  if (!user) {
    return null;
  }

  const { data: userMe } = useSwr<IUser>("swr.user.me");
  const navigation = useNavigation();

  const { data } = useSwr<IUser>(`swr.user.${user._id}`, {
    fallbackData: user,
  });

  if (!data) {
    return null;
  }

  const renderButton = useCallback(() => {
    if (data.isInvited) {
      return (
        <Button
          onPress={() => {
            onPress(data, "invited");
          }}
          title={"Урисан"}
        />
      );
    }
    if (more) {
      return (
        <Button
          onPress={() => {
            onPress(data, "more");
          }}
          icon={<EllipsisHIcon />}
          type="text"
        />
      );
    }
    if (invite && !data.isInvited) {
      return (
        <Button
          type="primary"
          onPress={() => {
            onPress(data, "invite");
          }}
          title={"Урих"}
        />
      );
    }
    if (isJoin) {
      return (
        <Button
          onPress={() => {
            onPress(data, "isJoin");
          }}
          title={"Зөвшөөрөх"}
        />
      );
    }
    if (data.accountType !== "NORMAL") {
      if (data._id === userMe?._id) {
        return <View />;
      } else {
        if (data.isLiked) {
          return (
            <Button
              onPress={() => {
                onPress(data, "unLike");
              }}
              title={"Таалагдсан"}
            />
          );
        } else {
          return (
            <Button
              type="primary"
              onPress={() => {
                onPress(data, "isLike");
              }}
              title={"Таалагдлаа"}
            />
          );
        }
      }
    }
    if (data.isFollowing) {
      return (
        <Button
          onPress={() => {
            onPress(data, "isFollowing");
          }}
          title={"Дагасан"}
        />
      );
    }
    if (data.isUserRequested) {
      return (
        <Button
          onPress={() => {
            onPress(data, "userRequested");
          }}
          title={"Хүсэлт илгээсэн"}
        />
      );
    }
    if (data._id === userMe?._id) {
      return (
        <Button
          onPress={() => {
            onPress(data, "me");
          }}
          icon={<EllipsisHIcon size={IconSizes.Large} color={Colors.primary} />}
        />
      );
    }
    if (!data.isFollowing) {
      return (
        <Button
          type="primary"
          onPress={() => {
            onPress(data, "follow");
          }}
          title={"Дагах"}
        />
      );
    }
    return <View />;
  }, [data]);

  const goProfile = useCallback(() => {
    if (data.accountType === "NORMAL") {
      navigation.navigate(UserNavigationRoutes.User_ProfileScreen, {
        userId: data._id,
      });
    } else
      navigation.navigate(PageNavigationRoutes.Page_ProfileScreen, {
        userId: data._id,
      });
  }, [data, navigation]);

  const renderAdmin = useCallback(() => {
    if (data.isAdmin) {
      return (
        <View style={styles.adminContainer}>
          <Text style={styles.adminText}>Админ</Text>
        </View>
      );
    }
    return <View />;
  }, [data]);

  const renderAvatarInvite = useCallback(() => {
    if (data.isAdminInvited && isShowAdminReq) {
      return (
        <View style={styles.requestAdmin}>
          <Text style={styles.requestText}>Админ хүсэлт илгээсэн</Text>
        </View>
      );
    }
    return <View />;
  }, [data]);

  console.log(`[${username(data)}]`, data.isLiked, data.isFollowing);

  return (
    <Pressable onPress={goProfile} style={styles.card}>
      <Avatar
        size={AvatarSizes.Large}
        source={data.avatar?.large}
        isPage={data.accountType === "NORMAL" ? false : true}
      />
      <View style={styles.username}>
        <Text style={styles.nameText}>{username(data)}</Text>
        {renderAdmin()}
        {renderAvatarInvite()}
      </View>
      {renderButton()}
    </Pressable>
  );
});

ListUserCard.displayName = "ListUserCard";

export { ListUserCard };

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 18,
  },
  nameText: {
    fontFamily: "Inter",
    color: Colors.primary,
    fontWeight: "500",
  },
  button: {},
  username: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  adminContainer: {
    paddingVertical: 1,
    paddingHorizontal: 3,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  requestAdmin: {
    paddingVertical: 1.5,
    backgroundColor: Colors.gray101,
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  adminText: {
    fontSize: 11,
    color: Colors.white,
    fontFamily: "Inter",
    fontWeight: "500",
  },
  requestText: {
    fontSize: 11,
    color: Colors.primary,
    fontFamily: "Inter",
    fontWeight: "500",
  },
});
