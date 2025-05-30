import { Control, Controller, FieldErrors } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

type FieldProps = {
  name: string;
  control: Control<any>;
  errors: FieldErrors<any>;
};

export const FieldDatePicker = ({ name, control }: FieldProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full px-2">
      <label className="block text-sm font-bold text-gray-700 mb-1">
        {t(name)}
      </label>
      <Controller
        name="date"
        control={control}
        rules={{ required: "Date is required" }}
        render={({ field, fieldState }) => (
          <>
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null}
              format="DD-MM-YYYY"
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
              style={{ width: "100%" }}
              className="w-full py-2 text-md"
              onChange={(date: any) => field.onChange(date)}
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
};

export default DatePicker;
