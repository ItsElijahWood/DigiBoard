import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import Privacy from './Privacy.js';
import Login from './Login.js';
import Register from './Register.js';
import Noticeboard from './Noticeboard.js';
import Noticeboard_2 from "./Noticeboard_2.js";
import Noticeboard_3 from "./Noticeboard_3.js";
import Noticeboard_4 from "./Noticeboard_4.js";
import Content from './Content.js';
import { Config } from './Conf.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='/privacy' element={<Privacy />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/noticeboard' element={<Noticeboard />}></Route>
      <Route path='/noticeboard/content' element={<Content />}></Route>
      <Route path='/noticeboard/conf' element={<Config />}></Route>
      <Route path='/noticeboard_2' element={<Noticeboard_2 />}></Route>
      <Route path='/noticeboard_3' element={<Noticeboard_3 />}></Route>
      <Route path='/noticeboard_4' element={<Noticeboard_4 />}></Route>
    </Routes>
  </Router>
);

reportWebVitals();
