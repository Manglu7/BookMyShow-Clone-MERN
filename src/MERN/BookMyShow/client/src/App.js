import logo from './logo.svg';
import './App.css';
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import ProtectedRoute from "./components/ProtectedRoute";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from './redux/store';
import Admin from './pages/admin';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
