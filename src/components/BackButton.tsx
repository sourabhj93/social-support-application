import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center text-md font-extrabold text-gray-700 hover:text-blue-600 mb-6"
    >
      {i18n.dir(i18n.language) === "ltr" ? (
        <ArrowLeftOutlined className="me-1" size={18} />
      ) : (
        <ArrowRightOutlined className="me-1" size={18} />
      )}
      {t("back")}
    </button>
  );
}
