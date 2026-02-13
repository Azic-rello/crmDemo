import { Routes, Route } from "react-router-dom";
import {
  Admin,
  Group,
  Login,
  Manager,
  Room,
  SiteBar,
  Student,
  Teacher,
} from "./index";

const App = () => {
  return (
    <Routes>
      {/* Login sahifasi drawer yo‘q */}
      <Route path="/" element={<Login />} />

      {/* Admin panel drawer bilan */}
      <Route path="/admin" element={<SiteBar />}>
        <Route index element={<Admin />} /> {/* /admin */}
        <Route path="/admin/student" element={<Student />} />{" "}
        {/* /admin/student */}
        <Route path="/admin/teacher" element={<Teacher />} />{" "}
        {/* /admin/teacher */}
        <Route path="/admin/group" element={<Group />} /> {/* /admin/group */}
        <Route path="/admin/room" element={<Room />} /> {/* /admin/room */}
        <Route path="/admin/manager" element={<Manager />} />{" "}
        {/* /admin/manager */}
      </Route>
    </Routes>
  );
};

export default App;
