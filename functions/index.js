const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  console.log(data.products);

  let lineItems = [];
  const items = data.products;
  const quantities = data.quantities;

  items.forEach((item, index) => {
    lineItems.push({
      quantity: quantities[index],
      price_data: {
        currency: "usd",
        unit_amount: 100 * item.price,
        product_data: {
          name: item.name,
        },
      },
    });
  });

  const stripe = require("stripe")(functions.config().stripe.secret_key);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cart",
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
  });

  return {
    id: session.id,
  };
});

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);

  let event;

  try {
    const webhookSecret = functions.config().stripe.payments_webhook_secret;

    event = stripe.webhooks.constructEvent(
      req.rawBody,
      req.headers["stripe-signature"],
      webhookSecret
    );
  } catch (error) {
    console.error("Webhook signature verification failed.");
    return res.sendStatus(400);
  }

  return admin
    .database()
    .ref("/orders")
    .push(event)
    .then((snapshot) => {
      return res.json({ received: true, ref: snapshot.ref.toString() });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).end();
    });
});
