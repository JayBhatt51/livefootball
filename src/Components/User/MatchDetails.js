
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Hls from 'hls.js';

const MatchDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const matchDetails = location.state; // Access passed match details
  const [matchUrl, setMatchUrl] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchMatchUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/match/${id}/link`);
        setMatchUrl(response.data.url);
      } catch (error) {
        console.error('Error fetching match URL:', error);
      }
    };
    fetchMatchUrl();
  }, [id]);

  useEffect(() => {
    if (matchUrl && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(matchUrl);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = matchUrl;
      }
    }
  }, [matchUrl]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-100 rounded-lg p-6 shadow-md mb-6">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Match Live Stream</h1>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold mb-2">{matchDetails.league}</h2>
          <p className="text-xl mb-4 text-gray-700">{matchDetails.date}</p>
          <div className="flex items-center justify-around mb-4">
            <div className="text-center">
              <img src={matchDetails.home_flag} alt={matchDetails.home_name} className="w-20 h-20 rounded-full mx-auto mb-2" />
              <p className="text-2xl font-medium">{matchDetails.home_name}</p>
            </div>
            <span className="text-2xl font-bold text-gray-600">vs</span>
            <div className="text-center">
              <img src={matchDetails.away_flag} alt={matchDetails.away_name} className="w-20 h-20 rounded-full mx-auto mb-2" />
              <p className="text-2xl font-medium">{matchDetails.away_name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black rounded-lg p-6 shadow-md">
        {matchUrl ? (
          <video
            ref={videoRef}
            controls
            className="mx-auto w-full max-w-2xl"
            style={{ backgroundColor: 'black' }}
          />
        ) : (
          <p className="text-center text-white">Loading stream...</p>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;
