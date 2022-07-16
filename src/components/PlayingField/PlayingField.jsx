import React  from "react";
import styled from 'styled-components';
import { variables } from "../../utils/variables";
import { useDispatch, useSelector } from "react-redux";
import { showCorrectAnswerTC } from "../../store/reducers/game-reducer";
import { startNewGameTC } from "../../store/reducers/app-reducer";

const PlayingField = () => {
    const dispatch = useDispatch();
    const aspectRatio = useSelector(s => s.app.aspectRatio);
    const correctAnswer = useSelector(s => s.game.correctAnswer);
    const startNumber = useSelector(s => s.game.startNumber);
    const showAnswer = useSelector(s => s.game.showAnswer);
    const disable = useSelector(s => s.app.disable);

    console.log("correct answer: ", correctAnswer);

// вещаем один обработчик для всех ячеек
    const clickCeilHandler = (e) => {
        if (e.target.tagName === 'SPAN') {

        if (e.target.id == correctAnswer) {
            e.target.classList.add("win");
            setTimeout(() => {
                e.target.classList.remove("win");
            }, 1000)
            dispatch(startNewGameTC(1000));
        } else {
            e.target.classList.add("lose");
            setTimeout(() => {
                e.target.classList.remove("lose");
            }, 1000)
            dispatch(showCorrectAnswerTC());
            dispatch(startNewGameTC(2000));
        }
           
        }
    }

// генерируем массив ячеек для игрового поля
    const getCeil = () => {
        let ceils = [];
        for (let i = 1; i <= Math.pow(aspectRatio, 2); i++) {
            ceils.push(<Ceil win={ showAnswer && correctAnswer == i} start={i == startNumber} i={i} key={i}/>);     
        }
        return ceils;
    };

    return (
        <>
            <StyledTable onClick={clickCeilHandler} className={`${disable ? 'disable' : ''} table`}>
            
               { getCeil() }
                
            </StyledTable>
        </>
    )
}

export default React.memo(PlayingField);

const Ceil = ({ i, start, win }) => {
    const classN = `${start ? 'start' : ''} ${win ? 'win' : ''} table__ceil`

    return (
        <span id={i} className={classN} />
    )
}

const StyledTable = styled.main`
    &.table {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        max-width: 640px;
        margin: 50px auto;

        &.disable {
            pointer-events: none;
        }
    }

    & .table__ceil {
        padding-bottom: 100%;
        width: 100%;
        background-color: ${variables.backgroundColor};

        &.start {
            background-image: url("/start_img.webp");
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        &.win {
            background-image: url("/win.png");
            background-size: 80%;
            background-position: center;
            background-repeat: no-repeat;
        }

        &.lose {
            background-image: url("/lose.png");
            background-size: 80%;
            background-position: center;
            background-repeat: no-repeat;
        }
    }
`