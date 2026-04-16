import React from 'react';
import './dependencies/style/style.css';
import './dependencies/style/themes.css';

import animationsData from '../animations.json';
import themesData from './dependencies/themes.json';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function DyvixButton({
  children = 'Click Me',
  animation = 'fade',
  className = '',
  theme,
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

  className = `dyvix-button ${currentTheme.class} ${className}`;

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
    style: {
      background: background,
      color: color,
      ...style
    }
  };

  return (
    <button ref={btnRef} {...props} onClick={() => handleClick}>
      {children}
    </button>
  );
}

export default DyvixButton;
