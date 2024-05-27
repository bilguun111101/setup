import React from "react";
export type IDescriptionFormData = {
    description?: string;
    type: string;
};
type Props = {
    payload: IDescriptionFormData;
    onSubmit: (data: IDescriptionFormData) => void;
};
declare const DescriptionForm: React.ForwardRefExoticComponent<Props & React.RefAttributes<unknown>>;
export { DescriptionForm };
//# sourceMappingURL=description-form.d.ts.map