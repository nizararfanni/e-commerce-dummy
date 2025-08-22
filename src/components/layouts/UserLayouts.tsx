import { Outlet } from "react-router-dom";
import Header from "../fragments/home/Header";

const UserLayouts = () => {
  return (
    <div>
      <Header></Header>
      <main >
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default UserLayouts;
