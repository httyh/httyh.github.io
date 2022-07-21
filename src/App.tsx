import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login'
import Memorial from './pages/memorial'
import Calendar from './pages/calendar'

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Login />} />
          <Route path='memorial' element={<Memorial />} />
          <Route path='calendar' element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
