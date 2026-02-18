import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {

  return (

    <div className="h-screen flex bg-gray-50 text-gray-900">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>

    </div>

  );

};

export default MainLayout;
