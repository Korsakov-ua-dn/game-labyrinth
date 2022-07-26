import { getListOfAllowMoves } from "../../utils/getListOfAllowMoves";
import { getSteps } from "../../utils/getSteps";
import { getRandomInt } from "../../utils/getRandomInt";
import { setCorrectAnswer, setMoves, setStartNumber } from "./game-reducer";

const initialState = {
    isOpenStart: true,
    aspectRatio: 3,
    listOfAllowedMoves: {},
    disable: true,
  };

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
      case "APP/SET_OPEN-START":
      case "APP/SET_LIST-OF-ALLOW-MOVES":
      case "APP/SET_DISABLE":
      case "APP/SET_ASPECT-RATIO":
        return { ...state, ...action.payload };
  
      default:
        return state;
    }
  };

//actions
export const setOpenStart = (isOpenStart) => ({
    type: "APP/SET_OPEN-START",
    payload: { isOpenStart },
  });

export const setListOfAllowedMoves = (listOfAllowedMoves) => ({
    type: "APP/SET_LIST-OF-ALLOW-MOVES",
    payload: { listOfAllowedMoves },
  });

export const setDisable = (disable) => ({
    type: "APP/SET_DISABLE",
    payload: { disable },
  });

export const setAspectRatio = (aspectRatio) => ({
    type: "APP/SET_ASPECT-RATIO",
    payload: { aspectRatio },
  });

  
//thunk
export const pressStartTC = () => (dispatch, getState) => {
  const aspectRatio = getState().app.aspectRatio;
 
  // генерируем и добавляем в стейт стартвое значение
  const startNumber = getRandomInt(1, Math.pow(aspectRatio, 2));
  dispatch(setStartNumber(startNumber));
  // console.log("startNumber: ", startNumber);

  // закрываем модалку
  dispatch(setOpenStart(false));
  
  // добавляем допустимые варианты шагов для каждой ячейки
  dispatch(addListOfAllowedMovesTC());

  // добавляем список шагов для текущей игры
  dispatch(addListOfStepsTC());

};

export const addListOfAllowedMovesTC = () => (dispatch, getState) => {
  const aspectRatio = getState().app.aspectRatio;

  // генерируем список допустимых шагов для всех ячеек
  const list = getListOfAllowMoves(aspectRatio);
  dispatch(setListOfAllowedMoves(list));
  // console.log("listOfAllowedMoves: ", list);

};

export const addListOfStepsTC = () => (dispatch, getState) => {
  const listOfAllowedMoves = getState().app.listOfAllowedMoves;
  const startNumber = getState().game.startNumber;

  // получаю рандомно сгенерированные шаги
  const listOfMoves = getSteps(listOfAllowedMoves, startNumber)
  dispatch(setMoves(listOfMoves));
  // console.log("listOfMoves: ", listOfMoves);

  // правильный ответ = последняя ячейча в массиве шагов
  dispatch(setCorrectAnswer(listOfMoves[9]));
  console.log("правильный ответ: ", listOfMoves[9]);
};

export const startNewGameTC = (ms) => (dispatch) => {
  setTimeout(() => {
    dispatch(setStartNumber(null));
    dispatch(setDisable(true));
    dispatch(setOpenStart(true));
  }, ms)
};  