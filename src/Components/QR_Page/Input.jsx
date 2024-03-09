import React, { memo, useState } from "react";
import BigNumber from 'bignumber.js';
import { useWallet } from "@solana/wallet-adapter-react";
import { createQR, encodeURL, FindReferenceError, validateTransfer, findReference } from "@solana/pay";
import { FormControl, OutlinedInput, FormHelperText, InputAdornment, Button, Stack } from "@mui/material";
import FetchPayment from "./FetchPayment";
import Box from '@mui/material/Box';
import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js';

function Input(props) {
    const wallet = useWallet();
    const [amt, setAmt] = useState("");
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    let signatureInfo;
    const [paymentStatus, setPaymentStatus] = useState('pending');
    const [memo1, setMemo] = useState("");
    const [isValid, setIsValid] = useState(false);
    function formSubmit() {
        const paymentInfo = {
            recipient: wallet.publicKey,
            reference: new Keypair().publicKey,
            amount : new BigNumber(amt),
            label: 'Hrutik Industries',
            message: 'Lets Go!',
            memo: 'HK#'+ memo1
        };
        props.setPaymentInfo(paymentInfo);
        props.setShowQR(true);
        const {recipient, amount, reference, label, message, memo} = paymentInfo;
        if(recipient != null) {
            const url = encodeURL({recipient, amount, reference, label, message, memo});
            const qrcode = createQR(url);
            const iDiv = document.createElement('div');
            iDiv.id = 'qr-code';
            document.getElementsByClassName('App')[0].appendChild(iDiv);
            const element = document.getElementById('qr-code');
            element!=null&&qrcode.append(element);
        }
        fetch(paymentInfo);
    }
    
    function handleAmountChange(event) {
        const numericValue = event.target.value.replace(/^\.|[^0-9.]/g, '');

        // Ensure that there's at most one decimal point
        const parts = numericValue.split('.');
        const integerPart = parts[0];
        const decimalPart = parts.length > 1 ? `.${parts[1]}` : '';
    
        // Set a maximum length for the input (e.g., 12 characters)
        const maxLength = 12;
        const truncatedValue = `${integerPart}${decimalPart}`.slice(0, maxLength);
    
        setAmt(truncatedValue);
        if(truncatedValue.length > 0 && memo1.length > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    function handleMemoChanges(event) {
        const memo = event.target.value;
        setMemo(memo);
        if(amt.length > 0 && memo.length > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    async function fetch(paymentInfo) {
        
        const { signature } = await new Promise((resolve, reject) => {{
            /**
             * Retry until we find the transaction
            *
            * If a transaction with the given reference can't be found, the `findTransactionSignature`
            * function will throw an error. There are a few reasons why this could be a false negative:
            *
            * - Transaction is not yet confirmed
            * - Customer is yet to approve/complete the transaction
            *
            * You can implement a polling strategy to query for the transaction periodically.
            */
           const interval = setInterval(async () => {
               console.count('Checking for transaction...');
               try {
                    signatureInfo = await findReference(connection, paymentInfo.reference, { finality: 'confirmed' });
                    console.log('\n 🖌  Signature found: ', signatureInfo.signature);
                    clearInterval(interval);
                    resolve(signatureInfo);
                } catch (error) {
                    if (!(error instanceof FindReferenceError)) {
                        console.error(error);
                        clearInterval(interval);
                        reject(error);
                    }
                }
            }, 250);
        }});
        setPaymentStatus('confirmed');
        try {
          
            const {amount, recipient} = props.paymentInfo;
            await validateTransfer(connection, signature, { recipient: paymentInfo.recipient, amount });
            
            // Update payment status
            setPaymentStatus('validated');
            console.log('✅ Payment validated');
            const element = document.getElementById('qr-code');
            element.innerHTML = "";
            console.log('📦 Ship order to customer');
        } catch (error) {
            console.error('❌ Payment failed', error);
        }
    }

    return (
        <>
        {!props.showQR?(<div>
            <div id='accept' >
            <Box sx={{ width: '100%', maxWidth: 500, backgroundColor: 'rgba(0, 0, 0, 0.2)', borderRadius: 3}}>
            <div id="input1">
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                 <OutlinedInput
                    id="outlined-adornment-weight"
                    value={amt}
                    onChange={handleAmountChange}
                    endAdornment={<InputAdornment position="end">SOL</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                        maxLength: 7
                    }}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Amount in Solana</FormHelperText>
                </FormControl>
                </div>
            <br />
            <div id="input2">
                <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                    <OutlinedInput
                    id="outlined-adornment-weight"
                    value={memo1}
                    onChange={handleMemoChanges}
                    startAdornment={<InputAdornment position="end"># </InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        'aria-label': 'weight',
                        maxLength: 7
                    }}
                    />
                    <FormHelperText id="outlined-weight-helper-text">Memo</FormHelperText>
                </FormControl>
            </div>
            <Stack>
            <div id='btncreate'>
                <Button   variant="contained" onClick={formSubmit} disabled={!isValid}>Create QR Code</Button>
            </div>
            </Stack>
            </Box>
            </div>
            </div>):null
        }
            <FetchPayment paymentInfo={props.paymentInfo} setShowQR={props.setShowQR} paymentStatus={paymentStatus} />
        </>
    )
    
}
export default Input;