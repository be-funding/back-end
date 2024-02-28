// @packages
import express, { Request, Response } from 'express'
import multer from 'multer'
import * as XLSX from 'xlsx'; // Import the entire XLSX object

// @scripts
import ClientsService from '../services/clients.service'
import { convertExcelDateToJSDate } from '../utils/convertExcelDateToJSDate'
import { parseExcelFile, deleteFile } from '../utils/excelUtils'
// import { upload } from '../utils/multerConfig'

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
    return res.status(500).send('Internal Server Errorr')
  }
})

router.post('/', async (req, res) => {
  try {
    const newClient = await service.create(req.body)

    if (newClient) return res.status(201).json(newClient)
    else return res.status(404).send('Error creating client')
  } catch (error) {
    return res.status(500).send('Internal Server Errorrr')
  }
})

router.post('/excel', upload.single('file'), async (req, res) => {
  try {
    // Access the file buffer directly
    const excelBuffer = req?.file?.buffer;

    // Parse the Excel file from the buffer
    const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const excelData = XLSX.utils.sheet_to_json(worksheet);

    // Continue with your existing logic using parsed excelData
    const clients = await createClientsFromExcelData(excelData);

    console.log('excelData', excelData);
    console.log('clients', clients);

    await service.createMany(clients);

    res.status(201).send('Clients imported successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error importing clients');
  }
});

export default router
