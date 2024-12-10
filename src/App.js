import { useState } from 'react';
import classnames from 'classnames';

import './App.css';
import image from "./assets/backgroundImage.jpg";
import Menu from './Menu/Menu';

function App() {
  const [isTakeout, setIsTakeout] = useState(false);

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
            <h1>{isTakeout ? 'TAKEOUT MENU' : 'DINE-IN MENU'}</h1>
            <Menu isTakeout={isTakeout} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
