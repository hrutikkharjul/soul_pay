import React, { useState } from "react";
import QRDisplay from "./QR_Page/QRDisplay";
import Input from "./QR_Page/Input";

function QRPage() {
    const [paymentInfo, setPaymentInfo] = useState({});
    const [showQR, setShowQR] = useState(false);
    return (
        // showQR?<QRDisplay paymentInfo={paymentInfo} setShowQR={setShowQR} />:<Input setPaymentInfo={setPaymentInfo} setShowQR={setShowQR} showQR={showQR}/>
        <>
        <Input setPaymentInfo={setPaymentInfo} setShowQR={setShowQR} showQR={showQR} paymentInfo={paymentInfo}/>
        </>
    )
}

export default QRPage;