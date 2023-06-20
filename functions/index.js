const functions = require("firebase-functions");

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
    cancel_url: "http://localhost:3000/cancel",
    line_items: lineItems,
  });

  return {
    id: session.id,
  };
});
