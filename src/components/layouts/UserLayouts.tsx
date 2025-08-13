import { Outlet } from "react-router-dom";
import Header from "../fragments/home/Header";

const UserLayouts = () => {
  return (
    <div>
      <Header></Header>
      <main className="pt-20">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default UserLayouts;
