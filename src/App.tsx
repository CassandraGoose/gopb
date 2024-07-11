import {
  Routes, Route
} from "react-router-dom";
import "./App.css";
import MainView from "./MainView/MainView.tsx";
import Navigation from "./Navigation/Navigation.tsx";

function App() {
  
  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<MainView />} />
      </Routes>
    </>
  );
}

export default App;
