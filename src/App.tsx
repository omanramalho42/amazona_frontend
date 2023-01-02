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

import { Home, ProductScreen } from './screens'

import './App.css'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/product/:slug' element={<ProductScreen />}/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App
