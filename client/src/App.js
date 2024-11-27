import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HoverImageLinks } from './Components/HoverImageLinks';
import ShuffleHero from './Components/ShuffleHero';
import ShuffleHero2 from './Components/ShuffleHero2';
import ShuffleHero3 from './Components/ShuffleHero3';
import { ThemeProvider } from "./Components/ThemeContext"; // Adjust the path as necessary
import SlideTabsExample from './Components/SlideTabsExample';
import { AboutUs } from './Components/AboutUs';
import VanishList from './Components/VanishList';
import CardSelection from './Components/CardSelection';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="App">
          <SlideTabsExample />
          <Routes>
            {/* Main homepage with ShuffleHero components */}
            <Route path="/" element={
              <>
                <ShuffleHero />
                <ShuffleHero2 />
                <ShuffleHero3 />
                <HoverImageLinks />
              </>
            } />

            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/remainders" element={<VanishList />} /> 
            <Route path="/gardening-tips" element={<CardSelection />} /> 

          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
