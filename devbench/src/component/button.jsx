import { DyvixButton } from 'dyvix-ui';
import { DYVIX_MODAL_THEME } from 'dyvix-ui';
export function ButtonTest() {
  return (
    <>
      <DyvixButton onClick={() => console.log('clicked')}>Submit</DyvixButton>
    </>
  );
}
