
import React , { useState, useContext  }from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';
import mastercardLogo from '../Assets/mastercard.png'
import visaLogo from '../Assets/visa.png';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

const PaymentFormWrapper = styled('div')({
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
gap: '16px',
height: '60vh',
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

const OnlinePay = ({ paymentOption, amount }) => {

const [paymentResponse, setPaymentResponse] = useState(null);
const { authState } = useContext(AuthContext);

const handlePayment = async () => {
try {
const response = await axios.post('http://localhost:3001/payment/onlinepay', {
  stuId: authState.username,
  amountPaid: amount,
  paymentType: paymentOption,
  details: "Course Fee",
});
setPaymentResponse(response.data);
alert ("Payment successfull");
} catch (error) {
console.error('Error making payment:', error);
// Handle error
}
};

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
      <Button variant="contained" color="primary" size="large" onClick={handlePayment}>
        Pay Now
      </Button>
    
    </PaymentForm>
  </PaymentFormPaper>
</Container>
</PaymentFormWrapper>
);
};

export default OnlinePay;





