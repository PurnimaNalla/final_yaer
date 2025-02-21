import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VideoSection from './components/VideoSection';
import About from './components/About';
import BoxCategories from './components/BoxCategories';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Location from './components/Location';
import Markets from './components/Markets';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Innovation from './components/Innovation';
import Slider from './components/Slider';
import Article1 from './components/Article1';
import Article2 from './components/Article2';
import Mockup from './components/Mockup';
const App = () => {
  const [currentView, setCurrentView] = useState('login');

  const handleSignUpSuccess = (data) => {
    console.log('Sign up successful:', data);
    setCurrentView('login');
  };

  const handleLoginSuccess = (data) => {
    console.log('Login successful:', data);
    // Handle login success (e.g., redirect to dashboard)
  };

  const renderAuthView = () => {
    switch (currentView) {
      case 'login':
        return (
          <Login 
            onSignUpClick={() => setCurrentView('signup')}
            onForgotPasswordClick={() => setCurrentView('forgotPassword')}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'signup':
        return (
          <SignUp 
            onBack={() => setCurrentView('login')}
            onSignUpSuccess={handleSignUpSuccess}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPassword 
            onBack={() => setCurrentView('login')}
          />
        );
      default:
        return <Login />;
    }
  };

  return (
    <Router>
      <div className="container mx-auto">
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <VideoSection />
                <Slider/>
                <BoxCategories />
                <Cards />
              </>
            } 
          />
          <Route path="/articles/parksons-mk-printpack-announcement" element={<Article1 />} />
        <Route path="/articles/smart-solutions-for-business" element={<Article2 />} />
          <Route path="/about" element={<About />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/location" element={<Location />} />
          <Route path="/innovation" element={<Innovation />} />
          <Route path="/mockup" element={<Mockup />} />
          <Route 
            path="/login" 
            element={renderAuthView()} 
          />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;