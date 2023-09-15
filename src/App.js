import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registrationform from './components/Registrationform';
import Nopage from './components/Nopage';
import Employeelist from './components/Employeelist';
import Updatepage from './components/Updatepage';
function App() {
  return (
   <>
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<Registrationform />} />
          <Route path="/employes" element={<Employeelist />} />
          <Route path="/update" element={<Updatepage />} />
          <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
