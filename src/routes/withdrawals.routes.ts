// @packages
import * as XLSX from 'xlsx'
import express, { Request, Response } from 'express'
import multer from 'multer'

// @scripts
import WithdrawalsService from '../services/withdrawals.service'
import { convertExcelDateToJSDate } from '../utils/convertExcelDateToJSDate'

const storage = multer.memoryStorage()
const upload = multer({ storage })

// @interfaces
import { IWithdrawal } from '../interfaces'

const router = express.Router()
const service = new WithdrawalsService()

function createWithdrawalsFromExcelData (excelData: any[]): IWithdrawal[] {
  return excelData.map((row) => ({
    Time: convertExcelDateToJSDate(row.Time),
    transaction_id: Math.floor(1000 + Math.random() * 9000),
    Email: row.Email,
    Amount: row.Amount,
    'Net Amount': row['Net Amount'],
    Currency: row.Currency,
    Status: row.Status,
    'Payment Gateway': row['Payment Gateway']
  }))
}

router.get('/', async (_: Request, res: Response) => {
  try {
    const withdrawals = await service.find()

    if (withdrawals) return res.status(200).json(withdrawals)
    else return res.status(404).send('Error getting withdrawals')
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
})

router.post('/excel', upload.single('file'), async (req, res) => {
  try {
    const excelBuffer = req?.file?.buffer

    const workbook = XLSX.read(excelBuffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const excelData = XLSX.utils.sheet_to_json(worksheet)
    
    const deposits = await createWithdrawalsFromExcelData(excelData)

    await service.createMany(deposits as any)

    res.status(201).send('Withdrawals imported successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error importing withdrawals')
  }
})

export default router
