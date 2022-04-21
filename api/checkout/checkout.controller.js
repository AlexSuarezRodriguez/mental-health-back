const { makePayment, createPayment, createCustomer } = require('./checkout.service');

async function handlerCheckout(request, response) {
  const { paymentMethod, amount } = request.body;
  try {
    const customer = await createCustomer(request.user, paymentMethod);
    const payment = await makePayment({ paymentMethod, amount });
    const registeredPayment = {
      refId: payment.id,
      description: payment.description,
      value: payment.amount,
      currency: payment.currency,
      userId: request.user.id,
    };
    await createPayment(registeredPayment);
    response.json(payment);
  } catch (error) {
    response.status(500).json(error);
  }
}

module.exports = {
  handlerCheckout,
};
