import React, { useEffect, useState }  from "react";
import styled from 'styled-components';
import arrowRightImage from "../../assets/img/right-min.webp"
import { variables } from "../../utils/variables";
import { useDispatch, useSelector } from "react-redux";
import { setDisable } from "../../store/reducers/app-reducer";

const MoveIndicator = () => {
    const dispatch = useDispatch();
    const disable = useSelector(s => s.app.disable);
    const startNumber = useSelector(s => s.game.startNumber);
    const listOfMoves = useSelector(s => s.game.listOfMoves);
    const aspectRatio = useSelector(s => s.app.aspectRatio);

// показываем стрелку направления движения каждую секунду
    const [show, setShow] = useState(-2);
    useEffect(() => {
        if (show === 10) {
            dispatch(setDisable(false))
            return;
        }
        setTimeout(() => setShow(show + 1), 1000)
    }, [show, dispatch]);

// генерируем массив ячеек для отрисовки
    const getMoves = () => {
        let moves = [];
        let currentCeilNum = startNumber

        for (let i = 0; i < 10; i++) {
            const movement =  listOfMoves[i] - currentCeilNum
            currentCeilNum = listOfMoves[i]
            moves.push(<span 
                data-arrow={`${movement}`} 
                className={`${disable && i > show ? 'disable' : ''} ${i == show ? 'active' : ''} moves__ceil`} 
                key={i}
                ></span>); // у спанов есть псевдоэлемент after
        }

        return moves;
    };

    return (
        <StyledMoves aspectRatio={aspectRatio} className="moves">
        
            { getMoves() }
            
        </StyledMoves>
    )
}

export default React.memo(MoveIndicator);

const StyledMoves = styled.div`
    &.moves {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 20px;
        max-width: calc(500 * 100vh / 868);
        margin: 0 auto;
    }

    & .moves__ceil {
        position: relative;
        padding-bottom: 100%;
        width: 100%;
        background-color: ${variables.backgroundBlueColor};
       
// по умолчанию стрелка - право соответствует ходу в перед (+1), (-1) ход назад, (+ соотношение сторон) - ход вниз, (- соотношение сторон) - ход вверх 
        &[data-arrow="-1"]::after {
            transform: rotate(180deg);
        }
        &[data-arrow="${props => props.aspectRatio}"]::after {
            transform: rotate(90deg);
        }
        &[data-arrow="${props => -props.aspectRatio}"]::after {
            transform: rotate(-90deg);
        }

        &.disable::after {
            background-image: unset;
        }

        &.active {
            background-color: ${variables.accentColor};
        }
    }

    & .moves__ceil::after {
        position: absolute;
        content: '';
        background-image: url(${arrowRightImage});
        background-size: 60%;
        background-position: center;
        background-repeat: no-repeat;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`