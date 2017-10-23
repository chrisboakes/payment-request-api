import Payment from './payment';

// The Payment Request API is a new JavaScript API that makes it easy to
// collect payment information that can then be sent to a payment processor
// such as Stripe. The aim is to improve payment UX by making it easy for
// users to save their card information with the browser. The API itself
// is developed openly through the W3C and with the participation of Google
// and Microsoft primarily.

// The browser supports payment request
if (window.PaymentRequest) {
    new Payment();
}
