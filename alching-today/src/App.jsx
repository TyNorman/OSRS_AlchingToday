import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AlchPreview from './AlchPreview/AlchPreview.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-400 to-slate-800">
      <header>
        <p>
          <AlchPreview/>
        </p>
      </header>
    </div>
    </>
  )
}

export default App
