import React, { type RefObject } from "react";
import { type IFormRef } from "@goodtechsoft/xs-core-native";
import type { ICategory } from "../../interfaces";
export type ICreateStep2FormData = {
    coverImage: string;
    category: ICategory;
    description: string;
};
type Props = {
    onSubmit: (data: ICreateStep2FormData) => void;
    formRef: RefObject<IFormRef<any>>;
};
declare const CreateGroupStep2Form: React.MemoExoticComponent<({ onSubmit, formRef }: Props) => React.JSX.Element>;
export { CreateGroupStep2Form };
//# sourceMappingURL=create-2-group.d.ts.map