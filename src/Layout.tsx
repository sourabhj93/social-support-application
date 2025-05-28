import { Outlet } from "react-router-dom";
import NavHeader from "./components/NavHeader";

export default function Layout() {
  return (
    <div>
      <NavHeader />
      <main className="pt-12 px-4">
        <Outlet />
      </main>
    </div>
  );
}
