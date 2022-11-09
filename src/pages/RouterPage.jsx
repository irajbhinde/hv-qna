import { Routes, Route } from "react-router-dom";
import App from "../App";
import QuestionPage from "./QuestionPage";
import ResultsPage from "./ResultsPage";

export default function RouterPage() {
  return (
    <Routes>
      <Route path="*" element={<QuestionPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
}
