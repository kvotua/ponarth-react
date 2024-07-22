import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stylesDefault from "./DelayedButton.module.css";
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
  if (style == null || style == "black") {
    styles = stylesDefault;
  } else {
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
  let mergeStyles = styles;
  if (dopstyle) {
    mergeStyles = { ...styles, ...dopstyle };
  }

  return (
    <button
      onClick={handleClick}
      disabled={isClicked}
      className={className}
      style={mergeStyles}
      type={type}
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
