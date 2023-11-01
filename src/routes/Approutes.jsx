import { Outlet, Route, Routes } from 'react-router-dom';
import Frontlayout from '../layouts/Layout';
import Dnd from '../pages/Dnd';
import Home from '../pages/Home';
import Notfound from '../pages/Notfound';

export default function Approutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Frontlayout>
                        <Outlet />
                    </Frontlayout>
                }
            >
                <Route index element={<Home />} />
                <Route path="/test" element={<Dnd />} />
            </Route>
            <Route path="*" element={<Notfound />} />
        </Routes>
    );
}
