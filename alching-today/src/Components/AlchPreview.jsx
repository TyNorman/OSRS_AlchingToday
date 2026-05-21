import React, { useState, useEffect } from 'react';
import ContentLoader, { Instagram  } from 'react-content-loader';
import './AlchPreview.css';

export default function AlchPreview({ item, natureRuneCost, alchsPerHour }) {

  let isMobile = false;
  if ( window.innerWidth <= 800)
    isMobile = true;

  const loaderWidth = isMobile ? 150 : 320;
  const loaderHeight = isMobile ? 200 : 280;
  const loaderViewBox = isMobile ? "0 0 280 240" : "0 0 320 280";
  const iconRadius = isMobile ? 30 : 40;
  const loaderInfoStart = isMobile ? 120 : 120;

  return (
    <div className="alch-panel bg-taupe-500 rounded-lg shadow-lg">
      {item ? (
        <>
          <div className="index-display text-yellow-300">
            {item.index}
          </div>
          <div className="alch-item text-yellow-300">
            <img className="drop-shadow-lg" src={item.icon} alt={item.name} />
            <h1 className="font-medium ">{item.name}</h1>
          </div>
          <div className="alch-info text-yellow-300">
            <p>High Alch Value: {item.high_alch?.toLocaleString() || 'N/A'}</p>
            <p>GE Average Price: {item.value_high?.toLocaleString() || 'N/A'}</p>
            <p>Profit per Alch: <span className="text-emerald-300">{item.high_alch && item.value_high ? (item.high_alch - item.value_high - natureRuneCost).toLocaleString() : 'N/A'}</span> </p>
            <p>Profit per Hour: <span className="text-emerald-300">
                {alchsPerHour < item.trade_limit ? ((item.high_alch - item.value_high - natureRuneCost) * alchsPerHour).toLocaleString() : ((item.high_alch - item.value_high - natureRuneCost) * item.trade_limit).toLocaleString()}
                </span>
              </p>
            <p>Profit at Daily Limit: <span className="text-emerald-300">{item.daily_profit?.toLocaleString() || 'N/A'}</span></p>
            <p>Trade Limit: {item.trade_limit?.toLocaleString() || 'N/A'}</p>
            <p>Trade Volume: {item.volume?.toLocaleString() || 'N/A'}</p>
          </div>
        </>
      ) : (
        <>
        <ContentLoader
          speed={1}
          width="90%"
          height="90%"
          viewBox={loaderViewBox}
          backgroundColor="#2f2f2f"
          foregroundColor="#525252"
        >
          {/* Item icon */}
          <circle cx="20%" cy="15%" r={iconRadius} />
          {/* Item name */}
          <rect x="40%" y="15%" rx="5" ry="5" width={loaderWidth * 0.5} height="20" />
          {/* Info lines */}
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x="10%" y={loaderInfoStart + i * 20} rx="5" ry="5" width={loaderWidth * 0.75}  height="12"
            />
          ))}

        </ContentLoader>
      </>
      )}
    </div>
  );
}