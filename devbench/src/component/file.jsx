import { DyvixFile } from 'dyvix-ui';
import { DYVIX_MODAL_THEME } from 'dyvix-ui';
export function FileTest() {
  return (
    <>
      <DyvixFile
        onUpload={(data) => console.log(data)}
        multiple={true}
        theme={DYVIX_MODAL_THEME.SINGULARITY}
      >
        Submit
      </DyvixFile>
    </>
  );
}
