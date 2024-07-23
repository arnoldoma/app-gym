import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Components/Login';
import { RouterHome } from './Router/RouterHome';
import { RouterPrivate } from './Router/RouterPrivate';
import { Registrarse } from './Components/Registrarse';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/*"
            element={
              <RouterPrivate>
                <RouterHome />
              </RouterPrivate>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/registrarse" element={<Registrarse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
