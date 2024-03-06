import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useWallet } from '@solana/wallet-adapter-react';

const rows = [
  {
    id: 1,
    username: '@MUI',
    age: 38,
    desk: 'D-546',
  },
  {
    id: 2,
    username: '@MUI-X',
    age: 25,
    desk: 'D-042',
  },
];


function HistoryTable(props) {
    const list = [];
    // props.transactionobj.filter(transaction => transaction.Info!=null ).map(transaction => { 
    //     list.push({
    //         id: transaction.TransactionNo,
    //         Date: transaction.Time.toString(),
    //         Memo: transaction.Memo.parsed,
    //         Transaction_ID : transaction.Signature,
    //         Amount: '◎ ' + transaction.Info.parsed.info.lamports/1000000000
    //     })
    // });
  const wallet = useWallet();
  const publicKey =  wallet.publicKey.toString();
    props.transactionobj.map(transaction => {
        list.push({
            id: transaction.TransactionNo,
            Date: transaction.Time.toString(),
            Memo: transaction.Memo!==undefined && typeof transaction.Memo.parsed === 'string' ? transaction.Memo.parsed:'-',
            Transaction_ID : transaction.Signature,
            Amount: '◎ ' + 
            ((transaction.Info !==undefined && transaction.Info.parsed!==undefined && transaction.Info.parsed.info !== undefined) ? 
              transaction.Info.parsed.info.lamports/1000000000
            :
              (transaction.Info2 !==undefined && transaction.Info2.parsed!==undefined && transaction.Info2.parsed.info !== undefined) ?
                transaction.Info2.parsed.info.lamports/1000000000
                :
                 ( transaction.Memo !== undefined && transaction.Memo.parsed!== undefined && transaction.Memo.parsed.info !== undefined)?
                    transaction.Memo.parsed.info.lamports/1000000000
                    :
                      '0.00000'), 
                    //(transaction.Info2.parsed.info!=undefined?(transaction.Info2.parsed.info.lamports/1000000000):'0.00000')),
            sent_received: (((transaction.Info!==undefined && transaction.Info.parsed!==undefined && transaction.Info.parsed.info!==undefined && transaction.Info.parsed.info.destination===publicKey) || ( transaction.Info2!==undefined && transaction.Info2.parsed!==undefined && transaction.Info2.parsed.info!==undefined && transaction.Info2.parsed.info.destination===publicKey)) ?'Received':'Sent')
        });
    });

    return (
        <div id="Transaction_table" style={{ height: '90%', width: '87.7%' }}>
        <DataGrid
            columns={[
            { field: 'Date', hideable: false, width: 200 },
            { field: 'Memo', width: 200 , headerAlign: 'center', align: 'center'},
            { field: 'Transaction_ID', width: 800, headerName: 'Transaction - ID'},
            { field: 'Amount', width: 150 },
            { field: 'sent_received', width: 180, headerName: 'Sent/Received'}
            ]}
            rows={list}
            slots={{
            toolbar: GridToolbar,
            }}
        />
        </div>
    );
}

export default HistoryTable