import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Pages
import { Home } from './pages/Home/Home'
import { Libary } from './pages/Libary/Libary'


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/libary" element={<Libary/>} />
      </Routes>
    </BrowserRouter>
  );
}
