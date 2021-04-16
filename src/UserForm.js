import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'flex'
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
      setFirstName(userData.name.first);
      setLastName(userData.name.last);
      setEmail(userData.email);
      setVehicle(userData.vehicle);
    }
  },
  [countryCode, phone])

  return (
    <form className={classes.root} noValidate autoComplete="off">
      
        Phone
      <div>
        <TextField id="outlined-basic" label="country" value={countryCode} variant="outlined" onChange={handleCountryCodeChange}/>
        <TextField id="outlined-basic" label="Phone" value={phone} variant="outlined" onChange={handlePhoneChange}/>
      </div>
      
      <div>
        <FormControl className={classes.formControl}>
        <InputLabel id="userName">Name</InputLabel>
        <Select
          labelId="userName"
          id="userName"
          value={{firstName, lastName}}
          onChange={e => {}}
        >
          <MenuItem value={{firstName, lastName}}><span>{firstName}</span>{lastName}</MenuItem>
        </Select>
      </FormControl>
      </div>
      <TextField id="outlined-basic" label="email" placeholder="Please input your email" value={email} variant="outlined" />
      <TextField id="outlined-basic" label="vehicle" value={vehicle} variant="outlined" />
      
    </form>
  );
}