import React from 'react';
import './dependencies/style/style.css';
import DyvixTableHeader from './DyvixTableHeader';
import DyvixTableHead from './DyvixTableHead';
import DyvixTableRow from './DyvixTableRow';
import DyvixTableBody from './DyvixTableBody';
import DyvixTableCell from './DyvixTableCell';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ValidateTable } from './validation';
import { GuardStatus, EvaluateFailure } from '../../utils/DyvixGuard';
import Version from '../../../package.json';

function DyvixTable({
  children,
  className = '',
  animation = 'fade',
  theme = '!/',
  background,
  color,
  columns,
  data,
  style,
  ...rest
}) {
  const instanceId = React.useId();
  const [configs, SetConfig] = React.useState({});
  const tableRef = React.useRef();  
  const [isValid, SetIsvalid] = React.useState(false);
  const currentAnimation = animation ? configs['animation'] : null;
  const currentTheme = theme !== "!/" ? configs['theme'] : null;
  const tableClasses = `dyvix-table  ${currentTheme?.class ?? ''} ${className}`.trim();
  
  const props = {
    className: tableClasses,
    style: {
      ...(background && { background: background }),
      ...(color && { color: color }),
      ...style
    }
  };

  const ConstructTable = () => {
    const bodyRows = data.map((row) => columns.map((col) => row[col.key]));
    return (
      <>
        <DyvixTableHeader>
          <DyvixTableRow>
            {columns.map((col, i) => {
              return (
                <DyvixTableHead key={col.key || i}>
                  {typeof col === 'string' ? col : col.label}
                </DyvixTableHead>
              );
            })}
          </DyvixTableRow>
        </DyvixTableHeader>
        <DyvixTableBody>
          {bodyRows.map((row, i) => {
            return (
              <DyvixTableRow key={i}>
                {row.map((col, j) => (
                  <DyvixTableCell key={`${i}-${j}`}>{col}</DyvixTableCell>
                ))}
              </DyvixTableRow>
            );
          })}
        </DyvixTableBody>
      </>
    );
  };

  React.useEffect(() => {
    async function validate() {
      const validator = await ValidateTable(
        animation,
        theme,
        children,
        columns,
        data,
        SetConfig,
        instanceId
      );

      if (validator.status === GuardStatus.Error) {
        SetIsvalid(false);
        return EvaluateFailure(validator.error, validator.status);
      } else {
        SetIsvalid(true);
      }
    }

    validate();
    return () => {
      const key = `DYVIX_${Version['version']}_Table_theme_${instanceId}`;
      const ele = document.getElementById(key);
      if (ele) ele.remove();
    };
  }, [animation, columns, data]);
  useGSAP(() => {
    if (!tableRef.current || !currentAnimation) return;

    gsap.fromTo(tableRef.current, currentAnimation.from, {
      ...currentAnimation.to,
      duration: currentAnimation['default-duration'],
      ease: currentAnimation.ease
    });
  }, [currentAnimation]);
  const resultJSX = React.useMemo(
    () => (columns && isValid ? ConstructTable() : null),
    [columns, isValid]
  );
  children = children ? children : resultJSX;
  return (
    <div className="dyvix-table-wrapper" ref={tableRef}>
      <table {...props}>{children}</table>
    </div>
  );
}

export default DyvixTable;
