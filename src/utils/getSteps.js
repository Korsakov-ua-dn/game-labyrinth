import { getRandomInt } from "./getRandomInt"

export const getSteps = (listOfAllowedMoves, startNumber) => {
    let temp = [startNumber] // временно добавляем ячейку с которой нужно стартовать
    let ceil = startNumber
    
    // генерируем список из 10 шагов для текущей игры
    for (let i = 1; i <= 10; i++) {
        // фильруем из допустимых вариантов ходов ячейку с которой пришли (исключаем возможность пойти назад)
        const filteredArr = listOfAllowedMoves[ceil].filter(el => el !== temp[i - 2])

        const nextStep = filteredArr[getRandomInt(1, filteredArr.length) - 1]

        temp.push(nextStep)
        ceil = nextStep
    }

    // удаляем ячейку с которой стартовали
    return temp.splice(1)
}