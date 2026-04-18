import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Razorpay
//this is the instance of razorpay and it is used to create order and verify payment
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,   // Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET,  // Razorpay Key Secret
});

// Log to check if keys are loaded correctly
//console.log("Razorpay Key ID: ", process.env.RAZORPAY_KEY_ID);   // Should print the key ID
//console.log("Razorpay Key Secret: ", process.env.RAZORPAY_KEY_SECRET); // Should print the key secret

export const  createOrder = async (req, res) => {
    const { amount, currency } = req.body;
    //options is the object which is used to create order and it contains the amount, currency and receipt
    const options = {
      amount: amount * 100, // Amount in the smallest currency unit (paise for INR)
      currency: currency || "INR",  // Default to INR if currency not provided
      receipt: `receipt_${Date.now()}`
    };
    
    // Log the options to check if they are correct before creating the order
    console.log("Creating Razorpay order with options: ", options);
    //now we will create order using the options and we will send the order details to the client
    try {
      const order = await razorpayInstance.orders.create(options);
      console.log("Order created successfully: ", order);
      //order is created successfully and we will send the order details to the client on the
      res.status(200).json(order);
      
    } 
    catch (error) {
        // Log the error to check what went wrong while creating the order
      console.error("Error while creating Razorpay order: ", error);
      res.status(500).json({ error: "Failed to create Razorpay order", details: error });
    }
  };
  

// Verify Razorpay payment
export const verifyPayment = (req, res) => {
    const { order_id, payment_id, razorpay_signature } = req.body;
    const body = order_id + "|" + payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        res.status(200).json({ message: "Payment verified successfully" });
    } else {
        res.status(400).json({ message: "Invalid payment signature" });
    }
};