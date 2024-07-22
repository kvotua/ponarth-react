import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import stylesDefault from './DelayedButton.module.css';
import stylesWhite from './DelayedButtonWhite.module.css';
interface DelayedButtonProps {
    to: string;
    delay: number;
    children: React.ReactNode;
    className?: string;
    onClick?: ()=> void;
    style?: string;
}

const DelayedButton: React.FC<DelayedButtonProps> = ({ to, delay, children, className, style, onClick }) => {
    let styles = stylesDefault;
    if(style == null || style == 'black'){
        styles = stylesDefault;
    }
    else{
        styles = stylesWhite;
    }
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isClicked) {
            timer = setTimeout(() => {
                navigate(to);
            }, delay);
        }
        return () => clearTimeout(timer);
    }, [isClicked, delay, navigate, to]);

    const handleClick = () => {
        setIsClicked(true);
    };

    return (
        <button onClick={handleClick} disabled={isClicked} className={className}>
           <div className={styles.learn_more} onClick={onClick}>
              <span className={styles.circle} aria-hidden="true">
                <span className={`${styles.icon} ${styles.arrow}`}></span>
              </span>
              <span className={styles.button_text}>{children}</span>
            </div>
        </button>
    );
};
export default DelayedButton