import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import {
  deleteProfileStart,
  deleteProfileSuccess,
  deleteProfileFailure,
  loadProfileIntoDraft,
  clearDraft,
} from '../store/profilesSlice';
import type { RootStackParamList, Profile } from '../types';
import { simulateAsyncAction } from '../utils/asyncSim';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profiles, isLoading } = useAppSelector((state) => state.profiles);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      dispatch(deleteProfileStart());
      try {
        simulateAsyncAction()
          .then(() => {
            dispatch(deleteProfileSuccess(id));
          })
          .catch((error) => {
            dispatch(deleteProfileFailure('Failed to delete profile.'));
            window.alert('Error: Failed to delete profile.');
          });
      } catch (error) {
        dispatch(deleteProfileFailure('Failed to delete profile.'));
        window.alert('Error: Failed to delete profile.');
      }
    }
  };

  const handleEdit = (profile: Profile) => {
    dispatch(loadProfileIntoDraft(profile));
    navigate(`/basic-info/${profile.id}`);
  };

  const renderProfileItem = (item: Profile) => (
    <div key={item.id} className="profileCard">
      {item.avatar && <img src={item.avatar} alt="Avatar" className="profileAvatar" />}
      <p className="profileName">{item.fullName}</p>
      <p className="profileDetail">Email: {item.email}</p>
      <p className="profileDetail">Age: {item.age}</p>
      <p className="profileDetail">
        Address: {item.city}, {item.state}, {item.country}
      </p>
      <div className="buttonsContainer">
        <button className="button editButton" onClick={() => handleEdit(item)}>
          Edit
        </button>
        <button className="button deleteButton" onClick={() => handleDelete(item.id)}>
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="container">
      {isLoading && (
        <div className="loadingOverlay">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      <Link
        to="/basic-info"
        className="addButton"
        onClick={() => {
          dispatch(clearDraft());
        }}
      >
        <span className="addButtonText">+ Add Profile</span>
      </Link>

      {profiles.length === 0 ? (
        <p className="noProfilesText">No profiles created yet. Click "Add Profile" to get started!</p>
      ) : (
        <div className="listContent">{profiles.map(renderProfileItem)}</div>
      )}
    </div>
  );
};

export default HomeScreen;
