import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import {
  ArrowBottomIcon,
  Button,
  Colors,
  CommentIcon,
  GlobeIcon,
  IconSizes,
  LockIcon,
  UserPlusAltIcon,
} from "@goodtechsoft/xs-core-native";
import { MutualFriendsItem } from "../mutual-friends";
import { DescriptionItem } from "../description";
import { useNavigation } from "@react-navigation/native";
import type { IGroup } from "../../interfaces";
import { GroupApi } from "../../apis";
import { NavigationRoutes } from "../../navigation";
import type { IUser } from "@goodtechsoft/xs-user-native";
import useSwr, { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import { CoverImage } from "./cover";
import { ChatNavigationRoutes } from "@goodtechsoft/xs-chat-native";
import type { INotification } from "@goodtechsoft/xs-notification-native";

type Props = {
  joinButton?: boolean;
  data: IGroup;
  notifData?: INotification;
};

const GroupHeaderItem = memo((props: Props) => {
  const { joinButton = false, data, notifData } = props;
  const { mutate } = useSWRConfig();
  const navigation = useNavigation<any>();
  const { data: user } = useSwr<IUser>("swr.user.me");
  const { mutate: thisGroupMutate } = useSwr(`swr.group.${data._id}`);
  const { mutate: myMutate } = useSWRInfinite(index => `swr.group.my.${index}`);

  if (!data) {
    return null;
  }

  const onInfo = useCallback(() => {
    console.log("INFO");
  }, []);

  const onRule = useCallback(() => {}, [navigation]);

  const onPress = useCallback(() => {
    navigation.navigate(NavigationRoutes.Group_UserMoreSheet, {
      user: user!,
      payload: data,
    });
  }, []);

  const join = useCallback(async () => {
    try {
      if (notifData) {
        notifData.setIsDone(mutate);
      }
      await GroupApi.join(data._id);
      if (data.privacy === "PRIVATE") {
        if (data.isInvited) {
          data.setSignCount(mutate);
          data.setJoin(mutate, true);
          myMutate();
          thisGroupMutate();
        } else {
          data.setPending(mutate, true);
        }
      } else {
        data.setSignCount(mutate);
        data.setJoin(mutate, true);
        myMutate();
        thisGroupMutate();
      }
    } catch (error) {
      console.log(error);
    }
  }, [data, mutate, myMutate, thisGroupMutate]);

  const cancel = useCallback(async () => {
    try {
      await GroupApi.cancelRequest(data._id);
      data.setPending(mutate, false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const inviteUsers = useCallback(() => {
    navigation.navigate(NavigationRoutes.Group_InviteUsersScreen, {
      payload: data,
    });
  }, []);

  const goChat = useCallback(() => {
    navigation.navigate(ChatNavigationRoutes.Chat_CommunityListScreen, {
      payload: data,
    });
  }, []);

  const renderButton = useCallback(() => {
    if (data.isAdmin) {
      return (
        <View style={styles.row}>
          <Button
            onPress={inviteUsers}
            type={"primary"}
            icon={
              <UserPlusAltIcon color={Colors.white} size={IconSizes.Large} />
            }
          />
          <View style={styles.w4} />
          <Button
            style={styles.actionButton}
            onPress={onPress}
            title="Нэгдсэн"
            type={"default"}
            icon={
              <ArrowBottomIcon color={Colors.primary} size={IconSizes.Medium} />
            }
          />
          <View style={styles.w4} />
          <Button
            onPress={goChat}
            type={"primary"}
            icon={<CommentIcon color={Colors.white} size={IconSizes.Large} />}
          />
        </View>
      );
    }
    if (data.isJoined) {
      return (
        <View style={styles.row}>
          <Button
            onPress={inviteUsers}
            type={"primary"}
            icon={
              <UserPlusAltIcon color={Colors.white} size={IconSizes.Large} />
            }
          />
          <Button
            style={styles.actionButton}
            onPress={onPress}
            title="Нэгдсэн"
            type={"default"}
            icon={
              <ArrowBottomIcon color={Colors.primary} size={IconSizes.Medium} />
            }
          />
          <View style={styles.w4} />
          <Button
            onPress={goChat}
            type={"primary"}
            icon={<CommentIcon color={Colors.white} size={IconSizes.Large} />}
          />
        </View>
      );
    }
    if (data.isPending) {
      return <Button onPress={cancel} title="Хүсэлт цуцлах" type={"default"} />;
    }
    if (data.isInvited) {
      return <Button onPress={join} title="Нэгдэх" type={"primary"} />;
    }
    return <Button onPress={join} title="Нэгдэх" type={"primary"} />;
  }, [data]);

  const renderPrivacy = useCallback(() => {
    if (data.privacy === "PUBLIC") {
      return (
        <>
          <View style={styles.groupPrivacy}>
            <GlobeIcon color={Colors.gray103} size={IconSizes.Small} />
            <View style={styles.w4} />
            <Text style={styles.privacyText}>Нээлттэй бүлэг</Text>
          </View>
        </>
      );
    }
    return (
      <>
        <View style={styles.groupPrivacy}>
          <LockIcon color={Colors.gray103} size={IconSizes.Small} />
          <View style={styles.w4} />
          <Text style={styles.privacyText}>Нууцлалтай бүлэг</Text>
        </View>
      </>
    );
  }, [data]);

  return (
    <View style={styles.root}>
      <View pointerEvents="none" style={styles.cover}>
        <CoverImage image={data.coverImage} width={230} height={170} />
      </View>
      <View style={styles.headerCard} pointerEvents="none">
        <View style={styles.h15} />
        <Text style={styles.groupName}>{data.name}</Text>
        <View style={styles.h4} />
        {renderPrivacy()}
        <View style={styles.h4} />
        <Text style={styles.privacyText}>{data.membersCount} хэрэглэгч</Text>
        <View style={styles.h15} />
      </View>
      <View pointerEvents="box-none" style={styles.ph18}>
        {joinButton && (
          <>
            {renderButton()}
            <View style={styles.h15} />
          </>
        )}
        {!data.isJoined && (
          <>
            <DescriptionItem
              title={"Тухай"}
              onPress={onInfo}
              description={data.description}
            />
            <View style={styles.h15} />
            {data.rule && (
              <>
                <DescriptionItem
                  title={"Дүрэм"}
                  onPress={onRule}
                  description={data.rule}
                />
                <View style={styles.h15} />
              </>
            )}
            {data.followers && <MutualFriendsItem data={data.followers} />}
            <View style={styles.h20} />
          </>
        )}
      </View>
    </View>
  );
});

GroupHeaderItem.displayName = "GroupHeaderItem";

export { GroupHeaderItem };

const styles = StyleSheet.create({
  root: {
    pointerEvents: "box-none",
  },
  header: {
    zIndex: 10,
  },
  row: {
    flexDirection: "row",
  },
  ph18: {
    paddingHorizontal: 18,
  },
  h15: {
    height: 15,
  },
  h20: {
    height: 20,
  },
  h4: {
    height: 4,
  },
  w4: {
    width: 4,
  },
  actionButton: {
    flex: 1,
  },
  headerCard: {
    paddingHorizontal: 18,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: Colors.primary,
  },
  cover: {
    height: 210,
    width: "100%",
    backgroundColor: Colors.gray102,
  },
  groupName: {
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 24,
    color: Colors.primary,
  },
  groupPrivacy: {
    flexDirection: "row",
  },
  privacyText: {
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "400",
    color: Colors.gray103,
  },
});
