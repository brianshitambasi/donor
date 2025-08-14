import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

// import React, { useState } from 'react';

const Settings = () => {
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('en');
    const [privacyLevel, setPrivacyLevel] = useState('medium');
    const navigate = useNavigate();
  
    const handleGoogleSearch = () => {
      window.open('https://www.google.com', '_blank');
    };
  
    const handleThemeChange = (newTheme) => {
      setTheme(newTheme);
      document.documentElement.className = newTheme === 'dark' ? 'dark' : '';
    };
  
    const handleLanguageChange = (e) => {
      setLanguage(e.target.value);
    };
  
    const handlePrivacyChange = (e) => {
      setPrivacyLevel(e.target.value);
    };
  
    const handleSystemReset = () => {
      if (window.confirm('Are you sure you want to reset all settings?')) {
        setTheme('light');
        setLanguage('en');
        setPrivacyLevel('medium');
        document.documentElement.className = '';
        alert('System settings have been reset.');
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <button 
              onClick={() => navigate(-1)} 
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
            >
              Back
            </button>
          </div>
  
          {/* Rest of your settings UI remains the same */}
          {/* ... */}
        </div>
      </div>
    );
  };
  
  export default Settings;