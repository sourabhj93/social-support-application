import { FormProvider } from "../context/ApplicationFormContext";
import FormWizard from "../components/FormWizard";

const LandingPage = () => {
  return (
    <FormProvider>
      <div className="min-h-screen text-gray-900 p-4">
        <div className="max-w-3xl mx-auto mt-4">
          {/* <h1 className="text-2xl font-bold mb-4 text-center">{t("title")}</h1> */}
          <FormWizard />
        </div>
      </div>
    </FormProvider>
  );
};

export default LandingPage;
