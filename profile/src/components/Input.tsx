import React from 'react';
// No react-native imports
// No StyleSheet.create

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        className={`text-input ${error ? 'error' : ''} ${className || ''}`}
        {...props}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Input;