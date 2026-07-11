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

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Composable mode content (DyvixTableHeader, DyvixTableBody, etc.)
 * @param {string} [props.className] - Additional className
 * @param {('fade'|'bubble'|'zoom'|'unfold'|'glitch'|'pulse'|'aurora'|'drop'|'flip'|'glide'|'drift'|'float'|'swing')} [props.animation] - Animation name, defaults to 'fade'
 * @param {('Singularity'|'Industrial'|'Ember'|'Frost'|'Blade'|'Neon'|'Aurora'|'Sunset'|'Ocean'|'Forest'|'Midnight'|'Crimson'|'Obsidian')} [props.theme] - Table theme
 * @param {string} [props.background] - Custom background color
 * @param {string} [props.color] - Custom text color
 * @param {Array<{key: string, label: string, sortable?: boolean}>} [props.columns] - Column definitions for config-driven mode
 * @param {Array<Object>} [props.data] - Row data for config-driven mode, keys must match column keys
 * @param {Object} [props.style] - Inline style overrides
 */
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
  const [sortConfig, setSortConfig] = React.useState([]);
  const tableRef = React.useRef();
  const [isValid, SetIsvalid] = React.useState(false);
  const currentAnimation = animation ? configs['animation'] : null;
  const currentTheme = theme !== '!/' ? configs['theme'] : null;
  const tableClasses =
    `dyvix-table  ${currentTheme?.class ?? ''} ${className}`.trim();

  const props = {
    className: tableClasses,
    style: {
      ...(background && { background: background }),
      ...(color && { color: color }),
      ...style
    }
  };
  const processedData = React.useMemo(() => {
    if (!data || !columns) return [];
    if (!sortConfig.length) return data;

    return [...data].sort((a, b) => {
      for (const { key, direction } of sortConfig) {
        if (direction === 'none') continue;
        const aVal = a[key];
        const bVal = b[key];

        let result = 0;

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          result = aVal - bVal;
        } else {
          result = String(aVal).localeCompare(String(bVal));
        }

        if (result !== 0) return direction === 'asc' ? result : -result;
      }

      return 0;
    });
  }, [columns, data, isValid, sortConfig]);

  const ConstructTable = () => {
    const bodyRows = processedData.map((row) =>
      columns.map((col) => row[col.key])
    );
    const handleSortClick = (key) => {
      const isfound = sortConfig?.find((config) => config['key'] === key);

      if (isfound) {
        setSortConfig((prev) =>
          prev.map((config) => {
            if (config.key !== key) return config;
            if (config.direction === 'asc')
              return { ...config, direction: 'desc' };
            if (config.direction === 'desc')
              return { ...config, direction: 'none' };
            return { ...config, direction: 'asc' };
          })
        );
      } else {
        const index = columns.findIndex((col) => col['key'] === key);
        setSortConfig((prev) => [
          ...(prev || []),
          { key: key, direction: 'asc', index: index }
        ]);
      }
    };

    return (
      <>
        <DyvixTableHeader>
          <DyvixTableRow>
            {columns.map((col, i) => {
              const isColumnSortable = col.sortable === true;
              const activeSort = isColumnSortable
                ? sortConfig.find((config) => config.key === col.key)
                : null;
              let sortIndicator = null;

              if (activeSort) {
                if (activeSort.direction === 'asc') {
                  sortIndicator = ' ▲';
                } else if (activeSort.direction === 'desc') {
                  sortIndicator = ' ▼';
                }
              }
              return (
                <DyvixTableHead
                  key={col.key || i}
                  {...(isColumnSortable && {
                    onClick: () => handleSortClick(col.key),
                    className: 'table-sortable'
                  })}
                >
                  {typeof col === 'string' ? col : col.label}
                  {isColumnSortable && (
                    <span className="dyvix-table-sort-icon">
                      {sortIndicator || ' ↕'}
                    </span>
                  )}
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
  }, [animation, theme, columns, data]);
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
    [columns, isValid, sortConfig]
  );
  children = children ? children : resultJSX;
  return (
    <div className="dyvix-table-wrapper" ref={tableRef}>
      <table {...props}>{children}</table>
    </div>
  );
}

export default DyvixTable;
