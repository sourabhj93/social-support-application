import { Input } from "antd";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FieldProps = {
  name: string;
  placeholder: string;
  type?: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  pattern?: { value: RegExp; message: string };
};

export function Field({
  name,
  placeholder,
  type = "text",
  control,
  errors,
  pattern,
}: FieldProps) {
  const { t } = useTranslation();
  return (
    <div className="w-full px-2">
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {t(name)}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: `${placeholder} is required`,
          pattern,
        }}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className="w-full"
            />
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
