import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn/SignIn';
import Recovery from './pages/Auth/Recovery/Recovery'
import Main from './pages/Main/Main'
import { Context } from './index';
import { useContext, useState, useEffect } from 'react';
import {observer} from 'mobx-react-lite'
import { check } from './http/UserApi';

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    })
    .catch(err => user.setIsAuth(false))
    .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return 'Loading'
  }
  return (
    <Routes>
      <Route path='/' element={<Main />}/>
      <Route path='/signin' element={<SignIn />}/>
      <Route path='/recovery' element={<Recovery />}/>
    </Routes>
  );
})

export default App;
