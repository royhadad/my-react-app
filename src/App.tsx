import "./App.css";
import { ProgressBarPage } from "./pages/ProgressBarPage/ProgressBarPage.tsx";

function App() {
  return (
    <div className="h-full">
      <h1>This is my React playground!</h1>
      <h2>Try navigating between the pages :)</h2>
      <ProgressBarPage />
    </div>
  );
}

export default App;
