
export const getListOfAllowMoves = (aspectRatio) => {

    let list = {}

    for (let i = 1; i <= Math.pow(aspectRatio, 2); i++) {

        const tempArray = []
    
        if (i - 1 > 0 && notNextRow(i, aspectRatio)) { tempArray.push(i - 1) }
        if (i + 1 <= Math.pow(aspectRatio, 2) && notNextRow(i + 1, aspectRatio)) { tempArray.push(i + 1) }
        if (i - aspectRatio > 0) { tempArray.push(i - aspectRatio) }
        if (i + aspectRatio <= Math.pow(aspectRatio, 2)) { tempArray.push(i + aspectRatio) }
    
        list[i] = tempArray
    
    }

    return list;
}

function notNextRow (number, decr) {

    while (number > decr) {
        number = number - decr;
    }
    
    return number !== 1;
}
