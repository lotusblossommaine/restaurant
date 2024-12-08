import './App.css';
import image from "./assets/backgroundImage.jpg";
import Menu from './Menu/Menu';

function App() {
  return (
    <div className="App" >
      <div style={{ backgroundImage: `url(${image})` }} className="backgroundImage">
        <div className="header">
          <div className="headerLabel"><h1>Lotus Blossom</h1></div>
        </div>
        <div className="backgroundOverlay">
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default App;
