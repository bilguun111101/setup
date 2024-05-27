import React from "react";
export type IRuleFormData = {
    rule?: string;
    type: string;
};
type Props = {
    payload: IRuleFormData;
    onSubmit: (data: IRuleFormData) => void;
};
declare const RuleForm: React.ForwardRefExoticComponent<Props & React.RefAttributes<unknown>>;
export { RuleForm };
//# sourceMappingURL=rule-form.d.ts.map