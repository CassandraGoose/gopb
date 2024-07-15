import { Routes, Route } from "react-router-dom";
import MainView from "./MainView/MainView.tsx";
import Navigation from "./Navigation/Navigation.tsx";
import AboutView
 from "./AboutView/AboutView.tsx";
function App() {
  return (
    <>
      <Navigation />
      <div className="px-8 mt-4">
        <Routes>
          <Route index element={<MainView />} />
          <Route path="/about" element={<AboutView />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
