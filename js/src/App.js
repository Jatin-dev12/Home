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
import Chlo from './Pages/Chlo'
import Test from './Pages/Test'
import Bg from './Pages/Bg'

function App() {
  return (
    <BrowserRouter basename='/ai' >

    <Routes>

      
      <Route path="/" element={<Layout />}>
        <Route index element={<Trancribe />} />
        <Route path="ai" element={<Ai />}/>
        <Route path="tese" element={<TextToSpeech/>}/>
        <Route path="text" element={<Text/>}/>
        <Route path="trancribe" element={<Trancribe />}/>
        <Route path="Chlo" element={<Chlo />}/>
        <Route path="test" element={<Test />}/>
        <Route path='bg' element={<Bg />} />








        {/* <Route path="contact" element={<Contact />} /> */}
      </Route>
    
    </Routes>
  </BrowserRouter>
  );
}

export default App;