/* eslint-disable no-underscore-dangle */
const {
  makePayment,
  createPayment,
  createCustomer,
  retrieveCustomer,
} = require('./checkout.service');
const { updateUser } = require('../user/user.service');

async function handlerCheckout(request, response) {
  const { paymentMethod, amount } = request.body;
  try {
    let customer = await retrieveCustomer(request.user?.payment?.customerId);
    if (!customer) {
      customer = await createCustomer(request.user, paymentMethod);
    }
    const userToUpdate = {
      payment: {
        customerId: customer.id,
        cards: [{
          ...paymentMethod.card,
          paymentMethodId: paymentMethod.id,
        }],
      },
    };
    await updateUser(request.user._id, userToUpdate);
    const payment = await makePayment({ paymentMethod, amount, customer });
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
