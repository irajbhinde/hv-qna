export const questionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "RESULTS_DATA":
      return {
        ...state,
        questionAnswerData: [...state.questionAnswerData, payload],
      };
    case "CHECKBOX_DATA":
      return {
        ...state,
        checkboxData: [...state.checkboxData, payload],
      };
    case "CLEAR_ALL":
      return {
        ...state,
        checkboxData: [],
        questionAnswerData: [],
      };
    default:
      return state;
  }
};
