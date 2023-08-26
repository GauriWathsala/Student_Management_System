// import React , { useState, useEffect, useContext }from 'react'
// import axios from 'axios';
// import { AuthContext } from '../../helpers/AuthContext';

// const PaidPayments = ({ courseFee }) => {
//     const [payments, setPayments] = useState([]);
//     const { authState } = useContext(AuthContext);
  

//  useEffect(() => {
//     const stuId = authState.username; 
//     axios.get(`http://localhost:3001/payment/${stuId}`)
//       .then(response => {
//         setPayments(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching payment details:', error);
//       });
//   }, [authState.username]);



//   return (
//     <div>
//       <h2>Payment History</h2>
//       <ul>
//         {payments.map(payment => (
//           <li key={payment.paymentId}>
           
//             Paid Amount: {payment.amountPaid}<br />
//             Payment Type: {payment.paymentType}<br />
//             Payment Method: {payment.paymentMethod}<br />
//             Date: {payment.createdAt}<br />
            
//           </li>
//         ))}
//       </ul>
      
//     </div>
//   )
// }

// export default PaidPayments




// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../../helpers/AuthContext';

// const PaidPayments = ({ courseFee }) => {
//   const [payments, setPayments] = useState([]);
//   const { authState } = useContext(AuthContext);
  
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

  
 

//   return (
//     <div>
//       <h2>Payment History</h2>
//       <ul>
//         {payments.map(payment => (
            
//           <li key={payment.paymentId}>
//             Paid Amount: {payment.amountPaid}<br />
//             Payment Type: {payment.paymentType}<br />
//             Payment Method: {payment.paymentMethod}<br />
//             Date: {payment.createdAt}<br />
//             {payment.amountPaid < courseFee ? (
//               <div>
//                 <p>Amount to be paid: {courseFee - payment.amountPaid}</p>
//                 <button>Make Next Installment</button>
//               </div>
//             ) : payment.amountPaid === courseFee ? (
//               <p>Payment is completed</p>
//             ) : null}

//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default PaidPayments;



// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../../helpers/AuthContext';
// import { useNavigate } from 'react-router-dom';

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


//   return (
//     <div>
//       <h2>Payment History</h2>
      
//       <ul>
//         {payments.map(payment => {
//           const remainingAmount = courseFee - payment.amountPaid;

//           return (
//             <li key={payment.paymentId}>
//               Paid Amount: {payment.amountPaid}<br />
//               Payment Type: {payment.paymentType}<br />
//               Payment Method: {payment.paymentMethod}<br />
//               Date: {payment.createdAt}<br />
//               {payment.amountPaid << courseFee ? (
//                 <div>
//                   <p>Amount to be paid: {remainingAmount}</p>
//                   {remainingAmount > 0 && <button onClick={handleMakeInstallmentClick}>Make Next Installment</button>}
                 
//                 </div>
//               ) : payment.amountPaid === courseFee ? (
//                 <p>Payment is completed</p>
//               ) : null}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default PaidPayments;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';

const PaidPayments = ({ courseFee }) => {
  const [payments, setPayments] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    const stuId = authState.username;
    axios.get(`http://localhost:3001/payment/${stuId}`)
      .then(response => {
        setPayments(response.data);
      })
      .catch(error => {
        console.error('Error fetching payment details:', error);
      });
  }, [authState.username]);

  const handleMakeInstallmentClick = () => {
    navigate('/installmentpayment');
  };

  const groupedPayments = {};
  payments.forEach(payment => {
    const installmentOrder = payment.installmentOrder;
    if (!groupedPayments[installmentOrder]) {
      groupedPayments[installmentOrder] = [];
    }
    groupedPayments[installmentOrder].push(payment);
  });

 
  const totalPaid = payments.reduce((sum, payment) => sum + parseFloat(payment.amountPaid), 0);
  const remainingAmount = courseFee - totalPaid;

  return (
    <div>
      <h2>Payment History</h2>
      
      <ul>
        {payments.map(payment => {
          const remainingAmount = courseFee - payment.amountPaid;

          return (
            <li key={payment.paymentId}>
              Paid Amount: {payment.amountPaid}<br />
              Payment Type: {payment.paymentType}<br />
              Payment Method: {payment.paymentMethod}<br />
              Date: {payment.createdAt}<br /> <br />
              {payment.amountPaid < courseFee ? (
                <div>
                  <p>Amount to be paid: {remainingAmount}</p>
                </div>
              ) : payment.amountPaid === courseFee ? (
                <p>Payment is completed</p>
              ) : null}
            </li>
          );
        })}
      </ul>
      <p>Total Paid: {totalPaid.toFixed(2)}</p>
      <p>Amount to be Paid: {remainingAmount.toFixed(2)}</p>

      {remainingAmount > 0 && (
        <button onClick={handleMakeInstallmentClick}>Make Next Installment</button>
      )}
    </div>
  );
}

export default PaidPayments;









