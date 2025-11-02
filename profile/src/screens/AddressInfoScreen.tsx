import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setDraftAddressInfo } from '../store/profilesSlice';
import Input from '../components/Input';



const AddressInfoScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const draftProfile = useAppSelector((state) => state.profiles.draftProfile);

  const [city, setCity] = useState(draftProfile?.city || '');
  const [state, setState] = useState(draftProfile?.state || '');
  const [country, setCountry] = useState(draftProfile?.country || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (draftProfile) {
      setCity(draftProfile.city);
      setState(draftProfile.state);
      setCountry(draftProfile.country);
    }
  }, [draftProfile]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!city.trim()) newErrors.city = 'City is required.';
    if (!state.trim()) newErrors.state = 'State is required.';
    if (!country.trim()) newErrors.country = 'Country is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      dispatch(
        setDraftAddressInfo({
          city,
          state,
          country,
        })
      );
      navigate('/summary'); 
    } else {
      window.alert("Validation Error: Please correct the errors in the form."); 
    }
  };

  return (
    <div className="container">
      <h2>Address Info</h2>
      <Input
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        error={errors.city}
      />
      <Input
        label="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        error={errors.state}
      />
      <Input
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        error={errors.country}
      />
      <div className="button-group">
        <button onClick={() => navigate(-1)}>Back</button> 
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};



export default AddressInfoScreen;