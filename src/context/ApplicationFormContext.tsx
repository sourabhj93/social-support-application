import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

const stepRoutes = ["personalInfo", "familyFinance", "situation"];

interface FormData {
  personal: Record<string, any>;
  family: Record<string, any>;
  situation: Record<string, any>;
}

interface FormContextType {
  formData: FormData;
  updateSection: (section: keyof FormData, data: Record<string, any>) => void;
  resetForm: VoidFunction;
  nextStep: () => void;
  prevStep: () => void;
  currentStepKey: string;
  currentStepIndex: number;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormContext must be used within FormProvider");
  return context;
};

const defaultData: FormData = {
  personal: {},
  family: {},
  situation: {},
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(() => {
    const stored = localStorage.getItem("socialFormData");
    return stored ? JSON.parse(stored) : defaultData;
  });

  const navigate = useNavigate();
  const location = useLocation();
  const currentStepKey = location.pathname.split("/").pop() || "personalInfo";
  const currentStepIndex = stepRoutes.indexOf(currentStepKey);

  useEffect(() => {
    localStorage.setItem("socialFormData", JSON.stringify(formData));
  }, [formData]);

  const resetForm = () => {
    setFormData(defaultData);
    navigate(`/form/${stepRoutes[0]}`);
  };

  const updateSection = (
    section: keyof FormData,
    data: Record<string, any>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as Record<string, unknown>), ...data },
    }));
  };

  const nextStep = () => {
    if (currentStepIndex < stepRoutes.length - 1) {
      navigate(`/form/${stepRoutes[currentStepIndex + 1]}`);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      navigate(`/form/${stepRoutes[currentStepIndex - 1]}`);
    }
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateSection,
        resetForm,
        nextStep,
        prevStep,
        currentStepKey,
        currentStepIndex,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
