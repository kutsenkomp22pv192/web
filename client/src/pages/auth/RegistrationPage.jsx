import {Link, NavLink} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {checkIsAuth, registrationUser} from "../../redux/features/auth/AuthSlice";
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";

function RegistrationPage() {
    const {status} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [message, setMessage] = useState({
        mail: '',
        password: ''
    })

    const emailRef = useRef('')
    const passwordRef = useRef('')
    const nameRef = useRef('')
    const birthYearRef = useRef('')
    const birthMouthRef = useRef('')
    const birthDayRef = useRef('')

    const arrayOfDays = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    const arrayOfMouth = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']

    let max = new Date().getFullYear()
    let min = max - 50
    let arrayOfYears = []

    for (let i = max; i >= min; i--) {
        arrayOfYears.push(i)
    }


    async function initUser() {
        if (emailRef.current.value === '' || passwordRef.current.value < 4) {

            toast('поля не заполнены')

        } else {

            const {payload} = await dispatch(registrationUser({
                email: emailRef.current.value,
                password: passwordRef.current.value,
                name: nameRef.current.value,
                birth: `${birthDayRef.current.value}-${birthMouthRef.current.value}-${birthYearRef.current.value}`
            }))

            await toast(payload.message)
            navigate('/')

        }
    }



    return <div className={'login-body'}>
        <div className="login-login-block">
            <div>
                <h1 className="login-hello-text">Создать учетную запись</h1>
            </div>
            <div>
                <div>
                    <label className={'login-label'} htmlFor="email"> E-MAIL </label>
                    <input className={'login-input h-8' + (message?.mail ? '' : ' ring-red-200')}
                           type="email" name="email" id="email" ref={emailRef} required/>
                    {
                        message.mail ?
                            <div className={'text-sm text-red-400'}>неправильно введен email</div> :
                            null
                    }
                </div>

                <div>
                    <label className={'login-label'} htmlFor="name"> ИМЯ ПОЛЬЗОВАТЕЛЯ </label>
                    <input className={'login-input h-8'} type="text" name="name" id="name" ref={nameRef} />
                </div>

                <div>
                    <label className={'login-label'} htmlFor="password"> ПАРОЛЬ </label>
                    <input className={'login-input h-8'} type="password" name="password" id="password" ref={passwordRef}
                           required/>
                </div>

                <div>
                    <label className={'login-label'}> ДАТА РОЖДЕНИЯ </label>
                    <div className="login-birth-day">
                        <select ref={birthDayRef} className={'login-select'} name="Day">
                            {
                                arrayOfDays.map((day, key) => {
                                    return <option value={day} key={key}>
                                        {day}
                                    </option>
                                })
                            }
                        </select>

                        <select ref={birthMouthRef} className={'login-select'} name="Month">
                            {
                                arrayOfMouth.map((mouth, key) => {
                                    return <option key={key}>
                                        {mouth}
                                    </option>
                                })
                            }
                        </select>

                        <select ref={birthYearRef} className={'login-select'} name="Year">
                            {
                                arrayOfYears.map((year, key) => {
                                    return <option key={key}>
                                        {year}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>

            <div className={'flex flex-row justify-around items-center'}>
                <div className={'mr-[20px]'}>
                    <input className={'login-input'} type="checkbox" id="news" name="news"/>
                </div>
                <label className={'login-label'} htmlFor="news">(Необязательно) Я не против получать электронные письма
                    с новостями Discord, советами и специальными предложениями.
                    От рассылки можно отписаться в любое время.
                </label>
            </div>

            <div>
                <button onClick={() => {
                    initUser()
                }} className="login-button"> Продолжить
                </button>
                <div>
                    <div className="login-need-registration">
                        <Link to={'/'} className="login-inks"> Уже зарегистрированы? </Link>
                    </div>
                </div>

            </div>

            <div className="login-agreement">
                <div className="login-need-registration"> Регистрируясь вы соглашаетесь с
                    <a href="#" className="login-inks"> Условиями Использования </a>
                    и
                    <a href="#" className="login-inks"> Политикой Конфиденциальности </a>
                    Discord.
                </div>
            </div>

        </div>
        <ToastContainer />
    </div>
}

export default RegistrationPage