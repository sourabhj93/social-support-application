import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../context/ApplicationFormContext";
import { SelectField } from "../common/Select";
import { Field } from "../common/Input";

interface FinancialFormData {
  maritalStatus: string;
  dependents: string;
  employmentStatus: string;
  monthlyIncome: string;
  housingStatus: string;
}

const options = {
  maritalStatus: ["Single", "Married", "Divorced"],
  dependents: ["Yes", "No"],
  employmentStatus: [
    "Employed",
    "Self-Employed",
    "Unemployed",
    "Student",
    "Retired",
  ],
  housingStatus: ["Owned", "Rented", "Mortgaged", "Company Provided"],
};

export default function FinancialInfoForm() {
  const { t } = useTranslation();
  const { formData, updateSection, nextStep, prevStep } = useFormContext();
  const {
    register,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
        {/* Marital Status */}
        <SelectField
          label="Marital Status"
          name="maritalStatus"
          options={options.maritalStatus}
          control={control}
          errors={errors}
        />

        {/* Dependents */}
        <SelectField
          label="Dependents"
          name="dependents"
          options={options.dependents}
          control={control}
          errors={errors}
        />

        {/* Employment Status */}
        <SelectField
          label="Employment Status"
          name="employmentStatus"
          options={options.employmentStatus}
          control={control}
          errors={errors}
        />

        {/* Monthly Income */}
        <Field
          name="monthlyIncome"
          placeholder="Enter monthly income"
          control={control}
          errors={errors}
          pattern={{
            value: /^\d+(\.\d{1,2})?$/,
            message: "Enter a valid amount (up to 2 decimal places)",
          }}
        />

        {/* Housing Status */}
        <SelectField
          label="Housing Status"
          name="housingStatus"
          options={options.housingStatus}
          control={control}
          errors={errors}
        />
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
