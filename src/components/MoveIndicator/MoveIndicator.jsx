import React, { useEffect, useState }  from "react";
import styled from 'styled-components';
import { variables } from "../../utils/variables";
import { useDispatch, useSelector } from "react-redux";
import { setDisable } from "../../store/reducers/app-reducer";

const MoveIndicator = () => {
    const dispatch = useDispatch();
    const disable = useSelector(s => s.app.disable);
    const startNumber = useSelector(s => s.game.startNumber);
    const setOfMoves = useSelector(s => s.game.setOfMoves);

// показываем стрелку направления движения каждую секунду
    const [show, setShow] = useState(-2);
    const timer = () => setShow(show + 1);
    useEffect(() => {
        if (show == 10) {
            dispatch(setDisable(false))
            return;
        }
        const id = setInterval(timer, 1000)
        return () => clearInterval(id);
    }, [show]);

// генерируем массив ячеек для отрисовки
    const getMoves = () => {
        let moves = [];
        let temp = startNumber

        for (let i = 0; i < 10; i++) {
            const res =  setOfMoves[i] - temp
            temp = setOfMoves[i]
            moves.push(<span 
                data-arrow={`${res}`} 
                className={`${disable && i > show ? 'disable' : ''} ${i == show ? 'active' : ''} moves__ceil`} 
                key={i}
                ></span>);     
        }

        return moves;
    };

    return (
        <>
            <StyledMoves className="moves">
            
               { getMoves() }
                
            </StyledMoves>
        </>
    )
}

export default React.memo(MoveIndicator);

const StyledMoves = styled.div`
    &.moves {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 20px;
        max-width: 640px;
        margin: 50px auto;
    }

    & .moves__ceil {
        position: relative;
        padding-bottom: 100%;
        width: 100%;
        background-color: ${variables.backgroundColor};
       

        &[data-arrow="-1"]::after {
            transform: rotate(180deg);
        }
        &[data-arrow="3"]::after {
            transform: rotate(90deg);
        }
        &[data-arrow="-3"]::after {
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
        background-image: url("/right.png");
        background-size: 60%;
        background-position: center;
        background-repeat: no-repeat;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`