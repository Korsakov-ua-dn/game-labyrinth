import styled from 'styled-components';
import Header from "./components/Header/Header";
import PlayingField from './components/PlayingField/PlayingField';
import MoveIndicator from './components/MoveIndicator/MoveIndicator';
import Popup from './components/common/StartGame/Popup';
import { useSelector } from "react-redux";
import { useLayoutEffect } from 'react';
import { preloadImages } from './utils/preloadImages';
import winImage from "./assets/img/win-min.webp";


const App = () => {
  const startNumber = useSelector(s => s.game.startNumber);

  // пути картинок для предварительной загрузки
  const images = [
    './assets/img/lose-min.webp',
    './assets/img/right-min.webp',
    './assets/img/start_img.webp',
    './assets/img/win-min.webp'
  ]

  // useLayoutEffect(() => {
  //   const images = [
  //     './assets/img/lose-min.webp',
  //     './assets/img/right-min.webp',
  //     './assets/img/start_img.webp',
  //     './assets/img/win-min.webp'
  //   ]
  // //  preloadImages();
  //   noneImgs = images.map((el) => {
  //     const imgComponent = require(`${el}`)
  //     return <IMG img={imgComponent}/>
  //   })
  // }, [])

  return (
    <StyledApp className="App">
      { startNumber && <div className='container'>
          <Header/>
          <PlayingField/>
          <MoveIndicator/>
        </div>
      }
      <Popup/>
      {images.map((el) => <NotViewImg img={require(`${el}`)}/> )}
            
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  &.App {
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 767px) {
      padding: 0 15px;
    }
  }

  & .container {
    max-width: 1024px;
    width: 100%;
  }
  
`

const NotViewImg = styled.div`
    position: absolute;
    background-image: url(${props => props.img});
`
