import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import Dialog from "../Loading/Dialog";

export default function Login({setToken}){
    const [isShowed, setIsShowed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false)
    const [typeDialog, setTypeDialog] = useState("")
    const userNameRef = useRef(null)
    const passwordRef = useRef(null)
    const goTo = useNavigate()

    const handleLogin = async () => {
        setLoading(true)
        const username = userNameRef.current.value;
        const password = passwordRef.current.value;
        try{
            const res = await axios.post("https://sqvfxf-8080.csb.app/api/admin/login", {
                username,
                password
            });

            const token = res.data.token;
            localStorage.setItem("token", token);
            setToken(token)
            setLoading(false)
            setTypeDialog("success")
            setShowDialog(true)
        } catch(e){
            passwordRef.current.value = "";
            setLoading(false)
            setTypeDialog("fail")
            setShowDialog(true)
            console.error("Login Failed: ", e);
        }
    }

    const goToHome = () => {
        goTo("/");
    }

    return (
        <div className="login-container">
            <h2 className="sign-up-header">Login to enjoy our application</h2>
            <div className="input-box-container">
                <span className="input-discription">User name: </span>
                <div className="input-box">
                    <input 
                        type="text" 
                        className="username-input" 
                        placeholder="Enter user name"
                        ref={userNameRef}
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription">Password: </span>
                <div className="input-box">
                    <input 
                        type={isShowed ? "text" : "password"} 
                        className="password-input"
                        placeholder="Password"
                        ref={passwordRef}
                    />
                    <FontAwesomeIcon 
                        icon={isShowed ? faEye : faEyeSlash} 
                        className={isShowed ? "show-pass-icon" : "show-pass-icon hide"}
                        onClick={() => setIsShowed(!isShowed)}
                    />
                </div>
            </div>
            <div className="btn-login" onClick={handleLogin}>
                <button>Login</button>
            </div>
            <span className="navigation-msg">
                Don't have an account? 
                <span className="link-text" onClick={() => goTo('/signup')}> Register</span>
            </span>
            {loading && <div className="authen">
                <Loading text="Verifying user..."/>
            </div>}
            {showDialog &&
                <Dialog type={typeDialog} trigerFunction={goToHome} setShowDialog={setShowDialog}/>
            }
        </div>
    )
}