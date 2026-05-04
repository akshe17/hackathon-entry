import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Scanner from "./pages/Scanner";
import Diary from "./pages/Diary";
import Calendar from "./pages/Calendar";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <AuthLayout
              tagline={
                <>
                  Scan wise. <br /> Eat well. <br /> Feel better.
                </>
              }
            />
          }
        >
          <Route index element={<Login />} />
        </Route>
        <Route
          path="/register"
          element={
            <AuthLayout
              tagline={
                <>
                  Know What <br /> You Eat. <br /> Feel the <br /> Difference.
                </>
              }
            />
          }
        >
          <Route index element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="scan" element={<Scanner />} />
          <Route path="diary" element={<Diary />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
