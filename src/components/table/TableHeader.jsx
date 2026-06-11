import './dependencies/style/style.css';

function DyvixTableHeader({ children, className = '', ...rest }) {
  const tableClasses = `dyvix-table-header ${className}`.trim();

  return (
    <thead className={tableClasses} {...rest}>
      {children}
    </thead>
  );
}

export default DyvixTableHeader;