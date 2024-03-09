import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import QrCode2 from '@mui/icons-material/QrCode2';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Info } from '@mui/icons-material';

function SelectedListItem(props) {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.setPageNo(index);
  };

  return (
    <div id='listitems' >
    <Box>
      <List component="nav" aria-label="main mailbox folders" id="List" >
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <QrCode2/>
          </ListItemIcon>
          <ListItemText primary="Accept Payment" />
        </ListItemButton>
        
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <ManageSearchIcon />
          </ListItemIcon>
          <ListItemText primary="Transaction History" />
        </ListItemButton>
        
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Send Solana" />
        </ListItemButton>

        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <Info/>
          </ListItemIcon>
          <ListItemText primary="About us" />
        </ListItemButton>
        
      </List>
    </Box>
    </div>

  );
}
export default SelectedListItem;