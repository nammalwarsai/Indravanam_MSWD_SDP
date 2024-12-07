import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import ShuffleHero from './Components/ShuffleHero';
import ShuffleHero2 from './Components/ShuffleHero2';
import ShuffleHero3 from './Components/ShuffleHero3';
import { ThemeProvider } from './Components/ThemeContext';
import SlideTabsExample from './Components/SlideTabsExample';
import { AboutUs } from './Components/AboutUs';
import VanishList from './Components/VanishList';
import CardSelection from './Components/CardSelection';
import SeeWeather from './Components/SeeWeather';
import Community from './Components/Community';
import Footer from './Components/Footer';
import GardenPlanner from './Components/GardenPlanner';
import LoginSignup from './Components/LoginSignup';
import Chatbot from './Components/Chatbot';
import MailUs from './Components/MailUs';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false); // Clear authentication state
  };

  return (
    <Router>
      <ThemeProvider>
        <div className="App">
          {/* Show Navbar with Logout only when authenticated */}
          {isAuthenticated && <SlideTabsExample onLogout={handleLogout} />}
          <Routes>
            {/* Default Route */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <>
                    <ShuffleHero />
                    <ShuffleHero2 />
                    <ShuffleHero3 />
                    <MailUs/>
                    <Footer />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Login Route */}
            <Route
              path="/login"
              element={
                <LoginSignup
                  onAuthenticate={() => setIsAuthenticated(true)}
                />
              }
            />

            {/* Other Routes with Authentication Check */}
            <Route
              path="/about-us"
              element={
                isAuthenticated ? <AboutUs /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/remainders"
              element={
                isAuthenticated ? <VanishList /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/gardening-tips"
              element={
                isAuthenticated ? (
                  <CardSelection />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/See-Weather"
              element={
                isAuthenticated ? <SeeWeather /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/Community"
              element={
                isAuthenticated ? <Community /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/GardenPlanner"
              element={
                isAuthenticated ? (
                  <GardenPlanner />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
             <Route
              path="/chatbot"
              element={
                isAuthenticated ? <Chatbot /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/MailUs"
              element={
                isAuthenticated ? <MailUs/> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
