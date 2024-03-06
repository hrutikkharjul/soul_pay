import React, { useState } from "react";
import QRPage from "./QRPage";
import SelectedListItem from "./Menu/SelectedListItem";
import TransactionHistory from "./Transaction_History/TransactionHistory";
import SendSolana from "./SendSol/SendSolana";

function Home() {
    const [pageNo, setPageNo] = useState(0);

    return (
        <>  
            <SelectedListItem setPageNo={setPageNo} />
            {pageNo===0?<QRPage />: pageNo===1?<TransactionHistory />: <SendSolana/>}
        </>
    )

}
export default Home;