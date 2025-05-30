import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p
          className="text-center max-w-2xl text-lg text-gray-700"
          dangerouslySetInnerHTML={{ __html: t("appDescription") }}
        />
        <button
          onClick={() => navigate("/form/personalInfo")}
          className="btn text-blue-600 mt-6"
        >
          {t("startApplication")}
        </button>
      </div>
    </div>
  );
}
