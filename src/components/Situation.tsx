import axios from "axios";
import { useForm } from "react-hook-form";
import { useFormContext } from "../context/FormContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SuggestionModal } from "./SuggestionModal";
import { Loader } from "../common/Loader";
import { Modal } from "../common/Modal";

interface SituationFormData {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

const fields = [
  { name: "financialSituation", placeholder: "Financial Situation" },
  {
    name: "employmentCircumstances",
    placeholder: "Employment Circumstances",
  },
  { name: "reasonForApplying", placeholder: "Reason For Applying" },
];

const fetchSuggestionFromGPT = async (prompt: string): Promise<any> => {
  try {
    const response = await axios.post(
      "https://ef4b-103-167-195-158.ngrok-free.app/chat",
      {
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.data || !response.data.response) {
      throw new Error("Invalid response from GPT API");
    }
    return response.data.response || "";
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error?.message || "Failed to fetch suggestion"
    );
  }
};

// Mocked GPT function for local testing as API's are not avaliable for free
const mockGPT = (prompt: string): Promise<string> =>
  new Promise((res) =>
    setTimeout(() => res(`${prompt} (suggested by AI)`), 1000)
  );

export default function Situation() {
  const { t } = useTranslation();
  const { formData, updateSection, resetForm, prevStep } = useFormContext();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid },
  } = useForm<SituationFormData>({
    defaultValues: formData.situation,
    mode: "onChange",
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loadingField, setLoadingField] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState("");
  const [currentField, setCurrentField] = useState<
    keyof SituationFormData | null
  >(null);

  const getSuggestion = async (field: keyof SituationFormData) => {
    setLoadingField(field);
    setError("");
    setCurrentField(field);
    try {
      const prompt = `Help me write a response for: ${getValues(field)}`;
      const result = await fetchSuggestionFromGPT(prompt);
      setSuggestion(result);
      setLoadingField(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const applySuggestion = () => {
    if (currentField) {
      setValue(currentField, suggestion, { shouldValidate: true });
    }
    closeModal();
  };

  const closeModal = () => {
    setSuggestion("");
    setError("");
    setCurrentField(null);
    setLoadingField("");
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const onSubmit = async (data: SituationFormData) => {
    updateSection("situation", data);
    setSubmitLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const payload = {
        ...formData.personal,
        ...formData.family,
        ...data,
      };

      await axios.post("https://jsonplaceholder.typicode.com/posts", payload);

      setSubmitSuccess(true);
      console.log("Form submitted:", payload);
    } catch (err: any) {
      console.error("Submit error:", err);
      setSubmitError(err.message || "Submission failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map(({ name, placeholder }) => (
          <div key={name} className="mb-4">
            <label
              id={`${name}-label`}
              className="text-md font-semibold mb-1 ms-2"
            >
              {t(name)}
            </label>
            <textarea
              {...register(name as keyof SituationFormData, {
                required: `${placeholder} is required`,
              })}
              className="input h-24 mt-1 w-full"
              aria-labelledby={`${name}-label`}
            />
            <button
              type="button"
              onClick={() => getSuggestion(name as keyof SituationFormData)}
              className="btn !bg-cyan-600 text-md"
              disabled={loadingField === name}
              aria-label="Get suggestion for this field"
            >
              {loadingField === name ? "Loading..." : t("helpMeWrite")}
            </button>
          </div>
        ))}

        <div className="sm:flex justify-between mt-8">
          <div>
            <button
              type="button"
              onClick={prevStep}
              className="btn-secondary w-full"
              aria-label="Go to previous step"
            >
              {t("back")}
            </button>
          </div>
          <button
            className={`w-full sm:w-auto mt-4 sm:mt-0 ${
              isValid && !submitLoading ? "btn" : "btn-disabled"
            }`}
            disabled={!isValid || submitLoading || !!error}
            aria-label="Submit form"
          >
            {t("submit")}
          </button>
        </div>
      </form>
      {submitLoading || loadingField ? <Loader /> : null}
      {submitError && (
        <Modal
          onClose={closeModal}
          title={t("submissionError")}
          body={
            <div className="text-red-500 my-2 text-lg font-semibold">
              {submitError}
            </div>
          }
          footer={
            <button
              onClick={() => setSubmitError("")}
              className="btn mt-2"
              aria-label="Close error message"
            >
              {t("ok")}
            </button>
          }
        ></Modal>
      )}
      {submitSuccess && (
        <Modal
          onClose={closeModal}
          title={t("applicationStatus")}
          body={
            <div className="text-green-500 my-2 text-lg font-semibold text-center">
              {t("formSubmittedSuccessfully")}
            </div>
          }
          footer={
            <button
              onClick={() => resetForm()}
              className="btn mt-2"
              aria-label="Start new application"
            >
              {t("startNewApplication")}
            </button>
          }
          classes="justify-center"
        ></Modal>
      )}
      {(suggestion || error) && (
        <SuggestionModal
          suggestion={suggestion}
          error={error}
          onApply={applySuggestion}
          onClose={closeModal}
          onChange={setSuggestion}
        />
      )}
    </>
  );
}
