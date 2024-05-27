import React, { memo, useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "@goodtechsoft/xs-core-native";
import { Tabs } from "react-native-collapsible-tab-view";
import { DescriptionForm } from "../form/description-form";
import { useSWRConfig } from "swr/_internal";
import { GroupApi } from "../../apis";
import { ResultForm } from "../layout/form-result";
import { RuleForm } from "../form/rule-form";
import { useToast } from "react-native-toast-notifications";
import { timeFormat } from "../../utils/timeformat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const InfoTabScreen = /*#__PURE__*/memo(props => {
  const {
    data
  } = props;
  const {
    mutate
  } = useSWRConfig();
  const descriptionRef = useRef(null);
  const toast = useToast();
  const sfArea = useSafeAreaInsets();
  const descriptionData = useMemo(() => {
    if (data?.description) {
      return {
        description: data?.description,
        type: "confirm"
      };
    }
    return {
      description: undefined,
      type: ""
    };
  }, [data?.description]);
  const onDescriptionSubmit = useCallback(async values => {
    const groupForm = {
      description: values.description
    };
    try {
      const formData = await GroupApi.descriptionChange({
        id: data._id,
        data: groupForm || ""
      });
      data.setDescription(mutate, formData);
      toast.show("Амжилттай солигдлоо", {
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in"
      });
    } catch (err) {
      descriptionRef.current?.setErrors({
        email: err.message || ""
      });
    }
  }, [mutate, data]);
  const ruleRef = useRef(null);
  const ruleData = useMemo(() => {
    if (data?.rule) {
      return {
        rule: data?.rule,
        type: "confirm"
      };
    }
    return {
      rule: undefined,
      type: ""
    };
  }, [data?.rule]);
  const onRuleSubmit = useCallback(async values => {
    const groupForm = {
      rule: values.rule
    };
    try {
      const formData = await GroupApi.ruleChange({
        id: data._id,
        data: groupForm || ""
      });
      data.setRule(mutate, formData);
      toast.show("Амжилттай солигдлоо", {
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in"
      });
    } catch (err) {
      descriptionRef.current?.setErrors({
        email: err.message || ""
      });
    }
  }, [mutate, data]);
  const descriptionRender = useCallback(() => {
    if (data.isAdmin) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DescriptionForm, {
        ref: descriptionRef,
        payload: descriptionData,
        onSubmit: onDescriptionSubmit
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.h10
      }));
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ResultForm, {
      title: "Тайлбар",
      description: data.description
    }), /*#__PURE__*/React.createElement(View, {
      style: styles.h10
    }));
  }, []);
  const ruleRender = useCallback(() => {
    if (data.isAdmin) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RuleForm, {
        ref: ruleRef,
        payload: ruleData,
        onSubmit: onRuleSubmit
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.h10
      }));
    }
    if (data.rule) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ResultForm, {
        title: "Дүрэм",
        description: data.rule
      }), /*#__PURE__*/React.createElement(View, {
        style: styles.h10
      }));
    }
    return /*#__PURE__*/React.createElement(View, null);
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, data.isJoined || data.privacy === "PUBLIC" ? /*#__PURE__*/React.createElement(Tabs.ScrollView, {
    showsVerticalScrollIndicator: false,
    style: styles.root
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.h10
  }), descriptionRender(), ruleRender(), /*#__PURE__*/React.createElement(ResultForm, {
    title: "\u041D\u044D\u044D\u0433\u0434\u0441\u044D\u043D \u043E\u0433\u043D\u043E\u043E",
    description: `${timeFormat(data.createdAt)}`
  }), /*#__PURE__*/React.createElement(View, {
    style: {
      height: sfArea.bottom
    }
  })) : /*#__PURE__*/React.createElement(View, {
    style: styles.root
  }));
});
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray101
  },
  h10: {
    height: 10
  },
  h15: {
    height: 15
  },
  h4: {
    height: 4
  },
  w4: {
    width: 4
  },
  ph18: {
    paddingHorizontal: 18
  }
});
InfoTabScreen.displayName = "InfoTabScreen";
export { InfoTabScreen };
//# sourceMappingURL=info.js.map