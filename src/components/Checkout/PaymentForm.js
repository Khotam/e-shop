import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { connect, useDispatch } from 'react-redux';

function PaymentForm(props) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch({ type: 'INPUT_CHANGE', field: e.target.id, value: e.target.value });
  };

  const { cardName, cardNumber, cvv, expDate } = props;

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='cardName'
            label='Name on card'
            fullWidth
            value={cardName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='cardNumber'
            label='Card number'
            fullWidth
            value={cardNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='expDate'
            label='Expiry date'
            fullWidth
            value={expDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id='cvv'
            label='CVV'
            helperText='Last three digits on signature strip'
            fullWidth
            value={cvv}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    cardName: state.checkout.cardName,
    cardNumber: state.checkout.cardNumber,
    expDate: state.checkout.expDate,
    cvv: state.checkout.cvv,
  };
};

export default connect(mapStateToProps)(PaymentForm);
