export interface IUser {
  username: string;
  password: string;
}

export interface IClient {
  create_time: string;
  Email: string;
  Nombre: string;
  Apellidos: string;
  Status: number;
  phone: string;
  Country: string;
}

export interface IDeposit {
  Time: string;
  transaction_id: number;
  Email: string;
  Amount: number;
  'Net Amount': number;
  Currency: string;
  Status: string;
  'Payment Gateway': string;
}
export interface IWithdrawal {
  Time: string;
  transaction_id: number;
  Email: string;
  Amount: number;
  'Net Amount': number;
  Currency: string;
  Status: string;
  'Payment Gateway': string;
}

export interface ISale {
  Login: number;
  Email: string;
  'Transaction Time': string;
  Amount: number;
  Currency: string;
  'Payment Method': string;
  'Codigo Bono': string;
  Descuento: number;
}

export interface IBroker {
  'Registration_Date': string;
  Email: string;
  Nombre: string;
  Apellido: string;
  Currency: number;
  Clients: number;
  Rewards: string;
}
