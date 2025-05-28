import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center text-sm font-semibold text-gray-700 hover:text-blue-600 mb-6"
    >
      <ArrowLeft className="mr-1" size={18} />
      Go Back
    </button>
  );
}
