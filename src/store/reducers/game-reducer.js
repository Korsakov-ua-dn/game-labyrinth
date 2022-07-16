
const initialState = {
    startNumber: null,
    setOfMoves: [],
    correctAnswer: null,
    showAnswer: false,
  };

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GAME/SET_START-NUMBER":
      case "GAME/SET_MOVES":
      case "GAME/SET_CORRECT-ANSWER":
      case "GAME/SET_SHOW-ANSWER":
        return { ...state, ...action.payload };
  
      default:
        return state;
    }
  };

//actions
export const setStartNumber = (startNumber) => ({
    type: "GAME/SET_START-NUMBER",
    payload: { startNumber },
  });

export const setMoves = (setOfMoves) => ({
    type: "GAME/SET_MOVES",
    payload: { setOfMoves },
  });
  
export const setCorrectAnswer = (correctAnswer) => ({
    type: "GAME/SET_CORRECT-ANSWER",
    payload: { correctAnswer },
  });
  
export const setShowAnswer = (showAnswer) => ({
    type: "GAME/SET_SHOW-ANSWER",
    payload: { showAnswer },
  });
  
//thunk
export const showCorrectAnswerTC = () => (dispatch) => {
  
  setTimeout(() => dispatch(setShowAnswer(true)), 1000)
  setTimeout(() => dispatch(setShowAnswer(false)), 2000)

};