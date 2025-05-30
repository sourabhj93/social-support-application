import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../context/ApplicationFormContext";
import { useTranslation } from "react-i18next";
import { SelectField } from "../common/Select";
import { Field } from "../common/Input";
import { FieldDatePicker } from "../common/DatePicker";

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

const locationData: Record<string, Record<string, string[]>> = {
  UAE: {
    Dubai: ["Deira", "Jumeirah", "Al Barsha"],
    AbuDhabi: ["Mussafah", "Al Ain"],
  },
  India: {
    Maharashtra: ["Pune", "Mumbai"],
    Delhi: ["Dwarka", "Rohini"],
  },
};

const validations = {
  nationalId: {
    value: /^784-\d{4}-\d{7}-\d{1}$/,
    message: "Invalid Emirates ID format. Example: 784-1234-1234567-1",
  },
  phone: {
    value: /^((\+971|0)?5[0-9]{8}|(\+91|91)?[6-9][0-9]{9})$/,
    message:
      "Invalid phone number. Example: +971501234567, 0501234567, or +919876543210",
  },
  email: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
};

export default function PersonalInfo() {
  const { t } = useTranslation();
  const { formData, updateSection, nextStep } = useFormContext();

  const {
    handleSubmit,
    formState: { isValid, errors },
    watch,
    setValue,
    control,
  } = useForm<PersonalFormData>({
    defaultValues: formData.personal,
    mode: "onChange",
  });

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const countries = Object.keys(locationData);
  const states = selectedCountry
    ? Object.keys(locationData[selectedCountry])
    : [];
  const cities =
    selectedCountry && selectedState
      ? locationData[selectedCountry][selectedState]
      : [];

  useEffect(() => {
    if (selectedCountry !== formData.personal.country) {
      setValue("state", "");
      setValue("city", "");
    }
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (selectedCountry !== formData.personal.country) {
      setValue("city", "");
    }
  }, [selectedState, setValue]);

  const onSubmit = (data: PersonalFormData) => {
    updateSection("personal", data);
    nextStep();
  };

  const formFields = [
    {
      label: "Name",
      name: "name",
      placeholder: "Enter your name",
      type: "text",
    },
    {
      label: "National ID",
      name: "nationalId",
      placeholder: "Enter your National ID",
      type: "text",
      pattern: validations.nationalId,
    },
    {
      label: "Date of Birth",
      name: "dob",
      placeholder: "Select your date of birth",
      type: "date",
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["male", "female", "other"],
    },
    {
      label: "Country",
      name: "country",
      type: "select",
      options: countries,
    },
    {
      label: "State",
      name: "state",
      type: "select",
      options: states,
      disabled: !selectedCountry,
    },
    {
      label: "City",
      name: "city",
      type: "select",
      options: cities,
      disabled: !selectedState,
    },
    {
      label: "Address",
      name: "address",
      placeholder: "Enter your address",
      type: "text",
    },
    {
      label: "Phone",
      name: "phone",
      placeholder: "Enter your phone number",
      type: "text",
      pattern: validations.phone,
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter your email",
      type: "email",
      pattern: validations.email,
    },
  ];

  const renderField = ({
    label,
    name,
    options,
    type,
    placeholder,
    pattern,
    disabled,
  }: any) => {
    if (type === "select") {
      return (
        <SelectField
          key={name}
          label={label}
          name={name}
          options={options || []}
          disabled={disabled || false}
          control={control}
          errors={errors}
        />
      );
    } else if (type === "date") {
      return (
        <FieldDatePicker
          key={name}
          name={name}
          control={control}
          errors={errors}
        />
      );
    } else {
      return (
        <Field
          key={name}
          name={name}
          type={type}
          pattern={pattern}
          control={control}
          placeholder={placeholder ?? ""}
          errors={errors}
        />
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
        {formFields.map((field) => renderField(field))}
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
  );
}
