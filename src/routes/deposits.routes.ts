// @packages
import express, { Request, Response } from 'express'

// @scripts
import DepositsService from '../services/deposits.service'
import { convertExcelDateToJSDate } from '../utils/convertExcelDateToJSDate'
import { parseExcelFile, deleteFile } from '../utils/excelUtils'
import { upload } from '../utils/multerConfig'

// @interfaces
import { IDeposit } from '../interfaces'

const router = express.Router()
const service = new DepositsService()

function createDepositsFromExcelData (excelData: any[]): IDeposit[] {
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
    const deposits: IDeposit[] = await service.find()

    if (deposits) return res.status(200).json(deposits)
    else return res.status(404).send('Error getting deposits')
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
})

router.post('/excel', upload.single('file'), async (req, res) => {
  try {
    const excelData = await parseExcelFile(req?.file?.path as string)
    const deposits = await createDepositsFromExcelData(excelData)

    await service.createMany(deposits as any)

    deleteFile(req?.file?.path as string)

    res.status(201).send('Clients imported successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error importing clients')
  }
})

export default router
