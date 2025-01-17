import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
    WalletConnectButton,
    WalletModalButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import Login from './Login';
import Home from './Home';
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

const Wallet = (props) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );


    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {props.isLoggedIn?<div>
                    <div id='btndiscon' >
                        <WalletDisconnectButton onClick={()=>{
                            props.setIsLoggedIn(false);
                    
                        }}/>
                    </div> 
                        <Home />
                    </div>:
                        <div className='btnConnect'>
                        <Login setIsLoggedIn={props.setIsLoggedIn} />
                        </div>
                    }
                        {/* <WalletModalButton /> */}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
export default Wallet;