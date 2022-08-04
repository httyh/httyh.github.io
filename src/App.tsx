import { HashRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login'
import Memorial from './pages/memorial'
import Calendar from './pages/calendar'
import CalendarDetail from './pages/calendar/detail'

export default function App(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Login />} />
          <Route path='memorial' element={<Memorial />} />
          <Route path='calendar'>
            <Route index element={<Calendar />} />
            <Route path='detail' element={<CalendarDetail />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}
