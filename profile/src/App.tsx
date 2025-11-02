import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import BasicInfoScreen from './screens/BasicInfoScreen';
import AddressInfoScreen from './screens/AddressInfoScreen';
import SummaryScreen from './screens/SummaryScreen';

// Import the main CSS file
import './index.css'; // This should exist now

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/basic-info" element={<BasicInfoScreen />} />
          <Route path="/basic-info/:profileId" element={<BasicInfoScreen />} />
          <Route path="/address-info" element={<AddressInfoScreen />} />
          <Route path="/summary" element={<SummaryScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;