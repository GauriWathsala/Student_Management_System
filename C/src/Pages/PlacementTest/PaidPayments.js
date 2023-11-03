
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../../helpers/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import './PaidPayment.scss'

// const PaidPayments = ({ courseFee }) => {
//   const [payments, setPayments] = useState([]);
//   const { authState } = useContext(AuthContext);
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const stuId = authState.username;
//     axios.get(`http://localhost:3001/payment/${stuId}`)
//       .then(response => {
//         setPayments(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching payment details:', error);
//       });
//   }, [authState.username]);

//   const handleMakeInstallmentClick = () => {
//     navigate('/installmentpayment');
//   };

//   const groupedPayments = {};
//   payments.forEach(payment => {
//     const installmentOrder = payment.installmentOrder;
//     if (!groupedPayments[installmentOrder]) {
//       groupedPayments[installmentOrder] = [];
//     }
//     groupedPayments[installmentOrder].push(payment);
//   });

//   const coursePayments = payments.filter(payment => payment.details === 'Course Fee');

 
//   const totalPaid = coursePayments.reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
//   const remainingAmount = courseFee - totalPaid;

//   return (
//     <div className='payment-history'>
//       <h2 id='payment-his'>Payment History</h2>
      
//       <ul>
//         {payments.map(payment => {
//           const remainingAmount = courseFee - payment.amountPaid;
//           const createdAtDate = new Date(payment.createdAt);
//           const formattedDate = createdAtDate.toISOString().substr(0, 10);

//           return (
//             <li key={payment.paymentId} className='payment-history-details'>
//               Date: {formattedDate} <br/>
//               Reason: {payment.details}<br />
//               Paid Amount:Rs {payment.amountPaid}<br />
//               Payment Type: {payment.paymentType}<br />
//               Payment Method: {payment.paymentMethod}<br />
//              <br /> <br />
//               {payment.amountPaid < courseFee ? (
//                 <div>
//                   <p className='payment-calculation'>Amount to be paid: Rs {remainingAmount}</p>
//                 </div>
//               ) : payment.amountPaid === courseFee ? (
//                 <p id='payment-complete'>Payment is completed</p>
//               ) : null}
//             </li>
//           );
//         })}
//       </ul>
//       <p  className='payment-calculation'>Total Paid: Rs {totalPaid.toFixed(2)}</p>
//       <p  className='payment-calculation'>Amount to be Paid:Rs {remainingAmount.toFixed(2)}</p>

//       {remainingAmount > 0 && (
//         <button onClick={handleMakeInstallmentClick} id='make-next-installment-button'>Make Next Installment</button>
//       )}
//     </div>
//   );
// }

// export default PaidPayments;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';
import './PaidPayment.scss';

const PaidPayments = ({ courseFee }) => {
  const [payments, setPayments] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const stuId = authState.username;
    axios
      .get(`http://localhost:3001/payment/${stuId}`)
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payment details:', error);
      });
  }, [authState.username]);

  const handleMakeInstallmentClick = () => {
    navigate('/installmentpayment');
  };

  const groupedPayments = {};
  payments.forEach((payment) => {
    const installmentOrder = payment.installmentOrder;
    if (!groupedPayments[installmentOrder]) {
      groupedPayments[installmentOrder] = [];
    }
    groupedPayments[installmentOrder].push(payment);
  });

  const coursePayments = payments.filter(
    (payment) => payment.details === 'Course Fee'
  );

  const totalPaid = coursePayments.reduce(
    (sum, payment) => sum + parseFloat(payment.amountPaid),
    0
  );
  const remainingAmount = courseFee - totalPaid;

  return (
    <div className='payment-history'>
      <h2 id='payment-his'>Payment History</h2>

      <table className='payment-history-table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Reason</th>
            <th>Paid Amount</th>
            <th>Payment Type</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            {/* <th>Remaining Amount</th> */}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => {
            const createdAtDate = new Date(payment.createdAt);
            const formattedDate = createdAtDate.toISOString().substr(0, 10);
            const remainingAmount = courseFee - payment.amountPaid;

            return (
              <tr key={payment.paymentId} className='payment-history-details'>
                <td>{formattedDate}</td>
                <td>{payment.details}</td>
                <td>Rs {payment.amountPaid}</td>
                <td>{payment.paymentType}</td>
                <td>{payment.paymentMethod}</td>
                <td>
                  {payment.amountPaid < courseFee ? (
                    `Rs ${remainingAmount}`
                  ) : payment.amountPaid === courseFee ? (
                    <span id='payment-calculation'>Payment is completed</span>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className='payment-calculation'>Total Paid: Rs {totalPaid.toFixed(2)}</p>
      <p className='payment-calculation'>Amount to be Paid: Rs {remainingAmount.toFixed(2)}</p>

      {remainingAmount > 0 && (
        <button onClick={handleMakeInstallmentClick} id='make-next-installment-button'>
          Make Next Installment
        </button>
      )}
    </div>
  );
};

export default PaidPayments;








