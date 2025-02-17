import { Outlet } from "react-router-dom";
import "simplebar-react/dist/simplebar.min.css";
import "react-lazy-load-image-component/src/effects/blur.css";

const MainLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
