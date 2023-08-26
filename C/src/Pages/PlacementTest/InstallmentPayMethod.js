
import React , { useState, useContext  }from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';
import mastercardLogo from '../../Components/Assets/mastercard.png'
import visaLogo from '../../Components/Assets/visa.png';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';


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

const InstallmentPayMethod = ({ installmentAmount }) => {

 
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();


  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    const paymentData = {
      stuId: authState.username,
      amountPaid: installmentAmount,
      paymentType: 'Installment',
      details: 'Course Fee',
    };
    

    axios.post('http://localhost:3001/payment/onlinepay', paymentData)
    .then((response) => {
      console.log('Payment successful:', response.data);
      alert('Payment Successful!');
      navigate('/studentportal'); 
    })
    .catch((error) => {
      console.error('Payment error:', error);
    });
};

 

  return (
    <PaymentFormWrapper>
      <Container>
        <PaymentFormPaper elevation={3} onSubmit={handlePaymentSubmit}>
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
            <Button variant="contained" color="primary" size="large" type="submit">
              Pay Now
            </Button>
          
          </PaymentForm>
        </PaymentFormPaper>
      </Container>
    </PaymentFormWrapper>
  );
};

export default InstallmentPayMethod;





