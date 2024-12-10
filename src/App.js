import { useRef, useState } from 'react';
import classnames from 'classnames';

import './App.css';
import image from "./assets/backgroundImage.jpg";
import Menu from './Menu/Menu';

const MenuKey = () => {
  return (
    <div className="menuKey">
      <div>* Indicates Hot & Spicy</div>
      <div>** Indicates Imitation Crab Meat</div>
      <div className="finePrint">
        <div>Prices subject to change.</div>
      </div>
    </div>
  )
}

const ScrollButtons = ({ luncheonSpecialsRef, drinksRef }) => {
  const scrollToLunch = () => {
    luncheonSpecialsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToDrinks = () => {
    drinksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="scrollButtonsContainer">
      <div className="scrollButton" onClick={scrollToLunch}>Luncheon Specials</div>
      <div className="scrollButton" onClick={scrollToDrinks}>Drinks</div>
    </div>
  )
}

function App() {
  const [isTakeout, setIsTakeout] = useState(false)

  const luncheonSpecialsRef = useRef(null);
  const drinksRef = useRef(null);

  return (
    <div className="App" >
      <div style={{ backgroundImage: `url(${image})` }} className="backgroundImage">
        <div className="header">
          <div className="headerLabel"><h1>Lotus Blossom</h1></div>
          <div className="navContainer">
            <div className="nav">
              <div className={classnames("navItem", { isSelected: !isTakeout })} onClick={() => { setIsTakeout(false) }}>Dine-in Menu</div>
              <div className={classnames("navItem", { isSelected: isTakeout })} onClick={() => { setIsTakeout(true) }}>Takeout Menu</div>
            </div>
          </div>
        </div>
        <div className="backgroundOverlay">
          <div className="content">
            <div className="contentHeader">
              <h1>{isTakeout ? 'TAKEOUT MENU' : 'DINE-IN MENU'}</h1>
              <ScrollButtons luncheonSpecialsRef={luncheonSpecialsRef} drinksRef={drinksRef} />
            </div>
            <MenuKey />
            <Menu isTakeout={isTakeout} luncheonSpecialsRef={luncheonSpecialsRef} drinksRef={drinksRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
