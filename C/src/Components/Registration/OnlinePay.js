// import React from 'react';
// import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/system';

// const PaymentFormWrapper = styled('div')({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100vh',
// });

// const PaymentFormPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(4),
//   maxWidth: 400,
//   width: '100%',
// }));

// const PaymentFormTitle = styled(Typography)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
// }));

// const PaymentForm = styled('form')({
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '16px',
// });

// const OnlinePay = () => {
//   return (
//     <PaymentFormWrapper>
//       <Container>
//         <PaymentFormPaper elevation={3}>
//           <PaymentFormTitle variant="h5" component="h1">
//             Online Payment
//           </PaymentFormTitle>
//           <PaymentForm>
//             <TextField label="Card Number" variant="outlined" />
//             <TextField label="Cardholder Name" variant="outlined" />
//             <div style={{ display: 'flex', gap: '8px' }}>
//               <TextField label="Expiry Date (MM/YY)" variant="outlined" />
//               <TextField label="CVV" variant="outlined" />
//             </div>
//             <Button variant="contained" color="primary" size="large">
//               Pay Now
//             </Button>
//           </PaymentForm>
//         </PaymentFormPaper>
//       </Container>
//     </PaymentFormWrapper>
//   );
// };

// export default OnlinePay;


import React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';

import mastercardLogo from '../Assets/mastercard.png'
import visaLogo from '../Assets/visa.png';

const PaymentFormWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  height: '100vh',
});

const PaymentFormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  width: '100%',
}));

const PaymentFormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const PaymentForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const PaymentOptions = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '8px',
});

const PaymentOptionLogo = styled(CardMedia)({
  height: 40,
});

const OnlinePay = () => {
  return (
    <PaymentFormWrapper>
      <Container>
        <PaymentFormPaper elevation={3}>
          <PaymentFormTitle variant="h5" component="h1">
            Online Payment
          </PaymentFormTitle>
          <PaymentForm>
          <PaymentOptions>
              <PaymentOptionLogo component="img" src={mastercardLogo} alt="Mastercard" />
              <PaymentOptionLogo component="img" src={visaLogo} alt="Visa" />
            </PaymentOptions>
            <TextField label="Card Number" variant="outlined" />
            <TextField label="Cardholder Name" variant="outlined" />
            <div style={{ display: 'flex', gap: '8px' }}>
              <TextField label="Expiry Date (MM/YY)" variant="outlined" />
              <TextField label="CVV" variant="outlined" />
            </div>
            <Button variant="contained" color="primary" size="large">
              Pay Now
            </Button>
          
          </PaymentForm>
        </PaymentFormPaper>
      </Container>
    </PaymentFormWrapper>
  );
};

export default OnlinePay;
