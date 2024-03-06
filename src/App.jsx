import Wallet from './Components/Wallet'
import { useState } from 'react';
// import { SnackbarProvider, useSnackbar } from 'notistack';
function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Wallet setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}>
      </Wallet>
    </div>
  );
}

export default App;