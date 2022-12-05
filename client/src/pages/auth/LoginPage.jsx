import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {loginUser, checkIsAuth} from "../../redux/features/auth/AuthSlice";


function LoginPage() {

    const dispatch = useDispatch()
    const {status} = useSelector((state) => state.auth)
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()

    const emailRef = useRef('')
    const passwordRef = useRef('')

    useEffect(() => {
        if (status) {
            toast(status)
        }
        if (isAuth) navigate('/')
    }, [isAuth])



    async function login() {
        if (emailRef.current.value === '' || passwordRef.current.value < 4) {

            toast('поля не заполнены')

        } else {

            const {payload} = await dispatch(loginUser({
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }))

            await toast(payload.message)
        }
    }

    return <div className={'login-body'} >
        <div className="login-login-block">
            <div>
                <h1 className="login-hello-text ">С возвращением!</h1>
                <div className="login-glad-to-see-text">
                    Мы так рады видеть вас снова!
                </div>
            </div>

            <div>
                <div>
                    <label className={'login-label'} htmlFor="email">
                        АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ ИЛИ НОМЕР ТЕЛЕФОНА
                        <span className={'login-span'}>*</span>
                    </label>
                    <input className={'login-input h-8'} type="email" name="email" id="email" ref={emailRef} required/>
                </div>

                <div>
                    <label className={'login-label'} htmlFor="password">
                        ПАРОЛЬ
                        <span className={'login-span'}>*</span>
                    </label>
                    <input className={'login-input h-8'} ref={passwordRef} type="password" name="password" id="password" required/>
                        <a  className="login-inks"> Забыли пароль? </a>
                </div>
            </div>

            <div>
                <button onClick={()=>{login()}} className="login-button"> Вход</button>
                <div>
                    <div className="login-need-registration"> Нужна учетная запись?
                        <Link to={'/registration'} className="login-inks"> Зарегистрироваться </Link>
                    </div>

                </div>
            </div>

        </div>
        <ToastContainer />
    </div>
}

export default LoginPage