import React from 'react';
import './dependencies/style/style.css';
import { EvaluateFailure, GuardStatus } from '../../utils/DyvixGuard';
import { Validatelbl } from './validation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Version from '../../../package.json';

function DyvixLabel({
  children,
  className = '',
  htmlFor,
  style,
  animation = '!/',
  theme = '!/',
  ...rest
}) {
  const lblRef = React.useRef(null);
  const [configs, SetConfig] = React.useState({});
  const instanceId = React.useId();
  const currentAnimation = animation ? configs['animation'] : null;
  const currentTheme = theme !== '!/' ? configs['theme'] : null;

  className = `dyvix-label ${currentTheme?.class ?? ''} ${className}`.trim();

  React.useEffect(() => {
    async function validate() {
      const validator = await Validatelbl(
        animation,
        theme,
        SetConfig,
        instanceId
      );

      if (validator.status === GuardStatus.Error) {
        return EvaluateFailure(validator.error, validator.status);
      }
    }

    validate();
    return () => {
      const key = `DYVIX_${Version['version']}_Label_theme_${instanceId}`;
      const ele = document.getElementById(key);
      if (ele) ele.remove();
    };
  }, [animation, theme]);

  useGSAP(() => {
    if (!lblRef.current || !currentAnimation) return;

    gsap.fromTo(lblRef.current, currentAnimation.from, {
      ...currentAnimation.to,
      duration: currentAnimation['default-duration'],
      ease: currentAnimation.ease
    });
  }, [currentAnimation]);

  const props = {
    className: className,
    ...(htmlFor && { htmlFor: htmlFor }),
    style
  };

  return (
    <div className="dyvix-label-wrapper" ref={lblRef} {...rest}>
      <label {...props}>{children}</label>
    </div>
  );
}

export default DyvixLabel;
