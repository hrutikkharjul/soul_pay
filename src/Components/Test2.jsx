import React from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from '@solana/web3.js';
import { encodeURL, createQR } from '@solana/pay';
import BigNumber from 'bignumber.js';

function Test2() {
    const { connection } = useConnection();
    const wallet = useWallet();
    let qrcode;
    function checkwallet() {
        console.log(wallet.publicKey.toBase58());    
        const recipient = wallet.publicKey
        const reference = new Keypair().PublicKey;
        const amount = new BigNumber(0.005);
        const label = 'Hrutik Industries Product';
        const message = 'Just for the test';
        const memo = 'HK#6969'
    
        const url = encodeURL({ recipient, amount, reference, label, message, memo });
        console.log(url);
        qrcode = createQR(url);
        // get a handle of the element
        const element = document.getElementById('qr-code');

        // append QR code to the element
        qrcode.append(element);
        console.log(qrcode);
    }



    return (    
        <>
            <div id="qr-code">
            </div>
            <button onClick={checkwallet}>Check publicKey</button>
        </>
    );
}

export default Test2;