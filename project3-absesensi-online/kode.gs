const SHEET_ID = '1HTJFnrdksK9wHlBpuoxHauH7YoaY28IA5p6J1rfzNfg';
function doGet() {
 return HtmlService.createTemplateFromFile('index')
 .evaluate()
 .setTitle('Absensi Online');

}

function include(file) {
 return HtmlService.createHtmlOutputFromFile(file).getContent();

}

/* ================= LOGIN ================= */
function login(nim) {
 const sheet = SpreadsheetApp.openById(SHEET_ID)
 .getSheetByName('data_mahasiswa');
 const data = sheet.getDataRange().getDisplayValues();
 for (let i = 1; i < data.length; i++) {
 if (data[i][0].trim() === nim.trim()) {
 return { status: 'success', nim };
 }
 }
 return { status: 'error', message: 'NIM tidak ditemukan' };

}
/* ================= ABSENSI ================= */
function submitAbsensi(data) {
 const sheet = SpreadsheetApp.openById(SHEET_ID)
 .getSheetByName('data_absensi');
 sheet.appendRow([
 new Date(),
 data.nim,
 data.makul,
 data.status
 ]);
 return { status: 'success', message: 'Absensi berhasil' };
}
/* ================= LOAD DATA ================= */
function getAbsensiList() {
 const ss = SpreadsheetApp.openById(SHEET_ID);
 const absensi = ss.getSheetByName('data_absensi').getDataRange().getDisplayValues();
 const mahasiswa = ss.getSheetByName('data_mahasiswa').getDataRange().getDisplayValues();
 const map = {};
 for (let i = 1; i < mahasiswa.length; i++) {
 map[mahasiswa[i][0].trim()] = {
 nama: mahasiswa[i][1],
 prodi: mahasiswa[i][2]
 };
 }
 const result = [];
 for (let i = 1; i < absensi.length; i++) {
 const nim = absensi[i][1].trim();
 if (map[nim]) {
 result.push({
 nama: map[nim].nama,
 nim: nim,
 prodi: map[nim].prodi,
 jam: absensi[i][0],
 makul: absensi[i][2],
 status: absensi[i][3]
 });
 }
 }
 return result;
}
