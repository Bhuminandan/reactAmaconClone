const express = require('express');
const app = express();
const cors = require('cors');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51O5RznSDMcws6tye6xLjKsfFQEjviiYoFZSw7ESQULytPw0JA1qeoWJP9aAxRotCCk6hJvjUewK3aTXqvncpVKin00E728tlsz');

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.listen(7000, () => {
    console.log('Server started at localhost 7000');
});

// Checkout API
app.post('/checkout-create-session', async (req, res) => {
    const { items } = req.body;

    const lineItems = items.map((product) => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.title,
            },
            unit_amount: Math.round(product.price * 100), // Convert price to cents
        },
        quantity: product.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({
            id: session.id
        });
    } catch (error) {
        console.error('Stripe Error:', error);
        res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
    }
});
