import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn/SignIn';
import Recovery from './pages/Auth/Recovery/Recovery'
import Main from './pages/Main/Main'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />}/>
      <Route path='/signin' element={<SignIn />}/>
      <Route path='/recovery' element={<Recovery />}/>
    </Routes>
  );
}

export default App;
