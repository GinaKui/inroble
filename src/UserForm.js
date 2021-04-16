import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { findByLabelText } from '@testing-library/dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex'
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState('')
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicle, setVehicle] = useState([]);
  
  const handleCountryCodeChange = e => {
    setCountryCode(e.target.value)
  }
  const handlePhoneChange = e => {
    setPhone(e.target.value);
  }
  useEffect(async () => {
    //only make api request when the phone number is valid
    //todo: shoud use a real validation function here
    if(countryCode && phone.length > 9) {
      const res = await fetch('http://wemi-assessment-server.herokuapp.com/findCustomerByPhone', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "countryCode": countryCode,
          "phoneNumber": phone
        })
      })
      const userData = await res.json();
      setFirstName(userData.name.firstName);
      setLastName(userData.name.lastName)
    }
  },
  [countryCode, phone])

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        Phone
        <TextField id="outlined-basic" label="country" value={countryCode} variant="outlined" onChange={handleCountryCodeChange}/>
        <TextField id="outlined-basic" label="Phone" value={phone} variant="outlined" onChange={handlePhoneChange}/>
      </div>
      
      <div>
        Name
        <TextField id="outlined-basic" label="FirstName" value={phone} variant="outlined" />
        <TextField id="outlined-basic" label="LastName" value={phone} variant="outlined" />
      </div>
      <TextField id="outlined-basic" label="email" placeholder="Please input your email" value={email} variant="outlined" />
      <TextField id="outlined-basic" label="vehicle" value={vehicle} variant="outlined" />
    </form>
  );
}