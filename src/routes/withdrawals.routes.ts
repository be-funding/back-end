// @packages
import express, { Request, Response } from 'express'

// @scripts
import WithdrawalsService from '../services/withdrawals.service'
import { convertExcelDateToJSDate } from '../utils/convertExcelDateToJSDate'
import { parseExcelFile, deleteFile } from '../utils/excelUtils'
import { upload } from '../utils/multerConfig'

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
    const excelData = await parseExcelFile(req?.file?.path as string)
    const deposits = await createWithdrawalsFromExcelData(excelData)

    await service.createMany(deposits as any)

    deleteFile(req?.file?.path as string)

    res.status(201).send('Withdrawals imported successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error importing withdrawals')
  }
})

export default router
