import { Connection } from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState, useEffect } from "react";
import HistoryTable from "./HistoryTable";

function TransactionHistory() {

    const [transactionobj, settransactionobj] = useState([]);

    const element = document.getElementById('qr-code');
    if(element != null) element.remove();

    const options = {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0,  
    };

    const endpoint = 'https://api.testnet.solana.com/';
    const solanaConnection = new Connection(endpoint, "confirmed");
    const searchAddress = useWallet().publicKey;
    //console.log(searchAddress);
    const getTransactions = async(address, numTx) => {
        const pubKey = address;
        let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, {limit:numTx});
        function to2digit(x) {
            if(x.toString().length===2) {
                return x.toString();
            } else {
                return '0'+x.toString();
            }
        }
        transactionList.map(async (transaction, idx) => {
            if(transaction.signature !== undefined) {
                const d = new Date(transaction.blockTime*1000);
                const tr = await solanaConnection.getParsedTransaction(transaction.signature, options);
                settransactionobj(prev => {
                    return ([...prev, {
                        TransactionNo: (idx+1),
                        Signature: transaction.signature,
                        Time: [d.getFullYear(),to2digit(d.getMonth()+1),to2digit(d.getDate())].join('/')+' '+[to2digit(d.getHours()),to2digit(d.getMinutes()),to2digit(d.getSeconds())].join(':'),
                        BalanceInfo : tr.meta,
                        Status: transaction.confirmationStatus,
                        Memo : tr.transaction.message.instructions[2],
                        Info : tr.transaction.message.instructions[3],
                        Info2 : tr.transaction.message.instructions[0]
                    }])
                })
            }
        })
    }
    useEffect(() => {
        getTransactions(searchAddress, 1000);
      }, []);
    return (
        <>
            <HistoryTable transactionobj={transactionobj} />
        </>       
    )
}
export default TransactionHistory;