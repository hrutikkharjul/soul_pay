import { createQR, encodeURL } from "@solana/pay";
import React from "react";

function QRDisplay(props) {

    function show() {
        const {recipient, amount, reference, label, message, memo} = props.paymentInfo;
        const url = encodeURL({recipient, amount, reference, label, message, memo});
        const qrcode = createQR(url);
        const element = document.getElementById('qr-code');
        qrcode.append(element);
    }

    return (
        <>
        <div id="qr-code">
        </div>
        </>
    )

}
export default QRDisplay;