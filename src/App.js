import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./routes/Login";
import Main from "./routes/Main";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/main" element={<Main />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
