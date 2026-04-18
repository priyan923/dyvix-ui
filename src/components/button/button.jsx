import React from 'react';
import './dependencies/style/style.css';
import './dependencies/style/themes.css';
import animationsData from '../animations.json';
import themesData from './dependencies/themes.json';
import { EvaluateFailure, GaurdStatus } from '../../utils/DyvixGuard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Validatebtn } from './validation';
export const vaildThemes = themesData.map((e) => e.theme);
export const validAnimations = animationsData.map((e) => e.animation);

function DyvixButton({
  children = 'Click Me',
  animation = 'fade',
  className = '',
  theme = '!/',
  background,
  color,
  onClick,
  style,
  ...rest
}) {
  const btnRef = React.useRef(null);

  const currentTheme = themesData.find(
    (e) => e.theme.trim().toLowerCase() === theme.trim().toLowerCase()
  );
  const currentAnimation = animation
    ? animationsData.find(
        (e) =>
          e.animation.trim().toLowerCase() === animation.trim().toLowerCase()
      )
    : null;

  function handleClick() {
    if (typeof onClick === 'function') {
      onClick();
    }
  }

  className = `dyvix-button${currentTheme ? ` ${currentTheme.class}` : ''}${className !== '' ? ` ${className}` : ''}`;

  const validator = Validatebtn(animation, theme);

  if (validator.status === GaurdStatus.Error) {
    return EvaluateFailure(validator.error, validator.status);
  }

  useGSAP(() => {
    if (!btnRef.current || !currentAnimation) return;

    gsap.fromTo(btnRef.current, currentAnimation.from, {
      ...currentAnimation.to,
      duration: currentAnimation['default-duration'],
      ease: currentAnimation.ease
    });
  }, [currentAnimation]);

  const props = {
    className: className,
    disabled: rest.disabled,
    style: {
      ...(background && { background: background }),
      ...(color && { color: color }),
      ...style
    }
  };

  return (
    <div className="dyvix-btn-wrapper" ref={btnRef} {...rest}>
      <button {...props} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
}

export default DyvixButton;
