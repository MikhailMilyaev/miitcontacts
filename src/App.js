import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn/SignIn';
import Recovery from './pages/Auth/Recovery/Recovery';
import Main from './pages/Main/Main';
import { Context } from './index';
import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ActivatePage from './pages/Auth/Activate/ActivatePage';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      parsedUser.role = parsedUser.role.toUpperCase()
      user.setUser(parsedUser);
      user.setIsAuth(true);
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return <div style={{ padding: 20 }}>Загрузка...</div>; // ⏳ или Loader
  }

  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/activation' element={<ActivatePage />} />
      <Route path='/recovery' element={<Recovery />} />
    </Routes>
  );
});

export default App;
