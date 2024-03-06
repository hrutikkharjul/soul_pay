import React, { useState } from "react";
import { Alert, Stack } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { green } from "@mui/material/colors";

function FetchPayment(props) {

    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    
    return (
        <>
        <div>{props.paymentStatus === 'validated' ? 
                <div >
                    <svg viewBox='0 0 24 24' className='text-green-600 w-16 h-16 mx-auto my-6' style={{height: 400, color: green[800]}}>
                        <path fill='currentColor' d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'>
                        </path>
                    </svg>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Payment Received
                        </Alert>    
                    </Snackbar>
                </div>
                : null 
            }
        </div>
        </>
    )
}

export default FetchPayment;