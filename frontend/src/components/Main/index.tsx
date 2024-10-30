import React from 'react';
import Tracks from '../Tracks';
import Playlist from '../Playlist';
import Favorite from '../Favorite';
import { Route, Routes } from 'react-router-dom';

export const Main: React.FC = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Tracks />} />
        <Route path="/playlists" element={<Playlist />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </main>
  );
};

export default Main;