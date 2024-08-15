import { Outlet } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const MainLayout = () => {
  return (
    <SimpleBar style={{ maxHeight: "99vh" }}>
      <div className="max-w-[1000px] mx-auto px-2 sm:px-4">
        <Outlet />
      </div>
    </SimpleBar>
  );
};

export default MainLayout;
