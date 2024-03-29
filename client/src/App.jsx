import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import path from "./utils/path";

import {
  AboutUs,
  Home,
  PublicLayout,
  Ouragents,
  Properties,
  Search,
} from "./pages/public";
import { Modal } from "./components";
import { useAppStore } from "./store/useAppStore";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from "./store/useUserStore";
import { AdminLayout, CreatePropertyType, Dashboard, ManagePropertyType } from "./pages/admin";

function App() {
  const { isShowModal } = useAppStore(); // lấy dữ liệu trong store của zuntand
  const {getCurrent,current,token} = useUserStore()
  useEffect(()=>{    // khi token thay đổi thì gọi tiếp
    getCurrent()
  },[token])

console.log(current);
  return (
    <div className="relative">
      {isShowModal && <Modal />} {/* isShowModal bằng true thì sẽ hiện modal */}
      <Routes>
        {/* public router */}
        <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.SEARCH} element={<Search />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
          <Route path={path.OUR_AGENTS} element={<Ouragents />} />
        </Route>
        {/* admin router */}
        <Route path={path.ADMIN_LAYOUT} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.CREATE_PROPERTY_TYPE} element={<CreatePropertyType />} />
          <Route path={path.MANAGE_PROPERTY_TYPE} element={<ManagePropertyType />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
