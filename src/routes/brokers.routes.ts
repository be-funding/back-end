// @packages
import * as XLSX from 'xlsx'
import express, { Request, Response } from 'express'
import multer from 'multer'

// @scripts
import BrokersService from '../services/brokers.service'
import { convertExcelDateToJSDate } from '../utils/convertExcelDateToJSDate'

const storage = multer.memoryStorage()
const upload = multer({ storage })

// @interfaces
import { IBroker } from '../interfaces'

const router = express.Router()
const service = new BrokersService()

function createBrokersFromExcelData (excelData: any[]): IBroker[] {
  return excelData.map((row) => ({
    'Registration Date': convertExcelDateToJSDate(row['Registration Date']),
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
    const excelBuffer = req?.file?.buffer

    const workbook = XLSX.read(excelBuffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const excelData = XLSX.utils.sheet_to_json(worksheet)

    const brokers = await createBrokersFromExcelData(excelData)

    await service.createMany(brokers)

    res.status(201).send('Brokers imported successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error importing brokers')
  }
})

export default router
