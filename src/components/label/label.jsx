import React from 'react';
import './dependencies/style/style.css';
import { EvaluateFailure, GuardStatus } from '../../utils/DyvixGuard';
import { Validatelbl } from './validation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Version from '../../../package.json';

/**
 * @param {Object} props
 * @param {string} [props.className] - Label className
 * @param {string} [props.htmlFor] - Links the label to a form associated element
 * @param {string} [props.animation] - Animation name
 * @param {('Singularity'|'Industrial'|'Ember'|'Frost'|'Blade'|'Neon'|'Aurora'|'Sunset'|'Crimson'|'Midnight'|'Forest')} [props.theme] - Label theme
 * @param {string} [props.background] - Button background color
 * @param {Object} [props.style] - Inline styles overrides
*/
function DyvixLabel({
  children,
  className = '',
  htmlFor,
  animation = 'fade',
  theme = '!/',
  background,
  style,
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
    style: {
      ...(background && {background: background}),
      ...style
    }
  };

  return (
    <div className="dyvix-label-wrapper" ref={lblRef} {...rest}>
      <label {...props}>{children}</label>
    </div>
  );
}

export default DyvixLabel;
