import React from 'react';
import './dependencies/style/style.css';
import DyvixTableHeader from './DyvixTableHeader';
import DyvixTableHead from './DyvixTableHead';
import DyvixTableRow from './DyvixTableRow';
import DyvixTableBody from './DyvixTableBody';
import DyvixTableCell from './DyvixTableCell';
function DyvixTable({ children, className = '', columns, data}) {
  const tableClasses = `dyvix-table ${className}`.trim();
  const props = {
    className: tableClasses
  };

  const ConstructTable = () => {
    const bodyRows = data.map(row => columns.map(col => row[col.key]));
    return <>
        <DyvixTableHeader>
          <DyvixTableRow>
            {columns.map((col, i) => {
              return <DyvixTableHead key={col.key || i}>{typeof col === 'string' ? col: col.label}</DyvixTableHead>
            })}
          </DyvixTableRow>
      </DyvixTableHeader>
      <DyvixTableBody>
      {bodyRows.map((row, i) => {
        return <DyvixTableRow key={i}>
          {row.map((col, j) => (
            <DyvixTableCell key={`${i}-${j}`}>{col}</DyvixTableCell>
          ))}
        </DyvixTableRow>
      })}
      </DyvixTableBody>
    </>
  };

  const resultJSX = React.useMemo(() => columns ? ConstructTable(): null , [columns]);
  children = children ? children: resultJSX;

  return (
    <div className="dyvix-table-wrapper">
      <table {...props}>{children}</table>
    </div>
  );
}

export default DyvixTable;
