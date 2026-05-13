import React, { useState, useEffect } from 'react';
import ContentLoader, { Instagram  } from 'react-content-loader';
import './NatureRunePanel.css';

export default function NatureRunePanel({ natureRuneInfo, alchsPerHour, onAlchsPerHourChange, onSortChange }) {

  const handleDropdown = (event) => {
    const selectedValue = event.target.value;
    console.log("Selected:", selectedValue);
    onSortChange(selectedValue);
  };

  return (
      <div className="nature-rune-panel text-yellow-300 bg-taupe-500 rounded-lg shadow-lg">
        {natureRuneInfo ? (
        <>
          <div className="nature-rune">
            <img className="drop-shadow-lg" src={natureRuneInfo.icon} alt={natureRuneInfo.name} />
            <div className="nature-rune-text">
              <h1 className="font-medium">{natureRuneInfo.name}</h1>
              <p className="nature-rune-price">
                GE Average Price: {natureRuneInfo.value ? natureRuneInfo.value.toLocaleString() : 'Loading...'}
              </p>
            </div>
          </div>
          <div className="input-alchs-per-hour">
            <p>Alchs Per Hour:</p>
            <input className="input-box" name="alchsPerHour" className="alchs-per-hour-input bg-taupe-600" type="number" min="0" max="1300" value={alchsPerHour} onChange={onAlchsPerHourChange} />
          </div>
          <div className="input-alchs-per-hour">
          <p>Sorting method:</p>
          <select onChange={handleDropdown} className="input-box bg-taupe-600 p-2 rounded">
              <option value="profitVolume">Profit by Volume </option>
              <option value="profitValue">Profit by Value</option>
            </select>
          </div>
        </>
        ) : (
        <>
          <ContentLoader
            speed={1}
            width={380}
            height={180}
            viewBox="0 0 380 180"
            backgroundColor="#2f2f2f"
            foregroundColor="#525252"
          >
            <circle cx="50" cy="50" r="30" />
            <rect x="100" y="25" rx="5" ry="5" width="220" height="20" />
            <rect x="100" y="55" rx="5" ry="5" width="180" height="12" />
            <rect x="0" y="110" rx="5" ry="5" width="380" height="15" />
            <rect x="0" y="135" rx="5" ry="5" width="280" height="15" />
          </ContentLoader>
        </>
      )}
      </div>
  );
}