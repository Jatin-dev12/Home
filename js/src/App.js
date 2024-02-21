import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Layout from './Layout'
import './App.css';
import Ai from './Pages/Ai'
import {useTranslation} from "react-i18next";
import Text from './Pages/Text';
import Trancribe from './Pages/Trancribe';
import TextToSpeech from './Pages/Tese';
import Side from './Pages/Side'

function App() {
  return (
    <BrowserRouter >

    <Routes>

      
      <Route path="/" element={<Layout />}>
        <Route index element={<Ai/>} />
        <Route path="ai" element={<Ai />}/>
        <Route path="tese" element={<TextToSpeech/>}/>
        <Route path="text" element={<Text/>}/>
        <Route path="trancribe" element={<Trancribe />}/>




        {/* <Route path="contact" element={<Contact />} /> */}
      </Route>
    
    </Routes>
  </BrowserRouter>
  );
}

export default App;