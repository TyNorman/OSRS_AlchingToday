import React, { useState, useEffect } from 'react';
import './AlchPreview.css';

export default function NatureRunePanel({ natureRuneInfo, alchsPerHour, onAlchsPerHourChange, onSortChange }) {

  const handleDropdown = (event) => {
    const selectedValue = event.target.value;
    console.log("Selected:", selectedValue);
    onSortChange(selectedValue);
  };

  return (
    <div className="nature-rune-panel text-yellow-300">
        {natureRuneInfo ? (
        <>
        <div className="bg-taupe-500 rounded-lg shadow-lg p-6">
          <div className="nature-rune p-6">
            <img className="scale-[2.0] drop-shadow-lg" src={natureRuneInfo.icon} alt={natureRuneInfo.name} />
            <h1 className="font-medium">{natureRuneInfo.name}</h1>
            <p>GE Average Price: {natureRuneInfo.value ? natureRuneInfo.value.toLocaleString() : 'Loading...'}</p>
          </div>
          <div className="input-alchs-per-hour">
            <p>Alchs Per Hour:</p>
            <input name="alchsPerHour" className="alchs-per-hour-input bg-taupe-600" type="number" min="0" max="1300" value={alchsPerHour} onChange={onAlchsPerHourChange} />
          </div>
          <div className="input-alchs-per-hour">
            <p>Sorting method:</p>
            <select onChange={handleDropdown} className="sort-dropdown bg-taupe-600 p-2 rounded mt-4">
              <option value="profitVolume">Profit by Volume </option>
              <option value="profitValue">Profit by Value</option>
            </select>
          </div>
        </div>
        </>
        ) : (
        <p>Loading Nature Rune info...</p>
      )}
    </div>
  );
}