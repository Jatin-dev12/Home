import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Layout from './Layout'
import './App.css';
import Ai from './Pages/Ai'

import Text from './Pages/Text';
import Trancribe from './Pages/Trancribe';

function App() {
  return (
    <BrowserRouter >

    <Routes>

      
      <Route path="/" element={<Layout />}>
        <Route index element={<Ai/>} />
        
        <Route path="Text" element={<Text/>}/>
        <Route path="Trancribe" element={<Trancribe />}/>




        {/* <Route path="contact" element={<Contact />} /> */}
      </Route>
    
    </Routes>
  </BrowserRouter>
  );
}

export default App;