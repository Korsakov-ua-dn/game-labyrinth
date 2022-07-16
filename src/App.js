import styled from 'styled-components';
import Header from "./components/Header/Header";
import PlayingField from './components/PlayingField/PlayingField';
import MoveIndicator from './components/MoveIndicator/MoveIndicator';
import Popup from './components/common/StartGame/Popup';
import { useSelector } from "react-redux";

const App = () => {
  const startNumber = useSelector(s => s.game.startNumber);

  return (
    <StyledApp className="App">
      { startNumber && <div className='container'>
          <Header/>
          <PlayingField/>
          <MoveIndicator/>
        </div>
      }
      <Popup/>
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  &.App {
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 767px) {
      padding: 15px;
    }
  }

  & .container {
    max-width: 1024px;
    width: 100%;
    min-height: 100vh;
  }


`
