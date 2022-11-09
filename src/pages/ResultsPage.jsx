import { useQuestion } from "../context/question-context";

export default function ResultsPage() {
  const { questionState, questionDispatch } = useQuestion();
  const { questionAnswerData } = questionState;
  console.log(questionAnswerData);
  return <h1>Results Page</h1>;
}
