import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import ProgressStepper from './ProgressStepper'
import UserForm from './UserForm'

function App() {

  return (
    <div className="App">
      <Container maxWidth="sm">
        <h2>Start booking</h2>
        <ProgressStepper />
        <UserForm />
      </Container>
    </div>
  );
}

export default App;
