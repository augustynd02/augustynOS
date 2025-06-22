import { useState, useRef, useEffect } from 'react';
import styles from './LoginScreen.module.scss'

interface LoginScreenProps {
    setIsLoginShown: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginScreen({ setIsLoginShown }: LoginScreenProps) {
    const [loginExpanded, setLoginExpanded] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const loginRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

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
            {!loginExpanded && <p className={styles.hint}>Click to continue...</p> }
            <div className={`${styles.clockContainer} ${loginExpanded ? styles.disappear : ''}`}>
                <div className={styles.time}>{formatTime(currentTime)}</div>
                <div className={styles.date}>{formatDate(currentTime)}</div>
            </div>

            {loginExpanded && (
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
