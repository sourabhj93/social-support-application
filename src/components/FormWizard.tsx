import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FamilyInfo from "./FamilyInfo";
import PersonalInfo from "./PersonalInfo";
import Situation from "./Situation";
import BackButton from "./BackButton";

export const steps = ["personalInfo", "familyFinance", "situation"];

const stepComponents: any = {
  personalInfo: <PersonalInfo />,
  familyFinance: <FamilyInfo />,
  situation: <Situation />,
};

export default function FormWizard() {
  const { t } = useTranslation();
  const { step = "" } = useParams();
  const navigate = useNavigate();

  const currentStepIndex = steps.indexOf(step);
  const currentComponent = stepComponents[step] || <div>Step not found</div>;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-6">
      <div className="flex justify-between items-center mb-3 md:mb-6 sm:ms-36 ms-16">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;

          return (
            <div
              key={label}
              className="flex-1 flex items-center cursor-pointer"
              onClick={() => navigate(`/form/${label}`)}
            >
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

      {/* Mobile title */}
      <div className="ms-4 mb-4 text-xl font-bold text-blue-600 block md:hidden text-center">
        {t(step)}
      </div>
      {step !== steps[0] && <BackButton />}

      {/* Render Step */}
      {currentComponent}
    </div>
  );
}
