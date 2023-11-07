import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./routes/Login";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
