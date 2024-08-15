import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import stylesDefault from "./DelayedButton.module.css";
import stylesMixed from "./DelayedButtonMixedBlack.module.css";
import stylesWhite from "./DelayedButtonWhite.module.css";

interface DelayedButtonProps {
  to: string;
  delay: number;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: string;
  dopstyle?: object;
  type?: "button" | "submit" | "reset";
}

const DelayedButton: React.FC<DelayedButtonProps> = ({
  to,
  delay,
  children,
  className,
  style,
  onClick,
  dopstyle,
  type,
}) => {
  let styles = stylesDefault;
  if (style == null || style === "black") {
    styles = stylesDefault;
  } else if (style === "mixed") {
    styles = stylesMixed;
  } else {
    styles = stylesWhite;
  }

  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isClicked) {
      timer = setTimeout(() => {
        navigate(to);
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [isClicked, delay, navigate, to]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delayTimer = setTimeout(() => {
            entry.target.classList.add(styles.animate);
          }, 300);
          entry.target.addEventListener("transitionend", () =>
            clearTimeout(delayTimer)
          );
        }
      });
    });

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        observer.unobserve(buttonRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    setIsClicked(true);
  };

  let mergeStyles = styles;
  if (dopstyle) {
    mergeStyles = { ...dopstyle, ...styles };
  }

  return (
    <button
      onClick={handleClick}
      // disabled={isClicked}
      className={`${className} ${styles.button}`}
      style={mergeStyles as React.CSSProperties} // Добавляем преобразование типов
      type={type}
      ref={buttonRef} // Реф для отслеживания Intersection Observer
    >
      <div className={mergeStyles.learn_more} onClick={onClick}>
        <span className={mergeStyles.circle} aria-hidden="true">
          <span className={`${mergeStyles.icon} ${mergeStyles.arrow}`}></span>
        </span>
        <span className={mergeStyles.button_text}>{children}</span>
      </div>
    </button>
  );
};

export default DelayedButton;
