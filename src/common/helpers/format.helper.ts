export function getRandomString(length: any) {
  var randomChars: any =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  // var randomChars2: any =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result: any = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
export function timeConverter(UNIX_timestamp: any) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}
export function toThaiDate(date: any) {
  let monthNames = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ];
  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();
  let hour = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let second = date.getSeconds().toString().padStart(2, '0');
  return `${numOfDay} ${month} ${year} ` + `${hour}:${minutes}:${second} น.`;
}
export function toEnDate(date: any) {
  let monthNames = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May.',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];
  let monthNameslong = [
    'January',
    'February',
    'March.',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let year = date.getFullYear() + 0;
  let month = monthNameslong[date.getMonth()];
  let numOfDay = date.getDate();
  let hour = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let second = date.getSeconds().toString().padStart(2, '0');
  return `${numOfDay} ${month} ${year} ` + `${hour}:${minutes}:${second}`;
}
export function getRandomint(length: any) {
  var randomChars: any = '0123456789';
  var result: any = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
export function getRandomsrtsmall(length: any) {
  var randomChars: any = 'abcdefghijklmnopqrstuvwxyz';
  var result: any = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
export function getRandomsrtbig(length: any) {
  var randomChars: any = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var result: any = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
}
export function timeConvertermas(a: any) {
  let year: any = a.getFullYear();
  var month: any = (a.getMonth() + 1).toString().padStart(2, '0');
  var date: any = a.getDate().toString().padStart(2, '0');
  var hour: any = a.getHours().toString().padStart(2, '0');
  var min: any = a.getMinutes().toString().padStart(2, '0');
  var sec: any = a.getSeconds().toString().padStart(2, '0');
  //var time: any = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
  var time: any =
    year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
  //console.log('timeConvertermas a: ' + a)
  //console.log('timeConvertermas time: ' + time)
  return time;
}
export function timeConvertermas2(a: any) {
  let year: any = a.getFullYear();
  var month: any = (a.getMonth() + 1).toString().padStart(2, '0');
  var date: any = a.getDate().toString().padStart(2, '0');
  var hour: any = a.getHours().toString().padStart(2, '0');
  var min: any = a.getMinutes().toString().padStart(2, '0');
  var sec: any = a.getSeconds().toString().padStart(2, '0');
  var time: any =
    date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}
export function timeConverterDMY(a: any) {
  let year: any = a.getFullYear();
  var month: any = (a.getMonth() + 1).toString().padStart(2, '0');
  var date: any = a.getDate().toString().padStart(2, '0');
  var hour: any = a.getHours().toString().padStart(2, '0');
  var min: any = a.getMinutes().toString().padStart(2, '0');
  var sec: any = a.getSeconds().toString().padStart(2, '0');
  var time: any =
    date + '/' + month + '/' + year;
  return time;
}
export function checkEmail(email: any) {
  //console.log('email: ' + email)
  const filter =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //console.log('email_filter: ' + filter);
  if (!filter.test(email)) {
    return false;
  } else {
    return true;
  }
}
export function CurrentDateTimeForSQL() {
  const now = new Date();
  return now.toISOString();
}
export function getCurrentDateTimeForSQL() {
  const now = new Date();
  return now.toISOString();
}
export function DateTimeForSQL(Date) { 
  return Date.toISOString();
}
export function DateTimeDMY(Date) { 
  return Date.toISOString('DD-MM-YYYY');
}
export function customToISOString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
export function customToISOStringDMY(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}/${month}/${year}`;
}
export function toSnakeCaseUpper(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
}
export function convertSortInput(
  str: string,
): { sortField: string; sortOrder: string } | false {
  // Split the string by '-'
  const parts = str.split('-');

  // Check if the split parts meet the required conditions
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    return false;
  }

  // Convert the first part to snake case upper
  const sortField = parts[0]
    .replace(/[A-Z]/g, (letter) => `_${letter}`)
    .toUpperCase();

  // Convert the second part to upper case
  const sortOrder = parts[1].toUpperCase();

  // Check if the second part is 'ASC' or 'DESC'
  if (sortOrder !== 'ASC' && sortOrder !== 'DESC') {
    return false;
  }

  return { sortField, sortOrder };
}
export function formatISODate(isoDateString, format) {
  const date = new Date(isoDateString);
  const options:any = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
export function convertISOToLocalDate(isoDateString) {
  const date = new Date(isoDateString);
  const utcMilliseconds = date.getTime();
  const offset = date.getTimezoneOffset() * 60 * 1000;

  return new Date(utcMilliseconds + offset);
}
export function convertISOToSpecificFormat(isoDateString, format) {
  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return format
    .replace('dd', day)
    .replace('mm', month)
    .replace('yyyy', year);
}
export function convertISOToFormatAndTimezone(isoDateString, format, targetTimezone) {
  const date = new Date(isoDateString);
  const options:any = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: targetTimezone
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
export function toJSON() {
  // new Date(NaN).toJSON() === null
  return this.isValid() ? this.toISOString() : null;
}

/*
  const isoDateString = "2023-08-18T12:00:00.000Z";
  const formattedDate = convertISOToSpecificFormat(isoDateString, 'dd/mm/yyyy');
  console.log(formattedDate);
*/

/*
  const isoDateString = "2023-08-18T12:00:00.000Z";
  const formattedDate =
  convertISOToFormatAndTimezone(isoDateString, 'yyyy-MM-dd HH:mm:ss', 'America/New_York');
  console.log(formattedDate);
  // Output: Aug 18, 2023, 8:00:00 AM
*/