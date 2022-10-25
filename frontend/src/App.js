import "./styles/App.scss";
import { Route, Routes, Outlet } from "react-router-dom";
//components
import PageContainer from "./components/Containers/PageContainer";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import MainContainer from "./components/Containers/MainContainer";
//pages
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <PageContainer optionClass={"pageContainer"}>
        <Navbar />
        <div className="mobileMenu">
          <MobileNavbar />
        </div>
        <Routes>
          {/* Auth Page */}
          <Route path="/auth" element={<Auth />} />
          {/* Protected Routes */}
          <Route elemment={<Outlet />}>
            {/* Home */}
            <Route path="/" element={<Home />} />
            {/* 404 */}
            <Route
              path="/*"
              element={
                <MainContainer>
                  <span style={{ fontSize: "1.2rem" }}>404 Page Not Found</span>
                </MainContainer>
              }
            />
          </Route>
        </Routes>
      </PageContainer>
    </div>
  );
}

export default App;
