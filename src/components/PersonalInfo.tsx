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
    getValues,
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
    setValue("state", "");
    setValue("city", "");
  }, [selectedCountry, setValue]);

  useEffect(() => {
    setValue("city", "");
  }, [selectedState, setValue]);

  const onSubmit = (data: PersonalFormData) => {
    updateSection("personal", data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
        <Field
          name="name"
          placeholder="Name"
          control={control}
          errors={errors}
        />

        <Field
          name="nationalId"
          placeholder="National ID"
          control={control}
          errors={errors}
          pattern={validations.nationalId}
        />

        <FieldDatePicker name="dob" control={control} errors={errors} />

        {/* Gender */}
        <SelectField
          name="gender"
          label="Gender"
          options={["male", "female", "other"]}
          control={control} // <-- use control instead of register
          errors={errors}
        />

        <SelectField
          name="country"
          label="Country"
          options={countries}
          control={control}
          errors={errors}
        />

        <SelectField
          name="state"
          label="State"
          options={states}
          control={control}
          errors={errors}
          disabled={!selectedCountry}
        />

        <SelectField
          name="city"
          label="City"
          options={cities}
          control={control}
          errors={errors}
          disabled={!selectedState}
        />

        <Field
          name="address"
          placeholder="Address"
          control={control}
          errors={errors}
        />

        <Field
          name="phone"
          placeholder="Phone"
          control={control}
          errors={errors}
          pattern={validations.phone}
        />

        <Field
          name="email"
          placeholder="Email"
          type="email"
          control={control}
          errors={errors}
          pattern={validations.email}
        />
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
