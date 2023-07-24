import React from 'react';
import { ExcelButton } from '../ExcelButton/ExcelButton';
import './Table.css';

interface TableDProps {
  data: any[];
  columns: string[];
  dbColumns: string[];
  tituloDocumento: string;
  nombreArchivo: string;
}

export const TableD: React.FC<TableDProps> = ({
  data,
  columns,
  dbColumns,
  tituloDocumento,
  nombreArchivo,
}) => {
  return (
    <>
      <div className="tableContainer">
        <div className="actionsTable">
          <div className="left">
            <ExcelButton
              tituloDocumento={tituloDocumento}
              dataDownload={data}
              nombreArchivo={nombreArchivo}
            />
          </div>
        </div>
        <div className="bottomTable">
          <table className="dataTable">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row: any, index: number) => (
                  <tr key={index}>
                    {dbColumns?.map((column: string) => (
                      <td key={column}>{row[column]}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length}>No hay datos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
