import {
  DyvixTable,
  DyvixTableHeader,
  DyvixTableBody,
  DyvixTableRow,
  DyvixTableHead,
  DyvixTableCell
} from 'dyvix-ui';
import { DYVIX_GLOBAL_ANIMATION, DYVIX_GLOBAL_THEME } from 'dyvix-ui';
export function TableTest() {
  return (
    <>
      <DyvixTable     
        columns={[
          { key: 'id', label: 'ID'},
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'hp', label: 'HP' },
          { key: 'region', label: 'Region' },
        ]}>
        
      </DyvixTable>
    </>
  );
}
