import { useState, useEffect } from "react";
import '../styles/reset.css';
import { useAppDispatch, useAppSelector } from "../store/hoocs";
import { requestPasswordReset } from "../store/reducers/authSlice";

const RequestPasswordReset = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const {status, isLoading} = useAppSelector((state) => state.authSlice)

    useEffect(() => {
        if (status) {
          setMessage(status);
    
          const clearMessage = setInterval(() => {
            setMessage('');
          }, 4500);
          return () => {
            clearInterval(clearMessage);
          };
        }
    
      }, [status]);

    const handleRequestReset = () => {
        try {
            dispatch(requestPasswordReset(email));
            setEmail('');
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="reset">
            <h2>Для сброса пароля введите свой e-mail</h2>
            <div className="reset_container">
                <input
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleRequestReset}>Запросить сброс пароля</button>
            </div>
            {isLoading ? <div className='container'><div className="overlay"><div className="loader"></div></div></div> : ''}
            {message ? <h2>{message}</h2> : ''}
        </div>
    )
}

export default RequestPasswordReset