import React from 'react';
import { countryCodes } from '../../constants/countryCodes';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

export function PhoneInput({ value, onChange, disabled, required }: PhoneInputProps) {

  const [countryCode, localNumber] = value.startsWith('+')
    ? [value.slice(0, 3), value.slice(3)] 
    : ['+91', value]; 


  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(`${e.target.value} ${localNumber}`);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(`${countryCode} ${e.target.value}`);
  };

  return (
    <div className="flex gap-2">
      <select
        value={countryCode}
        onChange={handleCountryChange}
        disabled={disabled}
        className="px-2 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white w-24"
      >
        {countryCodes.map(({ code, name }) => (
          <option key={code} value={code}>
            {code} {name}
          </option>
        ))}
      </select>
      <input
        type="tel"
        value={localNumber}
        onChange={handleNumberChange}
        placeholder="Phone number"
        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-44"
        disabled={disabled}
        required={required}
      />
    </div>
  );
}