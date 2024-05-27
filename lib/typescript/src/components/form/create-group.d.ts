import React, { type RefObject } from "react";
import { type IFormRef } from "@goodtechsoft/xs-core-native";
export type ICreateStep1FormData = {
    name: string;
    privacy: {
        name: string;
        value: string;
    };
};
type Props = {
    onSubmit: (data: ICreateStep1FormData) => void;
    formRef: RefObject<IFormRef<any>>;
};
declare const CreateGroupForm: React.MemoExoticComponent<({ onSubmit, formRef }: Props) => React.JSX.Element>;
export { CreateGroupForm };
//# sourceMappingURL=create-group.d.ts.map