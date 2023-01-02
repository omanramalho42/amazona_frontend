import React from 'react'
import { 
  BrowserRouter,
  Route,
  Routes 
} from 'react-router-dom'

import { 
  Header, 
  ListProducts 
} from './components'

import Home from './screens/Home'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App
