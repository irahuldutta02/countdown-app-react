import "./App.css";
import { CountDown } from "./components/CountDown";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <CountDown />
      <ToastContainer />
    </>
  );
}

export default App;
