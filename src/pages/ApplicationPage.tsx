import { FormProvider } from "../context/ApplicationFormContext";
import FormWizard from "../components/FormWizard";

const ApplicationPage = () => {
  return (
    <FormProvider>
      <div className="min-h-screen text-gray-900 p-4">
        <div className="max-w-3xl mx-auto mt-4">
          <FormWizard />
        </div>
      </div>
    </FormProvider>
  );
};

export default ApplicationPage;
