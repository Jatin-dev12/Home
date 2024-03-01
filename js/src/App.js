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
import Sst from './Pages/Sst'
import Ti from './Pages/Ti'

function App() {
  return (
    <BrowserRouter basename='/ai' >

    <Routes>

      
      <Route path="/" element={<Layout />}>
        <Route index element={<Sst />} />
        <Route path="test" element={<Test />}/>
        <Route path="tese" element={<TextToSpeech/>}/>
        <Route path="text" element={<Text/>}/>
        <Route path="trancribe" element={<Trancribe />}/>
        <Route path="Chlo" element={<Chlo />}/>
        <Route path="sst" element={<Sst />}/>
        <Route path='bg' element={<Bg />} />
        <Route path='ti' element={<Ti />} />








        {/* <Route path="contact" element={<Contact />} /> */}
      </Route>
    
    </Routes>
  </BrowserRouter>
  );
}

export default App;