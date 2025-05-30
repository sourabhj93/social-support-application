import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context/ApplicationFormContext";
import { SelectField } from "../common/Select";
import { Field } from "../common/Input";
import { familyFormFIelds } from "../constants/formConstant";

interface FinancialFormData {
  maritalStatus: string;
  dependents: string;
  employmentStatus: string;
  monthlyIncome: string;
  housingStatus: string;
}

export default function FinancialInfoForm() {
  const { t } = useTranslation();
  const { formData, updateSection, nextStep, prevStep } = useFormContext();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FinancialFormData>({
    defaultValues: formData.family,
    mode: "onChange",
  });

  const onSubmit = (data: FinancialFormData) => {
    updateSection("family", data);
    nextStep();
  };

  const renderField = ({
    label,
    name,
    options,
    type,
    placeholder,
    pattern,
  }: any) => {
    if (type === "select") {
      return (
        <SelectField
          key={name}
          label={label}
          name={name}
          options={options}
          control={control}
          errors={errors}
        />
      );
    }
    return (
      <Field
        key={name}
        name={name}
        placeholder={placeholder}
        control={control}
        errors={errors}
        pattern={pattern}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
        {familyFormFIelds?.map((field) => renderField(field))}
      </div>

      <div className="sm:flex justify-end mt-6">
        <button
          className={`w-full sm:w-auto mt-4 sm:mt-0 ${
            isValid ? "btn" : "btn-disabled"
          }`}
          disabled={!isValid}
          aria-label="Go to next step"
        >
          {t("next")}
        </button>
      </div>
    </form>
  );
}
