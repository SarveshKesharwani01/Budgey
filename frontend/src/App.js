import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";

//components
import PageContainer from "./components/Containers/PageContainer";
import Navbar from "./components/Navbar/Navbar";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import MainContainer from "./components/Containers/MainContainer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthProvider";

//pages
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";

//react query
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./constants/config";

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PageContainer optionClass={"pageContainer"}>
            <Navbar />
            <div className="mobileMenu">
              <MobileNavbar />
            </div>
            <Routes>
              {/* Auth Page */}
              <Route path="/auth" element={<Auth />} />
              {/* Protected Routes */}
              <Route elemment={<ProtectedRoutes />}>
                {/* Home */}
                <Route path="/" element={<Home />} />
                {/* Settings */}
                <Route path="/settings" element={<Settings />} />
                {/* Profile */}
                <Route path="/profile" element={<Profile />} />
                {/* Transaction */}
                <Route path="/transactions" element={<Transactions />} />
                {/* Categories */}
                <Route path="/categories" element={<Categories />} />

                {/* 404 */}
                <Route
                  path="/*"
                  element={
                    <MainContainer>
                      <span style={{ fontSize: "1.2rem" }}>
                        404 Page Not Found
                      </span>
                    </MainContainer>
                  }
                />
              </Route>
            </Routes>
          </PageContainer>
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
