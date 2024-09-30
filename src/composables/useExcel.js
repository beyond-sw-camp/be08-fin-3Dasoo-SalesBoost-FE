import axios from 'axios';

export function useExcelDownloader() {
  const downloadExcel = async (tableData, filename = 'dowloadExcel.xlsx', sheetname = 'sheet1') => {
    try {
      const payload = {
        tableData: tableData,
        fileName: filename,
        sheetName: sheetname,
      };

      const response = await axios.post('http://localhost:8080/api/export/excel', payload, {
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename); // 다운로드 파일 이름 설정
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };

  const getTableData = (tableId) => {
    const table = document.getElementById(tableId);
    const tableData = [];
    for (let row of table.rows) {
      const rowData = {};
      for (let [index, cell] of [...row.cells].entries()) {
        rowData[`column${index + 1}`] = cell.textContent;
      }
      tableData.push(rowData);
    }
    return tableData;
  };

  return {
    downloadExcel,
    getTableData,
  };
}
