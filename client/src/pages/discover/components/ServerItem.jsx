import image1 from "../../../content/discover/1.jpg";
import image11 from "../../../content/discover/11.jpg";
import {useDispatch, useSelector} from "react-redux";
import {addUserToServer} from "../../../redux/features/servers/ServerSlice";
import {checkIsAuth} from "../../../redux/features/auth/AuthSlice";
import {toast, ToastContainer} from "react-toastify";
import {useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';


function ServerItem({props}) {

    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)

    const {currentServers} = useSelector(state => state.servers)
    useEffect(() => {

    }, [currentServers]);


    return <div className={'flex flex-row mb-[5%]'}>

        <img src={`http://localhost:4000/${props?.preview}`} className="discover-img-category" alt={'img'}/>

        <div className={'flex flex-col'}>
            <div className="discover-acc-line items-center">

                <img className="discover-img-acc" alt={'img'} src={`http://localhost:4000/${props?.icon}`}/>
                <div className="discover-acc-name ">{props?.name}</div>


                {isAuth ?
                    currentServers.includes(props.id) ? <button onClick={() => {
                            dispatch(addUserToServer({serverId: props.id}))
                        }} className={' w-6 h-6 bg-gray-200 text-xl radius-xl ml-4 rounded-md'}>
                            -
                        </button> :
                        <button onClick={() => {
                            dispatch(addUserToServer({serverId: props.id}))
                        }} className={' w-6 h-6 bg-gray-200 text-xl radius-xl ml-4 rounded-md'}>
                            +
                        </button>
                    : null}


            </div>

            <div className="discover-about">
                {props.description}
            </div>

            <div className="discover-acc-line">
                <div className="discover-info"> {currentServers.includes(props.id)?1:0} Members</div>
                {/*<div className="discover-info"> 907485 Members</div>*/}
            </div>
        </div>

        <ToastContainer/>
    </div>
}

export default ServerItem