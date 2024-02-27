// @packages
import express, { Request, Response } from 'express'

// @scripts
import BrokersService from '../services/brokers.service'
import { convertExcelDateToJSDate } from '../utils/convertExcelDateToJSDate'
import { parseExcelFile, deleteFile } from '../utils/excelUtils'
import { upload } from '../utils/multerConfig'

// @interfaces
import { IBroker } from '../interfaces'

const router = express.Router()
const service = new BrokersService()

function createBrokersFromExcelData (excelData: any[]): IBroker[] {
  return excelData.map((row) => ({
    Time: convertExcelDateToJSDate(row.Time),
    Email: row.Email,
    Nombre: row.Nombre,
    Apellido: row.Apellido,
    Currency: row.Currency,
    Clients: row.Clients,
    Rewards: row.Rewards
  }))
}

router.get('/', async (_: Request, res: Response) => {
  try {
    const brokers = await service.find()

    if (brokers) return res.status(200).json(brokers)
    else return res.status(404).send('Error getting clients')
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
})

router.post('/excel', upload.single('file'), async (req, res) => {
  try {
    const excelData = await parseExcelFile(req?.file?.path as string)
    const brokers = await createBrokersFromExcelData(excelData)

    await service.createMany(brokers)

    deleteFile(req?.file?.path as string)

    res.status(201).send('Brokers imported successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error importing brokers')
  }
})

export default router
