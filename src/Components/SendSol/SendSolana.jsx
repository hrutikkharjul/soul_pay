import React, { FC, useCallback, useState } from "react";
import { Keypair, Transaction, SystemProgram, PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
import { useWallet, useConnection} from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { Box, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import BigNumber from 'bignumber.js';

function SendSolana() {
    // const { connection } = useConnection();
    const connection = new Connection(clusterApiUrl('devnet'));
    const { publicKey, sendTransaction } = useWallet();
    const [ toInfo, setToInfo] = useState(['','']);
    const [ isValid, setIsValid] = useState(true);
    
    async function isValidSolanaPublicKey(publicKey) {
        if (typeof publicKey !== 'string') {
            return false;
        }
        // Check if it has the correct length
        try {
        // Attempt to create a PublicKey instance
        const solanaPublicKey = new PublicKey(publicKey);
        
        // Additional check for existence (this might involve querying the blockchain)
        const accountInfo = await connection.getAccountInfo(solanaPublicKey);
        
        // Check if the accountInfo is not null or undefined
        return !!accountInfo;
        } catch (error) {
        // Handle any errors that might occur during PublicKey instantiation
        // console.error('Error validating public key:', error);
        return false;
        }
    }

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();
       
        // 890880 lamports as of 2022-09-01
        const lamports = new BigNumber(toInfo[1])*1000000000;
        // const isvalid = isValidSolanaPublicKey(toInfo[0].toString());
    
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(toInfo[0].toString()),
                lamports,
            })
        );
        
        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();
        
        const signature = await sendTransaction(transaction, connection, { minContextSlot });
        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
        
    }, [publicKey, sendTransaction, connection]);

    async function handleChange(event) {
        const {name, value} = event.target;
        if(name==='pubkey') {
            if(value.length===45) return;
            setToInfo(prev => {
                const amt = prev[1];
                return [value, amt];
            })
            const x = await isValidSolanaPublicKey(value.toString());
            setIsValid(x);
        } else {
            const numericValue = value.replace(/^\.|[^0-9.]/g, '');

            // Ensure that there's at most one decimal point
            const parts = numericValue.split('.');
            const integerPart = parts[0];
            const decimalPart = parts.length > 1 ? `.${parts[1]}` : '';
        
            // Set a maximum length for the input (e.g., 12 characters)
            const maxLength = 8;
            const truncatedValue = `${integerPart}${decimalPart}`.slice(0, maxLength);
            setToInfo(prev=>{
                const pub = prev[0];
                return [pub, truncatedValue];
            })
        }
    }

    return(
        <>  
         <div id='send'>
             <Box sx={{ width: '100%', maxWidth: 500,  borderRadius: 3}}>  
                   <div id="publicKey">
                    <TextField fullWidth label="Public Key" style={{marginLeft: 8}} onChange={handleChange} name="pubkey" value={toInfo[0]} {...!isValid && {error: true, helperText: "Invalid Public Key"}} />  
                    </div>
                    <div id="input3"> 
                    <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Amount in SOL</InputLabel>
                    <OutlinedInput onChange={handleChange} name="amount"
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">◎</InputAdornment>}
                        label="Amount in SOL"
                        value={toInfo[1]}
                    /> 
                    </FormControl>
                </div>
                <div id="btnsend">
                <Button  variant="contained" endIcon={<SendIcon />} onClick={onClick} disabled={!publicKey || !isValid || toInfo[0].length===0 || toInfo[1].length===0} style={{marginLeft: 8}}>
                Send SOL
                </Button>
                </div>
            </Box>
        </div>
        </>
        );
}

export default SendSolana;