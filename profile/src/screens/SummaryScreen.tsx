import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { addProfileStart, addProfileSuccess, addProfileFailure, clearDraft } from '../store/profilesSlice';
import { simulateAsyncAction } from '../utils/asyncSim';


const SummaryScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { draftProfile, isLoading, error } = useAppSelector((state) => state.profiles);

  const handleSubmit = async () => {
    if (!draftProfile) {
      window.alert("Error: No profile data to submit. Please start a new profile.");
      navigate('/'); 
      return;
    }

    dispatch(addProfileStart());
    try {
      await simulateAsyncAction(); 
      dispatch(addProfileSuccess()); 
      navigate('/'); 
      window.alert("Success: Profile saved successfully!");
    } catch (err) {
      dispatch(addProfileFailure("Failed to save profile."));
      window.alert(`Error: ${error || "Failed to save profile."}`);
    }
  };

  if (!draftProfile) {
    return (
      <div className="container">
        <p className="error-text">No draft profile found. Please go back and fill out the form.</p>
        <button onClick={() => navigate('/basic-info')}>Go to Basic Info</button>
      </div>
    );
  }

  return (
    <div className="container">
      {isLoading && (
        <div className="loadingOverlay">
          <div className="spinner"></div> 
          <p className="loadingText">Saving Profile...</p>
        </div>
      )}
      <h2 className="header">Profile Summary</h2>

      <div className="summaryCard">
        <p className="summaryLabel">Full Name:</p>
        <p className="summaryValue">{draftProfile.fullName}</p>

        <p className="summaryLabel">Email:</p>
        <p className="summaryValue">{draftProfile.email}</p>

        <p className="summaryLabel">Age:</p>
        <p className="summaryValue">{draftProfile.age}</p>

        <p className="summaryLabel">City:</p>
        <p className="summaryValue">{draftProfile.city}</p>

        <p className="summaryLabel">State:</p>
        <p className="summaryValue">{draftProfile.state}</p>

        <p className="summaryLabel">Country:</p>
        <p className="summaryValue">{draftProfile.country}</p>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="button-group">
        <button onClick={() => navigate('/basic-info')} disabled={isLoading}>Edit</button>
        <button onClick={handleSubmit} disabled={isLoading}>Submit</button>
      </div>
    </div>
  );
};


export default SummaryScreen;