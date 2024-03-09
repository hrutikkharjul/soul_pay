import React, { useState } from "react";
import QRPage from "./QRPage";
import SelectedListItem from "./Menu/SelectedListItem";
import TransactionHistory from "./Transaction_History/TransactionHistory";
import SendSolana from "./SendSol/SendSolana";
import AboutUs from "./AboutUs";

function Home() {
    const [pageNo, setPageNo] = useState(0);

    return (
        <div id="body_container">  
            <SelectedListItem setPageNo={setPageNo} />
            {pageNo===0?<QRPage />: pageNo===1?<TransactionHistory />:pageNo===2? <SendSolana/>: <AboutUs/> }
        </div>
    )

}
export default Home;