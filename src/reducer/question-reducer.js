export const questionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "RESULTS_DATA":
      return {
        ...state,
        questionAnswerData: [...state.questionAnswerData, payload],
      };
    default:
      return state;
  }
};
