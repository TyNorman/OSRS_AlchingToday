import React, { useState, useEffect } from 'react';
import './AlchPreview.css';

export default function AlchPreview({ bestItem, itemName, itemIcon, highAlch, valueHigh }) {
  return (
    <div className="text-yellow-300 p-8 gap-2">
      {bestItem ? (
        <>
        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
          <div className="h-32 flex items-center justify-center gap-4">
            <img className="scale-[2.0] drop-shadow-lg" src={itemIcon} alt={itemName} />
            <h1 className="font-medium">{itemName}</h1>
          </div>
          <p>High Alch Value: {highAlch}</p>
          <p>GE Average Price: {valueHigh}</p>
          <p>Daily Profit: {bestItem.daily_profit}</p>
          <p>Trade Limit: {bestItem.trade_limit}</p>
          <p>Trade Volume: {bestItem.volume}</p>
        </div>
        </>
      ) : (
        <p>Loading best item...</p>
      )}
    </div>
  );
}