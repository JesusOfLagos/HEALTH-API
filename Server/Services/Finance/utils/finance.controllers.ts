import axios from "axios";
import { AxiosRequestConfig } from 'axios';








export async function sendMoneyVia(req: any, res: any) {
  try {
      const {accountNumber, bankCode, reason, amount} : any = req.body
      const options = {
          method: 'POST',
          url: process.env.BASE_URL + 'v1/transfers',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': process.env.PAYMENT_SECRET_KEY,
          },
          data: {
            account_number: accountNumber,
            currency: 'NGN',
            bank_code: bankCode,
            reason: reason,
            amount: amount,
          },
        };
    
        const response = await axios.request(options);
        const data = {
          accountNumber: response.data.data.counterparty.account_number,
          bankName: response.data.data.counterparty.bank_name,
          accountName: response.data.data.counterparty.account_name,
          summary: response.data.data.summary,
          id: response.data.data.id
        }

        const errorData = {
          message: response.data.message,
          errorCode: response.status
        }
    
        // Check if the response status code indicates success (2xx)
        if (response.status >= 200 && response.status < 300) {
          return res.status(200).json({ message: "Transaction was successful", data })
        } else {
          return false
        }
  } catch (error) {
      return res.status(500).json({ message: "Transaction was unsuccessful, Try Again", error })
  }
}







interface Institution {
  // Define the structure of the institution data here
  // For example:
  id: number;
  name: string;
  // Add more fields as needed
}

export async function fetchInstitutions(req: any, res: any) {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: process.env.BASE_URL + 'v1/institutions?page=1&page_size=1&country=NG&type=NUBAN',
    headers: {
      accept: 'application/json',
      Authorization: process.env.PAYMENT_SECRET_KEY,
    }
  };

  try {
    const response = await axios.request(options);
    const resp = response.data 
    return res.status(500).json({ message: "fetched all banks successfully ", resp })
  } catch (error) {
    return res.status(500).json({ message: "Cannot fetch all banks at the moment ", error })
  }
}







interface InstitutionResolveResponse {
  // Define the structure of the response data here
  // For example:
  account_name: string;
  account_number: string;
  bank_code: string;
  bank_name: string;
  // Add more fields as needed
}

export async function resolveInstitution(req: any, res: any) {
    const { accountNumber, bankCode } = req.body
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: process.env.BASE_URL + 'v1/institutions/resolve',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: process.env.PAYMENT_SECRET_KEY
    },
    data: {
      account_number: accountNumber,
      bank_code: bankCode
    }
  };

  try {
    const response = await axios.request(options);
    const resp = response.data
    return res.status(500).json({ message: "Resolved Account Number Successfully ", resp })
  } catch (error) {
    return res.status(500).json({ message: "Cannot resolve account at the moment ", error })
  }
}

