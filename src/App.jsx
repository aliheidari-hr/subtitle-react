import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Create from "./pages/Create/Create";
import Translation from "./pages/Translation/Translation";
import ConvertType from "./pages/ConvertType/ConvertType";
import Edit from "./pages/Edit/Edit";


export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to='/translation' />} />
        <Route path="/create" element={<Create />} />
        <Route path="/translation" element={<Translation />} />
        <Route path="/convert-type" element={<ConvertType />} />
        <Route path="/edit" element={<Edit />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}