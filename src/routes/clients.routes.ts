// @packages
import * as XLSX from 'xlsx'
import express, { Request, Response } from 'express'
import multer from 'multer'

// @scripts
import ClientsService from '../services/clients.service'
import { convertExcelDateToJSDate } from '../utils/convertExcelDateToJSDate'

const storage = multer.memoryStorage()
const upload = multer({ storage })

// @interfaces
import { IClient } from '../interfaces'

const router = express.Router()
const service = new ClientsService()

function createClientsFromExcelData (excelData: any[]): IClient[] {
  return excelData.map((row) => ({
    create_time: convertExcelDateToJSDate(row.create_time),
    Email: row.Email,
    Nombre: row.Nombre,
    Apellidos: row.Apellidos,
    Status: row.Status,
    phone: row.phone,
    Country: row.Country
  }))
}

router.get('/', async (_: Request, res: Response) => {
  try {
    const clients = await service.find()

    if (clients) return res.status(200).json(clients)
    else return res.status(404).send('Error getting clients')
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
})

router.post('/', async (req, res) => {
  try {
    const newClient = await service.create(req.body)

    if (newClient) return res.status(201).json(newClient)
    else return res.status(404).send('Error creating client')
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

    const clients = await createClientsFromExcelData(excelData)

    await service.createMany(clients)

    res.status(201).send('Clients imported successfully')
  } catch (error) {
    console.error(error);
    res.status(500).send('Error importing clients')
  }
})

export default router
