import {
  EvaluateFailure,
  GaurdStatus,
  allowsNull
} from '../../utils/DyvixGuard';
import { validAnimations, vaildThemes } from './button';

export function Validatebtn(animation, theme) {
  const normalizedAnimation = animation?.trim().toLowerCase();
  const normalizedTheme =
    theme?.trim().charAt(0).toUpperCase() + theme.trim().slice(1);

  if (
    normalizedAnimation !== null &&
    !validAnimations.includes(normalizedAnimation)
  ) {
    return {
      status: GaurdStatus.Error,
      error: 'Please provide a valid animation.'
    };
  }
  if (normalizedTheme !== '!/' && !vaildThemes.includes(normalizedTheme)) {
    return {
      status: GaurdStatus.Error,
      error: 'Please provide a valid theme.'
    };
  }

  return { status: GaurdStatus.Success };
}
