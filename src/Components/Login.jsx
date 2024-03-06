import React from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import logo from './Solana-1.png';
function Login(props) {
    const wallet = useWallet();

    function login() {
        props.setIsLoggedIn(true);
    }

    return (
        <div className="mainLogin">
            <div className="login">
                <div id="image">
                    <img src={logo} alt="logo" />
                </div>
                <div id="sign-up">
                    <h1>Sign up with Solana</h1>
                </div>
                <div id="btns">
                     <WalletMultiButton className="Wallet" style={{width:"200px", display:"flex",justifyContent:"center",background:"transparent",border:"2px solid #512DA8"}}/>
                    <div id="log">
                        <Stack direction="row" spacing={2}>
                                <Button id='login-button' variant="contained" color="success" onClick={login} disabled={!wallet.connected}>Login</Button>
                        </Stack>
                     </div>
                </div>
            </div>
        </div>     
    )
}
export default Login;