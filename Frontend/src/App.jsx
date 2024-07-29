import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp  from './components/SignUp'
import SignIn from './components/SignIn';
import AppBar from './components/AppBar'
import Todo from './components/Todo';
import Landing from './components/Landing'
const App = () => {
  return (
    <div className='main-body'>
        <Router>
          <AppBar/>
          <Routes>
            <Route path={"/"} element={<Landing/>}/>
            <Route path={"/todo"} element={<Todo/>}/>
            <Route path={"/auth/login"} element={<SignIn/>}/>
            <Route path={"/auth/signup"} element={<SignUp/>}/>
          </Routes>
        </Router>
    </div>
  )
}

export default App
