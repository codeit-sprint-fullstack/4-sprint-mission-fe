import { BrowserRouter, Route, Routes } from "react-router-dom";

export function Router() {
  return (
    <div className="router_container">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;