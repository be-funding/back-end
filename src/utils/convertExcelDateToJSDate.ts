export const convertExcelDateToJSDate = (excelDate: number): string => {
  if (typeof excelDate === 'string') return excelDate

  const millisecondsSince1970 = (excelDate - 25569) * 86400 * 1000
  const date = new Date(millisecondsSince1970)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  if (hours === '00' && minutes === '00' && seconds === '00') {
    return `${year}-${month}-${day}`
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
}
