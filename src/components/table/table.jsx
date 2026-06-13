import React from 'react';
import './dependencies/style/style.css';
import DyvixTableHeader from './DyvixTableHeader';
import DyvixTableHead from './DyvixTableHead';
import DyvixTableRow from './DyvixTableRow';
function DyvixTable({ children, className = '', columns}) {
  const tableClasses = `dyvix-table ${className}`.trim();
  const props = {
    className: tableClasses
  };

  const ConstructTable = () => (
    <DyvixTableHeader>
      <DyvixTableRow>
        {columns.map((col, i) => {
          return <DyvixTableHead key={col.key || i}>{typeof col === 'string' ? col: col.label}</DyvixTableHead>
        })}
      </DyvixTableRow>
    </DyvixTableHeader>
  );

  const resultJSX = React.useMemo(() => columns ? ConstructTable(): null , [columns]);
  children = children ? children: resultJSX;
  console.log(children)
  return (
    <div className="dyvix-table-wrapper">
      <table {...props}>{children}</table>
    </div>
  );
}

export default DyvixTable;
