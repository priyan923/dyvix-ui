import { DyvixFile } from 'dyvix-ui';
import { DYVIX_GLOBAL_ANIMATION, DYVIX_MODAL_THEME } from 'dyvix-ui';
export function FileTest() {
  return (
    <>
      <DyvixFile
        onUpload={(data) => console.log(data)}
        multiple={true}
        accept={'.jpg, .jpeg, .png'}
      />
    </>
  );
}
