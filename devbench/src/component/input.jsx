import { DyvixInput } from 'dyvix-ui';
import { DYVIX_GLOBAL_ANIMATION, DYVIX_GLOBAL_THEME } from 'dyvix-ui';
export function InputTest() {
  return (
    <>
      <DyvixInput
        animation={DYVIX_GLOBAL_ANIMATION.AURORA}
        theme={DYVIX_GLOBAL_THEME.FROST}
        type="text"
        placeholder={'Enter your name'}
      />
    </>
  );
}
