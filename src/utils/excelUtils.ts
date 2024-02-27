// @packages
import * as XLSX from 'xlsx'
import fs from 'fs'

export async function parseExcelFile (filePath: string): Promise<any[]> {
  try {
    const workbook = XLSX.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)
    return jsonData
  } catch (error) {
    throw new Error('Error reading file')
  }
}

export function deleteFile (filePath: string): void {
  fs.unlink(filePath, () => {})
}
