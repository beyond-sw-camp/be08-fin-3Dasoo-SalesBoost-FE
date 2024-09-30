<template>
  <div>
    <table id="dlist" border="1">
      <tr>
        <th>번호</th>
        <th>이름</th>
        <th>부서</th>
        <th>내용</th>
      </tr>
      <tr>
        <td>1</td>
        <td>홍길동</td>
        <td>경영부서</td>
        <td>테스트</td>
      </tr>
      <tr>
        <td>2</td>
        <td>이몽룡</td>
        <td>영업부서</td>
        <td>테스트2</td>
      </tr>
    </table>
    <br /><br />
    <button @click="handleDownload">엑셀 다운로드</button>
  </div>
</template>

<script setup>
import { useExcelDownloader } from '../composables/useExcel';

const { downloadExcel, getTableData } = useExcelDownloader();

const handleDownload = () => {
  const tableData = getTableData('dlist'); // 엑셀다운받으려는 테이블(리스트) 아이디
  const filename = '엑셀파일명.xlsx'; // 원하는 파일명
  const sheetname = '엑셀시트명'; // 원하는 시트명
  downloadExcel(tableData, filename, sheetname);
};
</script>
