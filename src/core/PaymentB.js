import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartEmpty } from './helper/cartHelper';
import { getMeToken, processPayment } from './helper/paymentB';
import { createOrder } from './helper/orderHelper';
import { isAuthenticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';

const PaymentB = ({ products, setReload = f => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    err: '',
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then(info => {
      // console.log(info);
      if (info.err) return setInfo({ ...info, err: info.err });
      const clientToken = info.clientToken;
      setInfo({ clientToken });
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then(res => {
          console.log('success payment');
          setInfo({ ...info, success: res.success, loading: false });
          const orderData = {
            products,
            transaction_id: res.transaction.id,
            amount: res.transaction.amount,
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {});
          setReload(!reload);
        })
        .catch(err => setInfo({ loading: false, success: false }));
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map(p => (amount += p.price));
    return amount;
  };

  const showDropIn = () => (
    <div>
      {info.clientToken !== null && products.length > 0 ? (
        <>
          {userId ? (
            <div>
              <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={instance => (info.instance = instance)}
              />
              <button
                className="btn btn-success btn-block"
                onClick={onPurchase}
              >
                Buy
              </button>
            </div>
          ) : (
            <h3>
              <Link to="signin">Please Login</Link>
            </h3>
          )}
        </>
      ) : (
        <h3 className="text-white">Add something to cart</h3>
      )}
    </div>
  );

  return (
    <div>
      <h3>Your Bill is ₹{getAmount()}</h3>
      {showDropIn()}
    </div>
  );
};

export default PaymentB;
