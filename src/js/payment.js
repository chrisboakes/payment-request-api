/* global PaymentRequest */
/**
 * Fiddling around with the Payment Request API
 * @param querySelector paymentButton - the class of the item we're using to trigger the click
 * @author Chris Boakes
 */
export default class {
    constructor() {
        this.initPayment();

        this.paymentButton = document.querySelector('.js-pay');
        this.setButtonListener();
    }

    /**
     * Initialise our app
     */
    initPayment() {
        const supportedPaymentMethods = [{
            supportedMethods: ['basic-card']
        }];
        const paymentDetails = this.getPaymentDetails();
        const options = {
            requestPayerEmail: true
        };
        this.pay = new PaymentRequest(
            supportedPaymentMethods,
            paymentDetails,
            options
        );
    }

    /**
     * Watch for click
     */
    setButtonListener() {
        this.paymentButton.onclick = (e) => {
            e.preventDefault();
            this.makePayment();
        };
    }

    /**
     * Handle the PaymentRequest
     */
    makePayment() {
        if (this.pay.canMakePayment()) {
            this.pay.show().then((paymentResponse) => {
                // The user filled in the required fields and completed the flow
                // Get the details from `paymentResponse` and complete the transaction.
                return this.sendPayment(paymentResponse);
            }).catch((err) => {
                // The API threw an error or the user closed the UI
                console.log('ERROR', err);
            });
        } else {
            throw new Error('Sorry, we cannot make the payment right now.');
        }
    }

    /**
     * Here is where you would pass the Payment Request object to a third party
     * @param  PaymentRequest paymentResponse
     */
    sendPayment(paymentResponse) {
        // Send it to payment vendor here
        console.log(paymentResponse);
    }

    /**
     * Fetch some sample data
     * @return Object
     */
    getPaymentDetails() {
        return {
            total: {
                label: 'Total',
                amount: {
                    currency: 'GBP',
                    value: 100
                }
            },
            displayItems: this.getDisplayItems()
        };
    }

    /**
     * Some sample data
     * @return Array
     */
    getDisplayItems() {
        return [
            {
                label: 'Subtotal',
                amount: {
                    currency: 'GBP',
                    value: 110
                }
            }, {
                label: 'Discount (10%)',
                amount: {
                    currency: 'GBP',
                    value: -10
                }
            }
        ];
    }
}
