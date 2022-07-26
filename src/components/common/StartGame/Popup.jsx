import Portal from './Portal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pressStartTC, setAspectRatio } from '../../../store/reducers/app-reducer';
import { variables } from "../../../utils/variables";

const Popup = () => {
    const dispatch = useDispatch();
    const isOpenStart = useSelector(s => s.app.isOpenStart);
    const aspectRatio = useSelector(s => s.app.aspectRatio);

    if (!isOpenStart) return;

    const fieldSelectionHandler = (e) => {
        if (e.target.tagName === "INPUT") {
            dispatch(setAspectRatio(+e.target.value))
        }
    }

    return (
        <Portal>
            <StyledPopup className='popup'>
                <div className='popup__background'/>
                <div className='popup__wrapper'>
                    <i>Двигайся в лабиринте по стрелкам. Количество ходов - 10</i>
                    <div className='playground-size-list'>
                        <div onClick={fieldSelectionHandler} className='playground-size-list__item'>
                            <input defaultChecked={aspectRatio === 3} id="3" type="radio" value="3" name="playground-size"/>
                            <label htmlFor="date">Поле 3 х 3</label>
                        </div>
                        <div onClick={fieldSelectionHandler} className='playground-size-list__item'>
                            <input defaultChecked={aspectRatio === 4} id="4" type="radio" value="4" name="playground-size"/>
                            <label htmlFor="name">Поле 4 х 4</label>
                        </div>
                        <div onClick={fieldSelectionHandler} className='playground-size-list__item'>
                            <input defaultChecked={aspectRatio === 5} id="5" type="radio" value="5" name="playground-size"/>
                            <label htmlFor="amount">Поле 5 х 5</label>
                        </div>
                    </div>
                    <button onClick={() => dispatch(pressStartTC())} className='popup__btn'>СТАРТ</button>
                </div>
            </StyledPopup>
        </Portal>
    )
};

export default Popup;

const StyledPopup = styled.div`
&.popup {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}

& .popup__background {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.4;
}

& .popup__wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50% , -50%);
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    z-index: 99;
    max-width: 330px;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 4px;
}

& .playground-size-list {
    margin: 20px 0;
}

& .playground-size-list__item {
    display: flex;

    &:not(:last-child) {
        margin-bottom: 10px;
    }

    & input {
        width: 20px;
        height: 20px;
    }

    & label {
        margin-left: 10px;
    }
}

& .popup__btn {
    margin: 0 auto;
    padding: 10px;
    width: 100px;
    background-color: ${variables.blueColor};
    color: #ffffff;
    border-radius: 4px;
    font-size: 18px;
    letter-spacing: 4px;
    font-weight: 700;

    &:hover {
        background-color: #0066df;
    }
}
`