import { useForm } from "react-hook-form";
import { useFormContext } from "../context/FormContext";
import { useTranslation } from "react-i18next";

interface PersonalFormData {
  name: string;
  nationalId: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

const fields = [
  { name: "name", placeholder: "Name" },
  { name: "nationalId", placeholder: "National ID" },
  { name: "dob", placeholder: "DOB", type: "date" },
  { name: "gender", placeholder: "Gender" },
  { name: "address", placeholder: "Address" },
  { name: "city", placeholder: "City" },
  { name: "state", placeholder: "State" },
  { name: "country", placeholder: "Country" },
  { name: "phone", placeholder: "Phone" },
  { name: "email", placeholder: "Email", type: "email" },
];

export default function PersonalInfo() {
  const { t } = useTranslation();
  const { formData, updateSection, nextStep } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<PersonalFormData>({
    defaultValues: formData.personal,
  });

  const onSubmit = (data: PersonalFormData) => {
    updateSection("personal", data);
    nextStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
          {fields.map(({ name, placeholder, type = "text" }) => (
            <div key={name}>
              <label
                id={`${name}-label`}
                className="text-md font-medium mb-1 ms-2"
              >
                {t(name)}
              </label>
              <input
                {...register(name as keyof PersonalFormData, {
                  required: `${placeholder} is required`,
                })}
                placeholder={placeholder}
                type={type}
                className="input mt-1"
                aria-labelledby={`${name}-label`}
              />
            </div>
          ))}
        </div>
        <div className="sm:flex justify-end mt-6">
          <button
            className={`w-full md:w-auto ${isValid ? "btn" : "btn-disabled"}`}
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
