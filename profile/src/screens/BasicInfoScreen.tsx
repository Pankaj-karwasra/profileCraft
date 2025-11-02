import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setDraftBasicInfo, clearDraft, loadProfileIntoDraft } from '../store/profilesSlice';
import Input from '../components/Input';
import type { Profile } from '../types';

const BasicInfoScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profileId } = useParams<{ profileId?: string }>();
  const draftProfile = useAppSelector((state) => state.profiles.draftProfile);
  const profiles = useAppSelector((state) => state.profiles.profiles);

  const [fullName, setFullName] = useState(draftProfile?.fullName || '');
  const [email, setEmail] = useState(draftProfile?.email || '');
  const [age, setAge] = useState<string | number>(draftProfile?.age || '');
  const [avatar, setAvatar] = useState<string | undefined>(draftProfile?.avatar || undefined);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (profileId && !draftProfile) {
      const profileToEdit = profiles.find(p => p.id === profileId);
      if (profileToEdit) {
        dispatch(loadProfileIntoDraft(profileToEdit));
      } else {
        window.alert("Profile not found!");
        navigate('/');
      }
    } else if (draftProfile) {
      setFullName(draftProfile.fullName);
      setEmail(draftProfile.email);
      setAge(draftProfile.age);
      setAvatar(draftProfile.avatar);
    } else {
      setFullName('');
      setEmail('');
      setAge('');
      setAvatar(undefined);
      dispatch(clearDraft());
    }
  }, [draftProfile, profileId, profiles, dispatch, navigate]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!age || age === '') {
      newErrors.age = 'Age is required.';
    } else if (isNaN(Number(age)) || Number(age) <= 0 || Number(age) > 120) {
      newErrors.age = 'Age must be a valid number between 1 and 120.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      dispatch(
        setDraftBasicInfo({
          fullName,
          email,
          age: Number(age),
          avatar,
        })
      );
      navigate('/address-info');
    } else {
      window.alert("Validation Error: Please correct the errors in the form.");
    }
  };

  return (
    <div className="container">
      <h2>Basic Info</h2>

      <div className="avatar-upload">
        {avatar ? (
          <img src={avatar} alt="Avatar" className="avatar-preview" />
        ) : (
          <div className="avatar-placeholder">No Image</div>
        )}
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />
      </div>

      <Input
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        error={errors.fullName}
      />
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        error={errors.email}
      />
      <Input
        label="Age"
        value={String(age)}
        onChange={(e) => setAge(e.target.value.replace(/[^0-9]/g, ''))}
        type="number"
        error={errors.age}
      />
      <div className="button-group">
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default BasicInfoScreen;
