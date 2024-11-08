import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [matches, setMatches] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshMessage, setRefreshMessage] = useState('');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/matches');
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setErrorMessage('Failed to load matches.');
    }
  };

  const adjustTime = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    const adjustedDate = new Date();
    adjustedDate.setHours(hour - 1, minute - 30);
    return adjustedDate;
  };

  const handleAdminRefresh = async () => {
    try {
      const response = await axios.post('http://localhost:3001/admin/fetch-and-store', { passcode });
      if (response.status === 200) {
        setErrorMessage('');
        setRefreshMessage('Matches updated successfully!');
        setIsPopupOpen(false);
        fetchMatches(); // Refresh matches on the page
      }
    } catch (error) {
      setErrorMessage('Unauthorized: Incorrect passcode');
    }
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setPasscode('');
    setErrorMessage('');
    setRefreshMessage('');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">Football Live Matches</h1>
      
      <button onClick={openPopup} className="bg-blue-600 text-white p-2 rounded mb-4">
        Refresh Matches (Admin)
      </button>
      
      {refreshMessage && (
        <p className="text-green-500 mb-4 text-center">{refreshMessage}</p>
      )}

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-bold mb-4">Admin Passcode</h2>
            <input
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <button onClick={handleAdminRefresh} className="bg-blue-600 text-white p-2 rounded w-full">
              Submit
            </button>
            <button onClick={closePopup} className="mt-4 text-gray-500 underline">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {matches.map((match) => (
          <div key={match._id} className="bg-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-center mb-4 text-gray-600">
              <span className="font-semibold text-lg">{match.league}</span>
              <span>{match.date}</span>
            </div>
            <div className="flex items-center justify-around mb-4">
              <div className="text-center">
                <img src={match.home_flag} alt={match.home_name} className="w-16 h-16 mb-2 rounded-full" />
                <p className="text-xl font-semibold">{match.home_name}</p>
              </div>
              <span className="text-xl font-bold text-gray-600">vs</span>
              <div className="text-center">
                <img src={match.away_flag} alt={match.away_name} className="w-16 h-16 mb-2 rounded-full" />
                <p className="text-xl font-semibold">{match.away_name}</p>
              </div>
            </div>
            <div className="text-center mb-6">
              <p className="text-xl font-semibold text-blue-600">
                {adjustTime(match.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <Link to={`/match/${match.id}`} state={match}>
              <button
                className="w-full py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
              >
                Watch Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
