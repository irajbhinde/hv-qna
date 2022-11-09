import { useEffect, useState } from "react";
import { useQuestion } from "../context/question-context";
import { questionData } from "../data/questionData";
import { useNavigate } from "react-router-dom";

export default function QuestionPage() {
  const [selectedOption, setSelectedOption] = useState();
  const { questionState, questionDispatch } = useQuestion();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [checkedState, setCheckedState] = useState(false);
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [checkedInfo, setCheckedInfo] = useState({
    answersChecked: [],
  });
  const handleSelect = (names) => {
    setSelectedOption(names);
    if (typeof names === "object") {
      const checkboxAnswers = {
        question: questionData.questions[currentQuestion].question,
        selectedOption: names,
      };
      questionDispatch({ type: "CHECKBOX_DATA", payload: checkboxAnswers });
    } else {
      const resultsPageData = {
        question: questionData.questions[currentQuestion].question,
        selectedOption: names,
      };
      questionDispatch({ type: "RESULTS_DATA", payload: resultsPageData });
    }
  };

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
          return (
            <>
              <p key={opt.optionid}>
                <input
                  defaultChecked={checkedState}
                  name={`question-${questionData.questions[currentQuestion].questionid}`}
                  type={questionData.questions[currentQuestion].questiontype}
                  id={`value-${opt.optionid}`}
                  value={
                    questionData.questions[currentQuestion].questiontype ===
                    "Date"
                      ? dateValue
                      : questionData.questions[currentQuestion].questiontype ===
                        "Textarea"
                      ? textValue
                      : opt.optionvalue
                  }
                  onClick={() => {
                    if (
                      questionData.questions[currentQuestion].questiontype ===
                      "Radio"
                    ) {
                      setCheckedState(!opt.selected);
                      setSelectedOption(opt.optionvalue);
                    }
                  }}
                  onChange={(e) => {
                    if (
                      questionData.questions[currentQuestion].questiontype ===
                      "Checkbox"
                    ) {
                      const { value, checked } = e.target;
                      const { answersChecked } = checkedInfo;
                      let storeStateData;
                      if (checked) {
                        storeStateData = {
                          ...checkedInfo,
                          answersChecked: [...answersChecked, value],
                        };
                      } else {
                        storeStateData = {
                          ...checkedInfo,
                          answersChecked: answersChecked.filter(
                            (e) => e !== value
                          ),
                        };
                      }
                      setCheckedInfo(storeStateData);
                      setSelectedOption(storeStateData);
                    }
                    if (
                      questionData.questions[currentQuestion].questiontype ===
                      "Date"
                    ) {
                      setSelectedOption(e.target.value);
                      setDateValue(e.target.value);
                    }
                    if (
                      questionData.questions[currentQuestion].questiontype ===
                      "Textarea"
                    ) {
                      setSelectedOption(e.target.value);
                      setTextValue(e.target.value);
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
          <div
            style={{
              margin: "2rem",
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => {
                setCurrentQuestion((currentQuestion) => currentQuestion - 1);
              }}
            >
              Prev
            </button>
            <button
              onClick={() => {
                handleSelect(selectedOption);
                setSelectedOption("");
                setCheckedState(false);
                navigate("/results");
              }}
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              margin: "2rem",
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => {
                if (currentQuestion !== 0) {
                  setCurrentQuestion((currentQuestion) => currentQuestion - 1);
                }
              }}
            >
              Prev
            </button>
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
          </div>
        </>
      )}
    </div>
  );
}
