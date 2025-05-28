import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface FormData {
  step: number;
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
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context)
    throw new Error("useFormContext must be used within FormProvider");
  return context;
};

const defaultData: FormData = {
  step: 1,
  personal: {},
  family: {},
  situation: {},
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(() => {
    const stored = localStorage.getItem("socialFormData");
    return stored ? JSON.parse(stored) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem("socialFormData", JSON.stringify(formData));
  }, [formData]);

  const resetForm = () => {
    setFormData(defaultData);
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

  const nextStep = () =>
    setFormData((prev) => ({ ...prev, step: prev.step + 1 }));
  const prevStep = () =>
    setFormData((prev) => ({ ...prev, step: prev.step - 1 }));

  return (
    <FormContext.Provider
      value={{ formData, updateSection, resetForm, nextStep, prevStep }}
    >
      {children}
    </FormContext.Provider>
  );
};
