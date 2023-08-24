const express = require("express");
const paymentRouter = express.Router()
const FundRaiser = require("../../Controllers/Payment/fundraiser.controller")



paymentRouter.post('/create-a-fundraiser', FundRaiser.CreateAFundraiser)
paymentRouter.post('/payemnts/initiate', FundRaiser.InitiatePaymentsForAFundraiser)
paymentRouter.post('/payments/pause', FundRaiser.PausePaymentForAFundraiser)

