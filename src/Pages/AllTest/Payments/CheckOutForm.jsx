import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import AxiosSecure from "../../../Hooks/AxiosSecure";
import PropTypes from 'prop-types';
import useAuth from "../../../Hooks/useAuth";
import moment from 'moment';
import toast from "react-hot-toast";




const CheckOutForm = ({ price, _id }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transitionId, setTransitionId] = useState("");
    const axiosSecure = AxiosSecure();
    const { user } = useAuth();
    const currentDate = moment();
    const formattedDate = currentDate.format('DD/MM/YYYY');

    console.log(clientSecret)


    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
            .catch(error => {
                console.log(error)
            })
    }, [axiosSecure, price])






    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if (error) {
            console.log("payment error", error);
            setError(error.message)
        } else {
            console.log("payment method", paymentMethod);
            setError("")
        }


        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log("confirm Error");
        } else {
            console.log("PaymentIntent", paymentIntent);

            if (paymentIntent.status === "succeeded") {
                console.log("TransitionId", paymentIntent.id);
                setTransitionId(paymentIntent.id)
            }
            // now saving the payment in the database
            const payment = {
                email: user.email,
                price: price,
                transactionId: paymentIntent.id,
                date: formattedDate,
                TestId: _id,
                status: 'pending'
            }

            const res = await axiosSecure.post('/payments', payment);
            console.log('payment saved', res.data);
            // refetch();
            if (res.data?.insertedId) {
                toast.success('payment Successfully!')
                // navigate('/dashboard/paymentHistory')
            }

        }

    }






    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            >

            </CardElement>
            <button className="btn bg-[#219ebc] hover:bg-[#3c738f] text-white mt-1 m-5" type="submit" disabled={!stripe || !clientSecret} > pay</button>
            <p className="text-red-700">
                {error}
            </p>


        </form>
    );
};
CheckOutForm.propTypes = {
    price: PropTypes.number,
    _id: PropTypes.string,
};
export default CheckOutForm;