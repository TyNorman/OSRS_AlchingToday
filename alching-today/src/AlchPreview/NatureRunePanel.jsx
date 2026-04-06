import React, { useState, useEffect } from 'react';
import './AlchPreview.css';

export default function NatureRunePanel({ natureRuneInfo }) {
  return (
    <div className="text-yellow-300 p-8 gap-2">
        {natureRuneInfo ? (
        <>
        <div className="bg-mist-500 rounded-lg shadow-lg p-6">
          <div className="h-32 flex items-center justify-center gap-4">
            <img className="scale-[2.0] drop-shadow-lg" src={natureRuneInfo.icon} alt={natureRuneInfo.name} />
            <h1 className="font-medium">{natureRuneInfo.name}</h1>
          </div>
          <p>GE Average Price: {natureRuneInfo.value ? natureRuneInfo.value.toLocaleString() : 'Loading...'}</p>
        </div>
        </>
        ) : (
        <p>Loading Nature Rune info...</p>
      )}
    </div>
  );
}