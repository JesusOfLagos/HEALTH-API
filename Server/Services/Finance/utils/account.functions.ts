import axios, { AxiosRequestConfig } from 'axios'; // Import Axios and AxiosRequestConfig
import User from '../../../Models/User/user.model';




export async function getTransaction (transactionId: any) {
    const url = process.env.BASE_URL + 'v1/transactions/' + transactionId;
  
    const headers = {
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': process.env.PAYMENT_SECRET_KEY as string,
    };
  
    try {
      const response = await axios.get(url, { headers });
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      console.log(error);
      throw error;
      
    }
  }


  

export async function buyAirtimeWithMaplerad (phoneNumber: any, Amount: any) {
    const url = process.env.BASE_URL + 'v1/bills/airtime';
  
    const requestData = {
      phone_number: phoneNumber,
      identifier: 'ng-airtime',
      amount: Amount,
    };
  
    const headers = {
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': process.env.PAYMENT_SECRET_KEY as string,
    };
  
    try {
      const response = await axios.post(url, requestData, { headers });
      console.log(response.data);
      return response.data;
      
    } catch (error) {
      console.log(error);
      throw error;
      
    }
  }
  
  
  


  export async function createBankAccount(customerId: string): Promise<any> {
    const url = process.env.BASE_URL + 'v1/collections/virtual-account';
  
    const requestData = {
      customer_id: customerId,
      currency: 'NGN',
      preferred_bank: '1051',
      meta: {},
    };
  
    const headers = {
      'Authorization': process.env.PAYMENT_SECRET_KEY as string,
      'accept': 'application/json',
      'content-type': 'application/json',
    };
  
    try {
      const response = await axios.post(url, requestData, { headers });
      return response.data;
    } catch (error) {
      return error;
    }
  }
  

