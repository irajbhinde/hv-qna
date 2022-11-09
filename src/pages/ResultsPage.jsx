import { useQuestion } from "../context/question-context";
import { useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const { questionState, questionDispatch } = useQuestion();
  const { questionAnswerData, checkboxData } = questionState;
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" }} className="results-page">
      <h1>Results Page</h1>
      {questionAnswerData.map((question) => {
        return (
          <>
            <p>Question : {question.question}</p>
            <p>Selected Answer : {question.selectedOption}</p>
          </>
        );
      })}
      {checkboxData.map((ques) => {
        return (
          <>
            <p>Question : {ques.question}</p>
            {ques.selectedOption.answersChecked.map((ans) => {
              return <p>Selected Answer : {ans} </p>;
            })}
          </>
        );
      })}
      <div>
        <button
          onClick={() => {
            navigate("/");
            questionDispatch({ type: "CLEAR_ALL" });
          }}
        >
          Return to Home Page
        </button>
      </div>
    </div>
  );
}
