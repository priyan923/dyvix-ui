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
        ]}
        data={[
          { id: 1, name: 'Lion', type: 'Wild', hp: 85, region: 'Afr' },
          { id: 2, name: 'Wolf', type: 'Wild', hp: 60, region: 'Eur' },
          { id: 3, name: 'Deer', type: 'Wild', hp: 45, region: 'Asia' },
          { id: 4, name: 'Hawk', type: 'Bird', hp: 30, region: 'Amr' },
          { id: 5, name: 'Bear', type: 'Wild', hp: 90, region: 'Amr' },
        ]}
      />
    </>
  );
}
