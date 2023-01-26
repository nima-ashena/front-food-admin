import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';

import './style.css';
import RoutesHandle from './handle.routes';
import { ToastContainer } from 'react-toastify';

function App() {

   return (
      <>
         <Header />
         <RoutesHandle />
         <ToastContainer />
      </>
   );
}

export default App;
