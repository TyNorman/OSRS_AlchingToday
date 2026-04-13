import React, { useState, useEffect } from 'react';
import './InfoPanel.css';

export default function InfoPanel() {

  return (
    <div className="info-panel text-yellow-300 border-yellow-300 rounded-lg shadow-lg border-2 border-solid p-4">
        <h1>About the Site</h1>
        <p>I created this site to use my background in Game Development to demonstrate working with the Old School Runescape Wiki's API on Grand Exchange data.</p>
        <p>You can switch between sorting by high profit volumes (alching a lot over time) or sorting by value (for daily short term alching sessions).</p>
        <p>You can also set your estimated alchs per hour, with tick-perfect typically being about 1200 alchs/hour.</p>
    </div>
  );
}