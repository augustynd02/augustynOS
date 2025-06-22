import { useState, useRef } from 'react';
import styles from './LoginScreen.module.scss'

interface LoginScreenProps {
    setIsLoginShown: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginScreen({ setIsLoginShown }: LoginScreenProps) {
    const [loginExpanded, setLoginExpanded] = useState(false);
    const loginRef = useRef<null | HTMLDivElement>(null);

    const handleLogin = () => {
        if (loginRef.current) {
            loginRef.current.classList.add(styles.disappear);
        }
        setTimeout(() => {
            setIsLoginShown(false);
        }, 500)
    }

    return (
        <div ref={loginRef} className={`${styles.loginScreen} ${loginExpanded ? styles.blur : ''}`} onClick={() => setLoginExpanded(true)}>
            { loginExpanded && (
                <div className={styles.profileContainer}>
                    <div className={styles.avatar}>
                        <img src='./profile-picture.jpg' alt='Profile picture' />
                    </div>
                    <div className={styles.name}>
                        <h1>Dominik Augustyn</h1>
                        <p>Fullstack Web Developer</p>
                    </div>
                    <button onClick={handleLogin}><span>Sign in</span></button>
                </div>
            )}
        </div>
    )
}

export default LoginScreen;
