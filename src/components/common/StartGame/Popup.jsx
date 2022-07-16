import Portal from './Portal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pressStartTC } from '../../../store/reducers/app-reducer';
import { variables } from "../../../utils/variables";

const Popup = () => {
    const dispatch = useDispatch();
    const isOpenStart = useSelector(s => s.app.isOpenStart);

    if (!isOpenStart) return;

    return (
        <Portal>
            <StyledPopup className='popup'>
                <div className='popup__background'/>
                <div className='popup__wrapper'>
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
    background-color: ${variables.backgroundLightColor};
    border-radius: 20px;
}

& .popup__btn {
    width: 100%;
    color: ${variables.blueColor};
    padding: 20px 0;
    font-size: 18px;
    letter-spacing: 4px;
    font-weight: 700;
}
`