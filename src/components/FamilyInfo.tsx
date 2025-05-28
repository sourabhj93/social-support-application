import { useForm } from "react-hook-form";
import { useFormContext } from "../context/FormContext";
import { useTranslation } from "react-i18next";

interface FamilyFormData {
  maritalStatus: string;
  dependents: string;
  employmentStatus: string;
  monthlyIncome: string;
  housingStatus: string;
}

const fields = [
  { name: "maritalStatus", placeholder: "Marital Status" },
  { name: "dependents", placeholder: "Dependents" },
  { name: "employmentStatus", placeholder: "Employment Status" },
  { name: "monthlyIncome", placeholder: "Monthly Income" },
  { name: "housingStatus", placeholder: "Housing Status" },
];

export default function FamilyInfo() {
  const { t } = useTranslation();
  const { formData, updateSection, nextStep, prevStep } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FamilyFormData>({
    defaultValues: formData.family,
  });

  const onSubmit = (data: FamilyFormData) => {
    updateSection("family", data);
    nextStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
          {fields.map(({ name, placeholder }) => (
            <div key={name}>
              <label
                id={`${name}-label`}
                className="text-md font-medium mb-1 ms-2"
              >
                {t(name)}
              </label>
              <input
                key={name}
                {...register(name as keyof FamilyFormData, {
                  required: `${placeholder} is required`,
                })}
                placeholder={placeholder}
                className="input mt-1"
                aria-labelledby={`${name}-label`}
              />
            </div>
          ))}
        </div>
        <div className="sm:flex justify-between mt-6">
          <div>
            <button
              type="button"
              onClick={prevStep}
              className="btn-secondary w-full"
              aria-label="Go to previous step"
            >
              {t("back")}
            </button>
          </div>
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
    </>
  );
}
