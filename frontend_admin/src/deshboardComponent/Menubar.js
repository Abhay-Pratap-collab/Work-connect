import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useStyles } from './MenubarCss';
import { Paper, TextField } from '@mui/material';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import EditNotificationsTwoToneIcon from '@mui/icons-material/EditNotificationsTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
// import [Paper]
import ListItemButton from '@mui/material/ListItemButton';


// export default function Menubar() {
//     return (
//         // <div style={{ display: 'flex', width: '100%', height: '100%',background:'red'}}>
//            <div>
//            <Paper elevation={2} style={{ width: '100%', height: '80px'}}>
//                 <div style={{ display: 'flex',  }}>

//                     <ListItemButton sx={{ pl: 2 }}>

//                         <SearchIcon />
//                     </ListItemButton>
                  
//                      <ListItemButton sx={{ pl: 1 }}>

//                       <img src='notification.png' style={{width:'80px'}}></img>
//                     <ListItemButton sx={{ pl: 1 }}>

//                       <img src='contact.png' style={{width:'30px'}} ></img>
//                     </ListItemButton>
//                     </ListItemButton>
                   

//                      <ListItemButton sx={{ pl: 1 }}>

//                       <img src='setting.webp' style={{width:'50px'}}></img>
//                     </ListItemButton>
//                     <ListItemButton sx={{ pl: 4 }}>
//                         <AccountCircleTwoToneIcon />
//                     </ListItemButton>

//                 </div>

//             </Paper>

//         </div>
//     )
// }
export default function Menubar() {
    return (
        <div style={{ width: '100%' }}>
            <Paper 
                elevation={0} // Set to 0 to remove that "line" shadow you wanted gone
                style={{ 
                    width: '100%', 
                    height: '80px', 
                    display: 'flex', 
                    alignItems: 'center',
                    padding: '0 24px',
                    boxSizing: 'border-box'
                }}
            >
                {/* 1. Left Side: Search */}
                

                {/* 2. Spacer: Pushes everything after this to the right */}
                <div style={{ flexGrow: 1 }} />

                {/* 3. Right Side: Icons & Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <IconButton size="large">
                        <SearchIcon style={{ color: '#637381' }} />
                    </IconButton>
                    
                    <IconButton>
                        <img src='notification.png' style={{ width: '85px' }} alt="notif" />
                    </IconButton>

                    <IconButton>
                        <img src='contact.png' style={{ width: '34px' }} alt="contact" />
                    </IconButton>

                    <IconButton>
                        <img src='setting.webp' style={{ width: '60px' }} alt="settings" />
                    </IconButton>

                    <IconButton style={{ marginLeft: '8px' }}>
                        <AccountCircleTwoToneIcon style={{ fontSize: '32px', color: '#637381' }} />
                    </IconButton>
                    
                </div>
            </Paper>
        </div>
    );
}