import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Button, Colors } from "@goodtechsoft/xs-core-native";
import { type INotification, Notification } from "@goodtechsoft/xs-notification-native";
import { GroupApi } from "../../apis";
import useSWR, { useSWRConfig } from "swr";
import type { IGroup } from "../../interfaces";
import { useToast } from "react-native-toast-notifications";
import useSWRInfinite from "swr/infinite";

type Props = {
  data: IGroup;
  notifData?: INotification; 
}

const AdminInvitedCard = memo((props: Props) => {
  const { data, notifData} = props;
  const { mutate } = useSWRConfig();
  const toast = useToast();
  const { mutate: groupMutate } = useSWR(`swr.group.${data._id}`);
  const { mutate: myGroupMutate } = useSWRInfinite(
    index => `swr.group.admin.${index}`,
  );

  const approveAdmin = useCallback(async () => {
    if(notifData) {
      const _notifData = Notification.fromJson(notifData!);
      _notifData.setIsDone(mutate);
    }
    await GroupApi.approveAdmin(data._id);
    data.setGroupAdmin(mutate);
    toast.show("Амжилттай админ боллоо", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
    setTimeout(() => {
      groupMutate();
      myGroupMutate();
    }, 300);
  }, [])

  const declineAdmin = useCallback(async () => {
    if(notifData) {
      const _notifData = Notification.fromJson(notifData!);
      _notifData.setIsDone(mutate);
    }
    await GroupApi.declineAdmin(data._id);
    toast.show("Амдин болох санал цуцлагдлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in",
    });
    data.setDeclineAdmin(mutate);
    setTimeout(() => {
      groupMutate();
    }, 300);
  }, [])


  return (
    <View style={styles.adminInvited}>
      <View style={styles.textContainer}>
        <Text style={styles.adminInviteTitle}>Админ урилга</Text>
        <Text style={styles.description}>Танийг энэ бүлэгт админ болох хүсэлт ирсэн байна.</Text>
      </View>
      <View style={styles.row}>
        <Button title="Зөвшөөрөх" type="primary" onPress={approveAdmin} />
        <Button title="Цуцлах" onPress={declineAdmin} />
      </View>
    </View>
  );
});

AdminInvitedCard.displayName = "AdminInvitedCard";

export { AdminInvitedCard };

const styles = StyleSheet.create({
  adminInvited: {
    backgroundColor: Colors.white,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    padding: 18,
  },
  firstCol: {
    flex: 1,
    alignItems: "flex-start",
    gap: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  adminInviteTitle: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    color: Colors.primary,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: "Inter",
    color: Colors.gray104,
  },
  avatar: {
    borderWidth: 1,
    padding: 4,
    backgroundColor: Colors.gray102,
    borderRadius: 8,
  },
});
