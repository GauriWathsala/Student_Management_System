// // // // import React, { useState } from 'react';
// // // // import './bankpayment.scss';
// // // // import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// // // // import { app } from '../../firebase'; // Assuming you have already initialized the Firebase app in Firebase.js

// // // // function BankPayment(props) {
// // // //   const [progress, setProgress] = useState(0);
// // // //   const { nic } = props.location.state || {};
// // // //   const UploadFiles = (file) => {
// // // //     if (!file) return;

// // // //     const storage = getStorage(app); // Get the storage instance from the initialized Firebase app
// // // //     const storageRef = ref(storage, `/files/${file.name}`);
// // // //     const uploadTask = uploadBytesResumable(storageRef, file);

// // // //     uploadTask.on(
// // // //       'state_changed',
// // // //       (snapshot) => {
// // // //         const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
// // // //         setProgress(prog);
// // // //       },
// // // //       (err) => console.log(err),
// // // //       () => {
// // // //         getDownloadURL(uploadTask.snapshot.ref)
// // // //           .then((url) => {
// // // //             console.log(url);
// // // //             // You can store the URL or perform other actions with it
// // // //           })
// // // //           .catch((error) => {
// // // //             console.log(error);
// // // //           });
// // // //       }
// // // //     );
// // // //   };

// // // //   const formHandler = (e) => {
// // // //     e.preventDefault();
// // // //     const file = e.target[0].files[0];
// // // //     UploadFiles(file);
// // // //   };

// // // //   return (
// // // //     <div className='bankayment'>
// // // //       <div className='accounts'>
// // // //         <div className='payment-details'>
// // // //           <h3>Payment Details</h3>
// // // //           <p>Account Holder's Name: Gifted Education (pvt) Ltd</p>
// // // //           <p>Account Number: 1002569843256</p>
// // // //           <p>Bank: Peoples' Bank</p>
// // // //           <p>Branch: Bandarawela</p>
// // // //         </div>
// // // //         <h3>NIC: {nic}</h3>
// // // //       </div>

// // // //       <div className='payment-slip'>
// // // //         <h3>Upload Payment Slip</h3>
// // // //         <form onSubmit={formHandler}>
// // // //           <input type='file' accept='image/*' />
// // // //           <button type='submit'>Submit</button>
// // // //         </form>
// // // //       </div>
// // // //       <h3>Uploaded {progress}%</h3>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default BankPayment;



// // // import React, { useState } from 'react';
// // // import './bankpayment.scss';
// // // import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// // // import { app } from '../../firebase'; // Assuming you have already initialized the Firebase app in Firebase.js

// // // function UploadFiles(file) {
// // //   if (!file) return;

// // //   const storage = getStorage(app); // Get the storage instance from the initialized Firebase app
// // //   const storageRef = ref(storage, `/files/${file.name}`);
// // //   const uploadTask = uploadBytesResumable(storageRef, file);

// // //   uploadTask.on(
// // //     'state_changed',
// // //     (snapshot) => {
// // //       const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
// // //       setProgress(prog);
// // //     },
// // //     (err) => console.log(err),
// // //     () => {
// // //       getDownloadURL(uploadTask.snapshot.ref)
// // //         .then((url) => {
// // //           console.log(url);
// // //           // You can store the URL or perform other actions with it
// // //         })
// // //         .catch((error) => {
// // //           console.log(error);
// // //         });
// // //     }
// // //   );
// // // }

// // // function BankPayment(props) {
// // //   const [progress, setProgress] = useState(0);
// // //   const { nic } = props.location.state || {};

// // //   const formHandler = (e) => {
// // //     e.preventDefault();
// // //     const file = e.target[0].files[0];
// // //     UploadFiles(file);
// // //   };

// // //   return (
// // //     <div className='bankayment'>
// // //       <div className='accounts'>
// // //         <div className='payment-details'>
// // //           <h3>Payment Details</h3>
// // //           <p>Account Holder's Name: Gifted Education (pvt) Ltd</p>
// // //           <p>Account Number: 1002569843256</p>
// // //           <p>Bank: Peoples' Bank</p>
// // //           <p>Branch: Bandarawela</p>
// // //         </div>
// // //         <h3>NIC: {nic}</h3>
// // //       </div>

