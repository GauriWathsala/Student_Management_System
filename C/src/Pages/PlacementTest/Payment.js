// import React, { useState } from 'react';

// const Payment = (props) => {
//     const { location } = props;
//     const { courseDetails } = location.state;

//   const [paymentOption, setPaymentOption] = useState('full');

//   const handlePaymentChange = (event) => {
//     setPaymentOption(event.target.value);
//   };

//   return (
//     <div>
//       <h2>Payment Options</h2>
//       <div>
//         <strong>Course Name:</strong> {courseDetails.courseName}
//         <strong>Course Duration:</strong> {courseDetails.courseDuration} {courseDetails.durationType}
//         <strong>Course Fee:</strong> {courseDetails.courseFee}
//       </div>
//       <label>
//         <input
//           type="radio"
//           value="full"
//           checked={paymentOption === 'full'}
//           onChange={handlePaymentChange}
//         />
//         Full Payment
//       </label>
//       <br />
//       <label>
//         <input
//           type="radio"
//           value="installments"
//           checked={paymentOption === 'installments'}
//           onChange={handlePaymentChange}
//         />
//         Pay by Installments
//       </label>
//     </div>
//   );
// };

// export default Payment;


// import React, { useState } from 'react';

// const Payment = (props) => {
//     const { location } = props;
//     const { courseDetails } = location.state;

//   const [paymentOption, setPaymentOption] = useState('full');

//   const handlePaymentChange = (event) => {
//     setPaymentOption(event.target.value);
//   };

//   return (
//     <div>
//       <h2>Payment Options</h2>
//       <div>
//         <strong>Course Name:</strong> {courseDetails.courseName}
//         <br />
//         <strong>Course Duration:</strong> {courseDetails.courseDuration} {courseDetails.durationType}
//         <br />
//         <strong>Course Fee:</strong> Rs. {courseDetails.courseFee}
//       </div>
//       <div>
//         <label>
//           <input
//             type="radio"
//             value="full"
//             checked={paymentOption === 'full'}
//             onChange={handlePaymentChange}
//           />
//           Full Payment
//         </label>
//       </div>
//       <div>
//         <label>
//           <input
//             type="radio"
//             value="installments"
//             checked={paymentOption === 'installments'}
//             onChange={handlePaymentChange}
//           />
//           Pay by Installments
//         </label>
//       </div>
//     </div>
//   );
// };

// export default Payment;


// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import OnlinePay from "../../Components/Registration/OnlinePay";
// import TextField from "@mui/material/TextField";


// const Payment = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);

//   const [paymentOption, setPaymentOption] = useState('full');

//   const handlePaymentChange = (event) => {
//         setPaymentOption(event.target.value);
//       };

//   const courseId = queryParams.get('courseId');
//   const courseName = queryParams.get('courseName');
//   const courseDuration = queryParams.get('courseDuration');
//   const durationType = queryParams.get('durationType');
//   const courseFee = queryParams.get('courseFee');

//   return (
//     <div>
//       <h1>Payment</h1>
//       <p>Enrolled Course:</p>
//       <p>Course ID: {courseId}</p>
//       <p>Course Name: {courseName}</p>
//       <p>Course Duration: {courseDuration} {durationType}</p>
//       <p>Course Fee: { courseFee}</p>

//       <div>
//         <h3> Terms and Conditions</h3>
//         <p> You can pay the course fee either as full payment or installments.</p>
//         <p>If you pay by installements, you have to pay it as 4 installments in 25% ineach.</p>
//         <p> You can not enroll to the course without paying and if you unable to complete your payments within the given period Institute has authority to block you in any time.</p>
//       </div>


//       <div>
//       <h3> Payment Options</h3>
//        <label>
//       <input
//             type="radio"
//             value="full"
//             checked={paymentOption === 'full'}
//             onChange={handlePaymentChange}
//           />
//           Full Payment
//         </label>
//       <label>
//           <input
//             type="radio"
//             value="installments"
//             checked={paymentOption === 'installments'}
//             onChange={handlePaymentChange}
//           />
//           Pay by Installments
//         </label>
//       </div>
//       <span id="feeAmountTitle"> Amount </span>
//           <TextField
//             required
//             fullWidth
//             id="enrollmentFee"
//             name="enrollmentFee"
//             disabled
//             size="small"
            
//           />
//        <OnlinePay />
//     </div>
//   );
// }

// export default Payment;



import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OnlinePay from "../../Components/Registration/OnlinePay";
import TextField from "@mui/material/TextField";

const Payment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [paymentOption, setPaymentOption] = useState('full');

  const handlePaymentChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const courseId = queryParams.get('courseId');
  const courseName = queryParams.get('courseName');
  const courseDuration = queryParams.get('courseDuration');
  const durationType = queryParams.get('durationType');
  const courseFee = parseFloat(queryParams.get('courseFee'));

  const amount = paymentOption === 'full' ? courseFee : courseFee * 0.25;

  return (
    <div>
      <h1>Payment</h1>
      <p>Enrolled Course:</p>
      <p>Course ID: {courseId}</p>
      <p>Course Name: {courseName}</p>
      <p>Course Duration: {courseDuration} {durationType}</p>
      <p>Course Fee: {courseFee}</p>

      <div>
        <h3> Terms and Conditions</h3>
        <p> You can pay the course fee either as full payment or installments.</p>
        <p>If you pay by installements, you have to pay it as 4 installments in 25% ineach.</p>
        <p> You can not enroll to the course without paying and if you unable to complete your payments within the given period Institute has authority to block you in any time.</p>
      </div>

      <div>
        <h3> Payment Options</h3>
        <label>
          <input
            type="radio"
            value="full"
            checked={paymentOption === 'full'}
            onChange={handlePaymentChange}
          />
          Full Payment
        </label>
        <label>
          <input
            type="radio"
            value="installments"
            checked={paymentOption === 'installments'}
            onChange={handlePaymentChange}
          />
          Pay by Installments
        </label>
      </div>

      <span id="feeAmountTitle"> Amount </span>
      <TextField
        required
        fullWidth
        id="enrollmentFee"
        name="enrollmentFee"
        disabled
        size="small"
        value={amount}
      />
      <OnlinePay />
    </div>
  );
}

export default Payment;


