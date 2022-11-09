import { useEffect, useState } from "react";
import { useQuestion } from "../context/question-context";
import { questionData } from "../data/questionData";
import { useNavigate } from "react-router-dom";

export default function QuestionPage() {
  const [selectedOption, setSelectedOption] = useState();
  const { questionState, questionDispatch } = useQuestion();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentOptions, setCurrentOptions] = useState([]);
  const { questionAnswerData } = questionState;
  const [checkedState, setCheckedState] = useState(false);
  const navigate = useNavigate();

  const options = questionData.questions.map((ques) => {
    let arr = [];
    return (arr = [...arr, ques.questionoption.map((opt) => opt.optionvalue)]);
  });
  // console.log(options[0]);
  // console.log(options);
  // console.log(currentQuestion);

  const handleSelect = (names) => {
    setSelectedOption(names);
    console.log(selectedOption);
    const resultsPageData = {
      question: questionData.questions[currentQuestion].question,
      selectedOption: names,
    };
    questionDispatch({ type: "RESULTS_DATA", payload: resultsPageData });
    // console.log(resultsPageData);
  };

  console.log(questionAnswerData);

  return (
    <div className="App">
      <p className="question-number">
        Question No. {currentQuestion + 1}/{questionData.questions.length}
      </p>
      <p className="question">
        {questionData.questions[currentQuestion].question}
      </p>
      <div>
        {questionData.questions[currentQuestion].questionoption.map((opt) => {
          // console.log(opt);
          // console.log(opt.optionvalue,checkedState);

          return (
            <>
              {/* <p>{opt.optionvalue}</p> */}
              <p key={opt.optionvalue}>
                <input
                  defaultChecked={checkedState}
                  name={`question-${questionData.questions[currentQuestion].questionid}`}
                  type={questionData.questions[currentQuestion].questiontype}
                  id={`value-${opt.optionid}`}
                  value={opt.optionvalue}
                  onClick={() => {
                    if (
                      questionData.questions[currentQuestion].questiontype ===
                      "Radio"
                    ) {
                      // setCheckedState(false);
                      setCheckedState(!opt.selected);
                      setSelectedOption(opt.optionvalue);
                      // console.log("sel",selectedOption);
                      console.log(opt.optionvalue, "-", checkedState);
                    }
                  }}
                  onChange={(e) => {
                    if (
                      questionData.questions[currentQuestion].questiontype !==
                      "Radio"
                    ) {
                    
                      setSelectedOption(e.target.value);
                    }
                  }}
                />
                <label htmlFor={`value-${opt.optionid}`}>
                  {opt.optionvalue}
                </label>
              </p>
            </>
          );
        })}
      </div>
      {currentQuestion === questionData.questions.length - 1 ? (
        <>
          <button
            onClick={() => {
                console.log("look",selectedOption);
              handleSelect(selectedOption);
              setSelectedOption("");
              setCheckedState(false);
              navigate("/results");
            }}
          >
            Submit
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              handleSelect(selectedOption);
              setCurrentQuestion((currentQuestion) => currentQuestion + 1);
              setSelectedOption("");
              setCheckedState(false);
            }}
            className="btn-nextQuestion"
          >
            Next Question
          </button>
        </>
      )}
    </div>
  );
}
