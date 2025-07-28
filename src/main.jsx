import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import App from './App.jsx'
import Dashboard from './Dashboard.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App></App>}></Route>
      <Route path='dashboard' element={<Dashboard/>}></Route>
  </Routes>
  </BrowserRouter>
)
