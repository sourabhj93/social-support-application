import { useState } from "react";
import CustomTextArea from "../common/CustomTextArea";
import { Modal } from "../common/Modal";
import { useTranslation } from "react-i18next";

interface SuggestionModalProps {
  suggestion: string;
  error: string;
  onClose: () => void;
  onApply: () => void;
  onChange: (value: string) => void;
}

export const SuggestionModal: React.FC<SuggestionModalProps> = ({
  suggestion,
  error,
  onClose,
  onApply,
  onChange,
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const title = error ? "Error" : "AI Suggested Text";
  const body = error ? (
    <p className="text-red-600">{error}</p>
  ) : isEditing ? (
    <CustomTextArea value={suggestion} onChange={onChange} />
  ) : (
    <pre className="bg-gray-100 p-2 rounded-md font-mono text-sm whitespace-pre-wrap border border-gray-300">
      {suggestion.trim() || "No suggestion available."}
    </pre>
  );
  const footer = error ? (
    <button onClick={onClose} className="btn text-sm mt-4">
      {t("close")}
    </button>
  ) : (
    <>
      <button
        onClick={() => setIsEditing(!isEditing)}
        disabled={isEditing}
        className="btn !bg-emerald-500 w-full sm:w-auto"
      >
        {t("edit")}
      </button>
      <button onClick={onApply} className="btn w-full sm:w-auto">
        {t("accept")}
      </button>
      <button onClick={onClose} className="btn-secondary w-full sm:w-auto">
        {t("discard")}
      </button>
    </>
  );
  return <Modal title={title} body={body} footer={footer}></Modal>;
};
