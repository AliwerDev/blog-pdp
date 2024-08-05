import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="max-w-[900px] mx-auto px-2 sm:px-4">
      <Outlet />
    </div>
  );
};

export default MainLayout;
