import React from "react";
export type ChangeNameFormProps = {
    name: string;
};
type Props = {
    action: [string, {
        name: string;
    }];
    onSubmit: (e: ChangeNameFormProps) => void;
};
declare const ChangeNameForm: React.MemoExoticComponent<({ action, onSubmit }: Props) => React.JSX.Element>;
export { ChangeNameForm };
//# sourceMappingURL=change-name.d.ts.map