// // //       <div className='payment-slip'>
// // //         <h3>Upload Payment Slip</h3>
// // //         <form onSubmit={formHandler}>
// // //           <input type='file' accept='image/*' />
// // //           <button type='submit'>Submit</button>
// // //         </form>
// // //       </div>
// // //       <h3>Uploaded {progress}%</h3>
// // //     </div>
// // //   );
// // // }

// // // export default BankPayment;


// // import React, { useState } from 'react';
// // import './bankpayment.scss';
// // import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// // import { app } from '../../Firebase'; // Assuming you have already initialized the Firebase app in Firebase.js

// // function UploadFiles(file, setProgress) {
// //   if (!file) return;

// //   const storage = getStorage(app); // Get the storage instance from the initialized Firebase app
// //   const storageRef = ref(storage, `/files/${file.name}`);
// //   const uploadTask = uploadBytesResumable(storageRef, file);

// //   uploadTask.on(
// //     'state_changed',
// //     (snapshot) => {
// //       const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
// //       setProgress(prog);
// //     },
// //     (err) => console.log(err),
// //     () => {
// //       getDownloadURL(uploadTask.snapshot.ref)
// //         .then((url) => {
// //           console.log(url);
// //           // You can store the URL or perform other actions with it
// //         })
// //         .catch((error) => {
// //           console.log(error);
// //         });
// //     }
// //   );
// // }

// // function BankPayment(props) {
// //   const [progress, setProgress] = useState(0);
// //   const { nic } = props.location.state || {};

// //   const formHandler = (e) => {
// //     e.preventDefault();
// //     const file = e.target[0].files[0];
// //     UploadFiles(file, setProgress); // Pass setProgress function to UploadFiles
// //   };

// //   return (
// //     <div className='bankayment'>
// //       <div className='accounts'>
// //         <div className='payment-details'>
// //           <h3>Payment Details</h3>
// //           <p>Account Holder's Name: Gifted Education (pvt) Ltd</p>
// //           <p>Account Number: 1002569843256</p>
// //           <p>Bank: Peoples' Bank</p>
// //           <p>Branch: Bandarawela</p>
// //         </div>
// //         <h3>NIC: {nic}</h3>
// //       </div>

// //       <div className='payment-slip'>
// //         <h3>Upload Payment Slip</h3>
// //         <form onSubmit={formHandler}>
// //           <input type='file' accept='image/*' />
// //           <button type='submit'>Submit</button>
// //         </form>
// //       </div>
// //       <h3>Uploaded {progress}%</h3>
// //     </div>
// //   );
// // }

// // export default BankPayment;












import React, { useState } from 'react';
import './bankpayment.scss';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../../Firebase'; // Assuming you have already initialized the Firebase app in Firebase.js

function UploadFiles(file, setProgress) {
  if (!file) return;

  const storage = getStorage(app); // Get the storage instance from the initialized Firebase app
  const storageRef = ref(storage, `/files/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(prog);
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          console.log(url);
          // You can store the URL or perform other actions with it
        })
        .catch((error) => {
          console.log(error);
        });
    }
  );
}

function BankPayment(props) {
  const [progress, setProgress] = useState(0);
  const { nic } = props.location.state || {};

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    UploadFiles(file, setProgress); // Pass setProgress function to UploadFiles
  };

  return (
    <div className='bankayment'>
      <div className='accounts'>
        <div className='payment-details'>
          <h3>Payment Details</h3>
          <p>Account Holder's Name: Gifted Education (pvt) Ltd</p>
          <p>Account Number: 1002569843256</p>
          <p>Bank: Peoples' Bank</p>
          <p>Branch: Bandarawela</p>
        </div>
        <h3>NIC: {nic}</h3>
      </div>

      <div className='payment-slip'>
        <h3>Upload Payment Slip</h3>
        <form onSubmit={formHandler}>
          <input type='file' accept='image/*' />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <h3>Uploaded {progress}%</h3>
    </div>
  );
}

export default BankPayment;



// import React from 'react'

// const BankPayment = () => {
//   return (
//     <div>BankPayment</div>
//   )
// }

// export default BankPayment