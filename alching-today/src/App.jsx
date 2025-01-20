import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AlchPreview from './AlchPreview/AlchPreview.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
      <header className="App-header">
      <h1 className='text-6xl text-red-500 bg-blue-200'>
      Hello world!
      </h1>
        <p>
          <AlchPreview/>
        </p>
      </header>
    </div>
    </>
  )
}

export default App
