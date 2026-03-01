import { Outlet } from "react-router-dom";
import Navbar from "./src/components/Navbar";
import Footer from "./src/components/Footer";  

const MainLayout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
