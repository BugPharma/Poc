import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Upload from "./routes/upload";
import Result from "./routes/result"
import './index.css';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="upload" element={<Upload />} />
      <Route path="result" element={<Result />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);