const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {children}
    </div>
  );
};

export default MainLayout;
