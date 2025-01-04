import Stripe from "stripe";
import 'dotenv/config';
// console.log(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createPaymentIntent(req, res){
    const { amount } = req.body;
    
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });
        res.status(200).send({clientSecret: paymentIntent.client_secret});
    } catch (error) {
        res.status(500).send({message: "Error processing payment", error});
    }
}