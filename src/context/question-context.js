import { createContext,useContext,useReducer } from "react";
import { questionReducer } from "../reducer/question-reducer";

const QuestionContext = createContext(null);
const useQuestion = () => useContext(QuestionContext);
const QuestionProvider = ({children}) => {
    const [questionState,questionDispatch] = useReducer(questionReducer,{
        questionAnswerData : [],
        checkboxData : [],
    })
    return(
        <QuestionContext.Provider value={{questionState, questionDispatch}} >
            {children}
        </QuestionContext.Provider>
    )
}

export {useQuestion,QuestionProvider}