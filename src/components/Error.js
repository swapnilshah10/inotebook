import React from 'react'
import Alert from '@mui/material/Alert';

function Error(props) {
    
    if(props.error)  return (
        <Alert severity="error">{props.error}</Alert>
      )
    if (props.username) return (
        <Alert severity="error">Please enter your username<br></br></Alert>
    )
    if (props.email === "This field may not be blank.") return (
        <Alert severity="error">Please enter your email<br></br></Alert>
    )
    else if (props.email) return (
        <Alert severity="error">{props.email}</Alert>
    )
    if (props.password  === "This field may not be blank.") return (
        <Alert severity="error">Please enter your password</Alert>
    )
    else if (props.password) return (
        <Alert severity="error">{props.password}</Alert>
    )
}

export default Error