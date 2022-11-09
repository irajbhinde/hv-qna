import { useQuestion } from "../context/question-context";

export default function ResultsPage() {
  const { questionState } = useQuestion();
  const { questionAnswerData, checkboxData } = questionState;
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
              return <span>Selected Answer : {ans} </span>;
            })}
          </>
        );
      })}
    </div>
  );
}
