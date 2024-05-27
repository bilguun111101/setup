import { StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { Button, Colors } from "@goodtechsoft/xs-core-native";
import { Notification } from "@goodtechsoft/xs-notification-native";
import { GroupApi } from "../../apis";
import useSWR, { useSWRConfig } from "swr";
import { useToast } from "react-native-toast-notifications";
import useSWRInfinite from "swr/infinite";
const AdminInvitedCard = /*#__PURE__*/memo(props => {
  const {
    data,
    notifData
  } = props;
  const {
    mutate
  } = useSWRConfig();
  const toast = useToast();
  const {
    mutate: groupMutate
  } = useSWR(`swr.group.${data._id}`);
  const {
    mutate: myGroupMutate
  } = useSWRInfinite(index => `swr.group.admin.${index}`);
  const approveAdmin = useCallback(async () => {
    if (notifData) {
      const _notifData = Notification.fromJson(notifData);
      _notifData.setIsDone(mutate);
    }
    await GroupApi.approveAdmin(data._id);
    data.setGroupAdmin(mutate);
    toast.show("Амжилттай админ боллоо", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    setTimeout(() => {
      groupMutate();
      myGroupMutate();
    }, 300);
  }, []);
  const declineAdmin = useCallback(async () => {
    if (notifData) {
      const _notifData = Notification.fromJson(notifData);
      _notifData.setIsDone(mutate);
    }
    await GroupApi.declineAdmin(data._id);
    toast.show("Амдин болох санал цуцлагдлаа", {
      placement: "bottom",
      duration: 2000,
      animationType: "slide-in"
    });
    data.setDeclineAdmin(mutate);
    setTimeout(() => {
      groupMutate();
    }, 300);
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.adminInvited
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.textContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.adminInviteTitle
  }, "\u0410\u0434\u043C\u0438\u043D \u0443\u0440\u0438\u043B\u0433\u0430"), /*#__PURE__*/React.createElement(Text, {
    style: styles.description
  }, "\u0422\u0430\u043D\u0438\u0439\u0433 \u044D\u043D\u044D \u0431\u04AF\u043B\u044D\u0433\u0442 \u0430\u0434\u043C\u0438\u043D \u0431\u043E\u043B\u043E\u0445 \u0445\u04AF\u0441\u044D\u043B\u0442 \u0438\u0440\u0441\u044D\u043D \u0431\u0430\u0439\u043D\u0430.")), /*#__PURE__*/React.createElement(View, {
    style: styles.row
  }, /*#__PURE__*/React.createElement(Button, {
    title: "\u0417\u04E9\u0432\u0448\u04E9\u04E9\u0440\u04E9\u0445",
    type: "primary",
    onPress: approveAdmin
  }), /*#__PURE__*/React.createElement(Button, {
    title: "\u0426\u0443\u0446\u043B\u0430\u0445",
    onPress: declineAdmin
  })));
});
AdminInvitedCard.displayName = "AdminInvitedCard";
export { AdminInvitedCard };
const styles = StyleSheet.create({
  adminInvited: {
    backgroundColor: Colors.white,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    padding: 18
  },
  firstCol: {
    flex: 1,
    alignItems: "flex-start",
    gap: 4
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10
  },
  adminInviteTitle: {
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    color: Colors.primary
  },
  textContainer: {
    flex: 1,
    gap: 4
  },
  description: {
    fontSize: 14,
    fontFamily: "Inter",
    color: Colors.gray104
  },
  avatar: {
    borderWidth: 1,
    padding: 4,
    backgroundColor: Colors.gray102,
    borderRadius: 8
  }
});
//# sourceMappingURL=admin-invited.js.map