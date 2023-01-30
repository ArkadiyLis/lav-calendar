import './App.css';
import Calendar from "./components/Calendar";
import Planner from "./components/Planner";
import Modal from "./components/Modal";

function App() {
  return (
    <div className="App">
        <Planner/>
        <Modal/>
    </div>
  );
}

export default App;
