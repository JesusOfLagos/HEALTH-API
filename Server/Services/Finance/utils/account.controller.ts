import axios, { AxiosRequestConfig } from 'axios'; // Import Axios and AxiosRequestConfig
import User from '../../../Models/User/user.model';
import { buyAirtimeWithMaplerad, getTransaction } from './account.functions';
import PaymentDetail from '../models/payment.model';



interface CustomerData {
  email: string;
  first_name: string;
  last_name: string;
  country: string;
}

export async function postCustomerData(email: string, firstName: string, lastName: string): Promise<any> {
  const requestData: CustomerData = {
    email,
    first_name: firstName,
    last_name: lastName,
    country: 'NG',
  };

  const url = process.env.BASE_URL + `v1/customers`
  const config: AxiosRequestConfig = {
    headers: {
      'Authorization': process.env.PAYMENT_SECRET_KEY as string,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(url, requestData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
}





interface CollectionData {
  customer_id: string;
  currency: string;
  preferred_bank: string;
  meta: {
    // occupation: string;
    // bank_statement: string;
    // identity_type: string;
    // identity_issued_date: string;
    // identity_expiration: string;
  };
}




export async function createAccount (req: any, res: any): Promise<any> {
  const url = process.env.BASE_URL + 'v1/collections/virtual-account';
  // const customerId = "98df4d1e-da81-4f18-a876-796980031911";
  const customerId = req.body.customerId;
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
    // Send a simplified JSON response without circular references
    res.status(200).json({ message: 'Account created successfully', responseData: response.data });
    // return response.data;
  } catch (error) {
    console.log(error)
    res.status(500).json({ Error: 'An error occurred', error }); // Handle errors gracefully
    return
  }
}









export async function buyAirtime (req: any, res: any) {
  try {
    const { phoneNumber, amount, userId } = req.body;
    const user = await User.findById(userId).populate('wallet').exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const Amount = amount / 100;
    if (user.wallet.balance < Amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // await withdraw(user.wallet._id, Amount);
    user.wallet.balance -= Amount;
    await user.wallet.save();
    const success = await buyAirtimeWithMaplerad(phoneNumber, amount)
    const transactionId = success.data.id
    return res.status(200).json({ message: 'Airtime Purchased successfully', success });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong while purchasing airtime' , error });
    // console.log(error);
  }
}





export async function getTransactionStatus (req: any, res: any) {
  try {
    const { transactionId } = req.params
    // const success = await getTransaction(transactionId)
    // console.log(success);
    // return res.status(200).json({ message: 'Transaction status fetched successfully', success });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong while fetching transaction status' , error });
    // console.log(error);
  }
}

// export async function getAllTransactions (req: any, res: any) {
//   try {
//     const userId = req.body.userId
//     const payments = await PaymentDetail.find({ user: userId })
//     if (payments) {
//       for (let i = 0; i < payments.length; i++) {
//         const transactionId = payments[i].paymentId
//         const success = await getTransaction(transactionId)
//         if (success) {
//           console.log(success);
//           return res.status(200).json({ message: 'Transaction status fetched successfully', success });
//         }
//         console.log(success);
//         return res.status(200).json({ message: 'Transaction status fetched successfully', success });
//       }
//     } else if (!payments) {
//       return res.status(404).json({ message: 'No transaction found' });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: 'Something went wrong while fetching transaction status' , error });
//   }
// }

export async function getAllTransactions(req:any, res:any) {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const payments = await PaymentDetail.find({ user: userId });
    console.log(payments);

    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: 'No transactions found' });
    }

    // const transactionPromises = payments.map(async (payment) => {
      // const transactionId = payment.paymentId;
      // const success = await getTransaction(transactionId);
      // return { transactionId, success };
    // });

    // const transactionResults = await Promise.all(transactionPromises);

    return res.status(200).json({
      message: 'Transaction status fetched successfully',
      // transactions: transactionResults,
      payments
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Something went wrong while fetching transaction status',
      error,
    });
  }
}

export async function getAllPaymentDetails (req: any, res: any) {
  try {
    // const userId = req.body.userId
    const payments = await PaymentDetail.find({})
    if (payments) {
      return res.status(200).json({ message: 'Payment details fetched successfully', payments });
    } else if (!payments) {
      return res.status(404).json({ message: 'No payment details found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong while fetching payment details' , error });
  }
}


export async function createPaymentDetails (req: any, res: any) {
  try {
    const { userId, date, amount, description } = req.body;
    const payment = new PaymentDetail({
      user: userId,
      amount,
      date: date,
      description,
      hospital: {
        name: 'MapleHealth',
        bankCode: '125',
        accountNumber: '1234567890',
        bankName: 'UBA',
      },
      isPaid: false,
    });
    await payment.save();
    return res.status(200).json({ message: 'Payment details created successfully', payment });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong while creating payment details' , error });
  }
}


export async function getAllBillers (req: any, res: any) {
  const url = process.env.BASE_URL + 'v1/bills/airtime/billers/NG';

  const headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'Authorization': process.env.PAYMENT_SECRET_KEY as string,
  };

  try {
    const response = await axios.get(url, { headers });
    console.log(response.data);
    const resp = response.data
    return res.status(200).json({ message: 'Billers fetched successfully', resp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong while fetching billers' , error });
  }
}

export async function getAirtimeHistory (req: any, res: any) {
  const url = process.env.BASE_URL + 'v1/bills/airtime';

  const headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'Authorization': process.env.PAYMENT_SECRET_KEY as string,
  };

  try {
    const response = await axios.get(url, { headers });
    console.log(response.data);
    const resp = response.data
    return res.status(200).json({ message: 'Billers fetched successfully', resp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong while fetching billers' , error });
  }
}

