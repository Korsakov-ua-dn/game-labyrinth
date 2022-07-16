import { getRandomInt } from "./getRandomInt"

export const getNextStep = (arr) => arr[getRandomInt(1, arr.length) - 1]
// возвращает одно из значений массива рандомно