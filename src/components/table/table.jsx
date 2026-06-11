import './dependencies/style/style.css';

function DyvixTable({ children, className = '' }) {
  const tableClasses = `dyvix-table ${className}`.trim();
  const props = {
    className: tableClasses
  };

  return (
    <div className="dyvix-table-wrapper">
      <table {...props}>
        <tr>
          <td>sdsd</td>
          <td>sdsd</td>
          <td>sdsd</td>
        </tr>
        <tr>
          <td>sdsd</td>
          <td>sdsd</td>
          <td>sdsd</td>
        </tr>
        <tr>
          <td>sdsd</td>
          <td>sdsd</td>
          <td>sdsd</td>
        </tr>
        <tr>
          <td>sdsd</td>
          <td>sdsd</td>
          <td>sdsd</td>
        </tr>
      </table>
    </div>
  );
}

export default DyvixTable;
