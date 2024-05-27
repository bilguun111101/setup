import React, { memo, useCallback } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  AppBar,
  ArrowLeftIcon,
  Button,
  Colors,
  IconSizes,
} from "@goodtechsoft/xs-core-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  type BottomSheetParamList,
  NavigationRoutes,
} from "../navigation/types";
import { useNavigation } from "@react-navigation/native";
import { GroupHeaderItem } from "../components/layout/group-header";
import { GroupApi } from "../apis";
import useSwr, { useSWRConfig } from "swr";
import type { IGroup } from "../interfaces";
import useSWRInfinite from "swr/infinite";

type Props = NativeStackScreenProps<
  BottomSheetParamList,
  NavigationRoutes.Group_JoinSheet
>;

const JoinSheet = memo(({ route }: Props) => {
  const { payload } = route.params;
  const navigation = useNavigation();
  const { mutate } = useSWRConfig();

  const { data, mutate: adMutate } = useSwr<IGroup>(
    `swr.group.${payload._id}`,
    {
      fallbackData: payload,
    },
  );
  const { mutate: listMutate } = useSWRInfinite(
    index => `swr.group.my.${index}`,
  );

  const cancel = useCallback(async () => {
    await GroupApi.cancelRequest(data?._id!);
    data?.setPending(mutate, false);
  }, []);

  const join = useCallback(async () => {
    await GroupApi.join(data?._id!);
    if (data?.privacy === "PUBLIC" || data?.isInvited) {
      data?.setJoin(mutate, true);
      navigation.goBack();
      setTimeout(() => {
        listMutate();
        adMutate();
        navigation.navigate(NavigationRoutes.Group_GroupDetailScreen, {
          payload: data,
        });
      }, 200);
    } else {
      data?.setPending(mutate, true);
      navigation.goBack();
    }
  }, []);

  const declineInvite = useCallback(async () => {
    await GroupApi.inviteDecline(payload._id);
    data?.setInvited(mutate, false);
    navigation.goBack();
  }, []);

  const renderButton = useCallback(() => {
    if (data?.isInvited) {
      return (
        <View style={styles.row}>
          <Button
            style={styles.button}
            title={"Зөвшөөрөх"}
            type={"primary"}
            onPress={join}
          />
          <Button
            style={styles.button}
            title={"Хүсэлт цуцлах"}
            type={"default"}
            onPress={declineInvite}
          />
        </View>
      );
    }
    if (data?.isPending) {
      return (
        <Button title={"Хүсэлт цуцлах"} type={"default"} onPress={cancel} />
      );
    }
    return <Button title={"Нэгдэх"} type={"primary"} onPress={join} />;
  }, [data]);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <AppBar
          useSafeArea={false}
          left={
            <Button
              type="text"
              icon={<ArrowLeftIcon size={IconSizes.ExtraLarge} />}
              onPress={() => navigation.goBack()}
            />
          }
        />
      </View>
      <GroupHeaderItem joinButton={false} data={data!} />
      <View style={styles.absoluteBottom}>
        <View style={styles.ph18}>{renderButton()}</View>
        <SafeAreaView />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  header: {
    zIndex: 10,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    borderBottomRightRadius: 10,
  },
  h15: {
    height: 15,
  },
  h10: {
    height: 10,
  },
  h4: {
    height: 4,
  },
  w4: {
    width: 4,
  },
  ph18: {
    paddingHorizontal: 18,
  },
  headerCard: {
    paddingHorizontal: 18,
    backgroundColor: Colors.white,
    paddingBottom: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  listContent: {
    flexGrow: 1,
    backgroundColor: Colors.gray101,
  },
  card: {
    marginTop: 8,
  },
  flex: { flex: 1 },
  title: {
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    lineHeight: 22,
    color: Colors.primary,
  },
  cover: {
    height: 150,
    width: "100%",
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
  absoluteBottom: {
    backgroundColor: Colors.white,
    paddingBottom: 25,
    paddingTop: 10,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
});

JoinSheet.displayName = "JoinSheet";

export { JoinSheet };
