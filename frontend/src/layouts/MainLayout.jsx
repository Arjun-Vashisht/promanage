import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      
      <Navbar />

      <div className="flex flex-1 bg-gray-100">
        {children}
      </div>

    </div>
  );
};

export default MainLayout;
