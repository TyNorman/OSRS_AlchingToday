import React, { useState, useEffect } from 'react';
import './AlchPreview.css';

export default function AlchPreview({ item, natureRuneCost, alchsPerHour }) {  return (

    <div className="text-yellow-300">
      {item ? (
        <>
        <div className="bg-taupe-500 rounded-lg shadow-lg p-4">
          <div className="index-display">
            {item.index}
          </div>
          <div className="alch-item">
            <img className="scale-[2.0] drop-shadow-lg" src={item.icon} alt={item.name} />
            <h1 className="font-medium">{item.name}</h1>
          </div>
          <div className="alch-info">
            <p>High Alch Value: {item.high_alch.toLocaleString()}</p>
            <p>GE Average Price: {item.value_high.toLocaleString()}</p>
            <p>Profit per Alch: <span className="text-emerald-300">{(item.high_alch - item.value_high - natureRuneCost).toLocaleString() || 0}</span> </p>

            <p>Profit per Hour: <span className="text-emerald-300">
                {alchsPerHour < item.trade_limit ? ((item.high_alch - item.value_high - natureRuneCost) * alchsPerHour).toLocaleString() : ((item.high_alch - item.value_high - natureRuneCost) * item.trade_limit).toLocaleString()}
                </span>
              </p>

            <p>Profit at Daily Limit: <span className="text-emerald-300">{item.daily_profit.toLocaleString()}</span></p>
            <p>Trade Limit: {item.trade_limit.toLocaleString()}</p>
            <p>Trade Volume: {item.volume.toLocaleString()}</p>
          </div>
        </div>
        </>
      ) : (
        <p>Loading best item...</p>
      )}
    </div>
  );
}