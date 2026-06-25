import {
  EvaluateFailure,
  GuardStatus,
  allowsNull
} from '../../utils/DyvixGuard';
import { ValidatAndLoadJSON } from '../../utils/Smart Json Caching/SJCManager';

const component = 'Select';
const CacheMapping = {
  animation: {
    jsonpath: '../../components/animations.json',
    csspath: null
  }
};
const supportedTypes = ['select', 'autocomplete'];

export async function ValidateSelect(elements, type, animation, theme, callback, instance) {
  let normalizedAnimation = animation?.trim().toLowerCase();

  const isAnimation = await ValidatAndLoadJSON(
    CacheMapping,
    normalizedAnimation,
    callback,
    'animation',
    component
  );
  if (!isAnimation.status && !allowsNull(normalizedAnimation)) {
    return {
      status: GuardStatus.Error,
      error: 'Please provide a valid animation.'
    };
  }
    if (!Array.isArray(elements)) {
    return { status: GuardStatus.Error, error: 'Elements should be included as an array.' };
  }
  if (!supportedTypes.includes(type)) {
    return { status: GuardStatus.Error, error: 'Please provide a valid select type.' };
  }

  return { status: GuardStatus.Success };
}
