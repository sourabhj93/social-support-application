import { Select } from "antd";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

const { Option } = Select;

type SelectFieldProps = {
  name: any;
  label: string;
  options: string[];
  control: Control<any>;
  errors: FieldErrors<any>;
  disabled?: boolean;
};

export function SelectField({
  name,
  label,
  options,
  control,
  errors,
  disabled = false,
}: SelectFieldProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full px-2 sm:px-0">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field, fieldState }) => (
          <>
            <Select
              {...field}
              className="w-full"
              placeholder={`Select ${label}`}
              disabled={disabled}
              onChange={(value) => field.onChange(value)}
              onBlur={field.onBlur}
              value={field.value ?? undefined}
              showSearch
              optionFilterProp="children"
              dropdownMatchSelectWidth={false} // allows better mobile behavior
            >
              {options.map((opt) => (
                <Option key={opt} value={opt}>
                  {t(opt)}
                </Option>
              ))}
            </Select>

            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
