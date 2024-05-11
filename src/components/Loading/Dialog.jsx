import { faCircleCheck, faCircleXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Loading'

export default function Dialog({type, trigerFunction, setShowDialog}){
    return(
        <div className="photo-dialog">
            <div className="dialog-container">
                {
                    type === 'success' ?
                    <FontAwesomeIcon icon={faCircleCheck} className="success"/> :
                    type === 'fail' ?
                    <FontAwesomeIcon icon={faCircleXmark} className="fail"/> :
                    <>
                        <FontAwesomeIcon icon={faTriangleExclamation} size="5x" className="alert" />
                        <span>Are you sure to delete this photo?</span>
                        <div className="choice-option">
                            <button onClick={() => trigerFunction()}>ACCEPT</button>
                            <button onClick={() => setShowDialog(false)}>CANCEL</button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}