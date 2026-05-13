import React, { useState, useEffect } from 'react';
import ContentLoader, { Instagram  } from 'react-content-loader';
import './AlchPreview.css';

export default function AlchPreview({ item, natureRuneCost, alchsPerHour }) {  return (

    <div className="text-yellow-300">
      <div className="bg-taupe-500 rounded-lg shadow-lg p-4">
      {item ? (
        <>
          <div className="index-display">
            {item.index}
          </div>
          <div className="alch-item">
            <img className="drop-shadow-lg" src={item.icon} alt={item.name} />
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
        </>
      ) : (
        <>
        <ContentLoader
          speed={1}
          width={320}
          height={280}
          viewBox="0 0 320 280"
          backgroundColor="#2f2f2f"
          foregroundColor="#525252"
        >
          {/* Index badge */}
          <circle cx="280" cy="15" r="12" />
          
          {/* Item icon */}
          <circle cx="60" cy="70" r="40" />
          
          {/* Item name */}
          <rect x="110" y="50" rx="5" ry="5" width="160" height="20" />
          
          {/* Info lines */}
          <rect x="0" y="130" rx="5" ry="5" width="320" height="12" />
          <rect x="0" y="150" rx="5" ry="5" width="300" height="12" />
          <rect x="0" y="170" rx="5" ry="5" width="280" height="12" />
          <rect x="0" y="190" rx="5" ry="5" width="320" height="12" />
          <rect x="0" y="210" rx="5" ry="5" width="300" height="12" />
          <rect x="0" y="230" rx="5" ry="5" width="290" height="12" />
          <rect x="0" y="250" rx="5" ry="5" width="310" height="12" />
        </ContentLoader>
      </>
      )}
      </div>
    </div>
  );
}