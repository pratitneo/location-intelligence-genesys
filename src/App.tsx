import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.scss'
import Login from './pages/login/login'
import Layout from './components/layout/layout'
import Profile from './pages/profile/profile'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} />
          <Route path='/profile' element={<Profile userName='aditya' fullName='aditya shah' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
