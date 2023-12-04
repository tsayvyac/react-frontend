import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./routes/Login";
import Main from "./routes/Main";
import Issues from "./parts/Issues";
import Dashboard from "./parts/Dashboard";
import Services from "./parts/Services";
import MapPage from "./parts/MapPage";
import NotMatch from "./parts/NotMatch";
import ServiceInfo from "./parts/ServiceInfo";
import ComparePage from "./parts/ComparePage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />}></Route>
                <Route path="main/*" element={<Main />}>
                    <Route index path="dashboard" element={<Dashboard />}></Route>
                    <Route path="issues" element={<Issues/>}></Route>
                    <Route path="services" element={<Services />}></Route>
                    <Route path="map" element={<MapPage />}></Route>
                    <Route path="services/:serviceId" element={<ServiceInfo />}></Route>
                </Route>
                <Route path="compare" element={<ComparePage />}></Route>
                <Route path="*" element={<NotMatch />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
