import React from "react";
import axios from "../api/paymentApi";

import { env_variable } from "../config/env.js";

const PaymentForm = () => {
  const handlePayment = async () => {

    const { data: order } = await axios.post("/payment/createOrder", {
      amount: 500,
      currency: "INR",
    });

    console.log("key is ",env_variable.razorpay_keyID);
    console.log("secret is ",env_variable.razorpay_keySecret);

    const options = {

      key: env_variable.razorpay_keyID,
      amount: order.amount,
      currency: order.currency,
      name: "Your App Name",
      description: "Test Transaction",
      order_id: order.id,
      

      method:{
        "netbanking": false,
        // "card": false,
        "upi": true,
        "wallet": false,
        "emi": false,
        "paylater": false,

      },


      handler: async function (response) {
        const paymentResult = {
          order_id: order.id,
          payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        console.log("in between the options")
        console.log(options);

        const verify = await axios.post(
          "/payment/verifyPayment",
          paymentResult
        );

        if (verify.data.message === "Payment verified successfully") {
          alert("Payment successful!");
        } else {
          alert("Payment verification failed!");
        }
      },

      prefill: {
        name: "Your Name",
        email: "your.email@example.com",
        contact: "9999999999",
      },
    };
    console.log("outside the options");
    console.log(options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <h2>Complete Your Payment</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentForm;