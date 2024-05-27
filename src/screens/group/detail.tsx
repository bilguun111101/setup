import React, { memo, useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  type BottomSheetParamList,
  NavigationRoutes,
  type RootStackParamList,
} from "../../navigation/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useSwr from "swr";
import { GroupHeaderItem } from "../../components/layout/group-header";
import { MaterialTabBar, Tabs } from "react-native-collapsible-tab-view";
import { LabelRenderer } from "../../components/layout/tab-bar-label-render";
import { UsersTabScreen } from "../../components/tab-list/users";
import { InfoTabScreen } from "../../components/tab-list/info";
import { GroupApi } from "../../apis";
import type { IGroup } from "../../interfaces";
import { PostTabScreen } from "../../components/tab-list/post";
import { InviteMemberSheet } from "../../components/bottomsheet/invite-members";
import { AdminInvitedCard } from "../../components/card/admin-invited";

type Props = NativeStackScreenProps<
  RootStackParamList,
  NavigationRoutes.Group_GroupDetailScreen
>;

const SCREEN_WIDTH = Dimensions.get("window").width;

const GroupDetailScreen = memo(({ route }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [focusChanged, setFocusChanged] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const { payload, notifData } = route.params;

  const blurListener = useCallback(() => {
    setFocusChanged(false);
  }, []);

  useFocusEffect(() => {
    if (tabIndex === 0) {
      setFocusChanged(true);
    } else {
      setFocusChanged(false);
    }

    navigation.addListener("blur", blurListener);
    return () => {
      navigation.removeListener("blur", blurListener);
    };
  });
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BottomSheetParamList & RootStackParamList & any>
    >();

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 1000);
  }, []);

  const { data, isLoading } = useSwr<IGroup>(
    `swr.group.${payload._id}`,
    async () => {
      const res = await GroupApi.get(payload._id);
      return res;
    },
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <View style={styles.root}>
        <View style={styles.header}>
          {data?.isAdminInvited && (
            <AdminInvitedCard data={data} notifData={notifData} />
          )}
        </View>
        <Tabs.Container
          initialTabName={"POST"}
          onIndexChange={index => setTabIndex(index)}
          allowHeaderOverscroll
          renderHeader={() => (
            <GroupHeaderItem
              data={data!}
              joinButton={true}
              notifData={notifData}
            />
          )}
          headerContainerStyle={{
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
            shadowOpacity: 0,
            shadowRadius: 0,
          }}
          lazy={false}
          renderTabBar={props => (
            <View style={{ marginHorizontal: 18 }}>
              <MaterialTabBar
                {...props}
                indicatorStyle={{ backgroundColor: Colors.primary }}
                width={SCREEN_WIDTH - 30}
              />
            </View>
          )}>
          <Tabs.Tab
            name={"POST"}
            label={props => <LabelRenderer tabProps={props} />}>
            <PostTabScreen payload={data!} focusChanged={focusChanged} />
            <View />
          </Tabs.Tab>
          <Tabs.Tab
            name={"USERS"}
            label={props => <LabelRenderer tabProps={props} />}>
            <UsersTabScreen payload={data!} />
          </Tabs.Tab>
          <Tabs.Tab
            name={"INFO"}
            label={props => <LabelRenderer tabProps={props} />}>
            <InfoTabScreen data={data!} />
          </Tabs.Tab>
        </Tabs.Container>
      </View>
      {payload?.isNew && isActive && <InviteMemberSheet payload={data!} />}
    </>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10,
  },
  appBar: {
    gap: 20,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: Colors.primary,
    textAlign: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: Colors.sub200,
    width: 16,
    height: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 10,
    fontFamily: "Inter",
    fontWeight: "600",
    color: Colors.white,
  },
});

GroupDetailScreen.displayName = "GroupDetailScreen";

export { GroupDetailScreen };
