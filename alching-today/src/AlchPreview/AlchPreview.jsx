import React, { useState, useEffect } from 'react';
import './AlchPreview.css';

export default function AlchPreview({ item }) {
  return (
    <div className="text-yellow-300 p-8 gap-2">
      {item ? (
        <>
        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
          <div className="h-32 flex items-center justify-center gap-4">
            <img className="scale-[2.0] drop-shadow-lg" src={item.icon} alt={item.name} />
            <h1 className="font-medium">{item.name}</h1>
          </div>
          <p>High Alch Value: {item.high_alch}</p>
          <p>GE Average Price: {item.value_high}</p>
          <p>Daily Profit: {item.daily_profit}</p>
          <p>Trade Limit: {item.trade_limit}</p>
          <p>Trade Volume: NEED TO CALC THIS</p>
        </div>
        </>
      ) : (
        <p>Loading best item...</p>
      )}
    </div>
  );
}