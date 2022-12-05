import Layout from "./components/Layout";
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import DiscoverPage from "./pages/discover/DiscoverPage";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import {useDispatch,} from "react-redux";
import {useEffect} from "react";
import { getMe} from "./redux/features/auth/AuthSlice";


function App() {


    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getMe())
    }, [dispatch]);

    return (
        <Layout>
            <Routes>
                <Route path={'/'} element={<MainPage/>}/>
                <Route path={'discover'} element={<DiscoverPage/>} />
                <Route path={'login'} element={<LoginPage/>}/>
                <Route path={'registration'} element={<RegistrationPage/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
