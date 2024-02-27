// @packages
import express, { Request, Response } from 'express'

// @scripts
import SalesService from '../services/sales.service'
import { convertExcelDateToJSDate } from '../utils/convertExcelDateToJSDate'
import { parseExcelFile, deleteFile } from '../utils/excelUtils'
import { upload } from '../utils/multerConfig'

// @interfaces
import { ISale } from '../interfaces'

const router = express.Router()
const service = new SalesService()

function createSalesFromExcelData (excelData: any[]): ISale[] {
  return excelData.map((row) => ({
    Login: row.Login,
    Email: row.Email,
    'Transaction Time': convertExcelDateToJSDate(row['Transaction Time']),
    Amount: row.Amount,
    Currency: row.Currency,
    'Payment Method': row['Payment Method'],
    'Codigo Bono': row['Codigo Bono'],
    Descuento: row.Descuento
  }))
}

router.get('/', async (_: Request, res: Response) => {
  try {
    const sales = await service.find()

    if (sales) return res.status(200).json(sales)
    else return res.status(404).send('Error getting sales')
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
})

router.post('/excel', upload.single('file'), async (req, res) => {
  try {
    const excelData = await parseExcelFile(req?.file?.path as string)
    const sales = await createSalesFromExcelData(excelData)

    await service.createMany(sales as any)

    deleteFile(req?.file?.path as string)

    res.status(201).send('Sales imported successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error importing sales')
  }
})

export default router
