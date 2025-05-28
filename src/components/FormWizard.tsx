import { useTranslation } from "react-i18next";
import FamilyInfo from "./FamilyInfo";
import PersonalInfo from "./PersonalInfo";
import Situation from "./Situation";
import { useFormContext } from "../context/ApplicationFormContext";

export const steps = ["personalInfo", "familyFinance", "situation"];

export default function FormWizard() {
  const { t } = useTranslation();
  const { formData } = useFormContext();
  const { step } = formData;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-6">
      <div className="flex justify-between items-center mb-3 md:mb-6 sm:ms-36 ms-16">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === step;
          const isCompleted = stepNumber < step;

          return (
            <div key={label} className="flex-1 flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    isCompleted
                      ? "bg-green-500"
                      : isActive
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                >
                  {stepNumber}
                </div>
                <div className="mt-1 text-[12px] text-center hidden md:block">
                  {t(label)}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 h-1 md:-mt-4 bg-gray-200 mx-2">
                  <div
                    className={`h-1 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="ms-4 mb-6 text-xl font-bold text-blue-600 block md:hidden text-center">
        {t(steps[step - 1])}
      </div>
      {step === 1 && <PersonalInfo />}
      {step === 2 && <FamilyInfo />}
      {step === 3 && <Situation />}
    </div>
  );
}
