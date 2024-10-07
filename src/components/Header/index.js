import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import './style.css';
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import SearchBox from "../SearchBox";
import { MdOutlineLightMode } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { Divider } from "@mui/material";

const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationDrop , setNotificationDrop] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openNotification = Boolean(notificationDrop);
  const handleOpenMyAccDrawer = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrawer = () => {
    setAnchorEl(null);
  };

  const handleOpenNotificationsDrop=()=>{
    setNotificationDrop(true);
  }

  const handleClosenotificationsDrop=()=>{
    setNotificationDrop(false);
  }


    return (
        <>
            <header className="d-flex align-items-center header-background">
                <div className="container-fluid w-100">
                    <div className="row d-flex align-items-center w-100">

                        {/* Logo Wrapper */}
                        <div className="col-12 col-sm-2 d-flex align-items-center part1">
                            <Link to="/" className="d-flex align-items-center logo">
                                <img src={logo} alt="logo" />
                                <span className="ms-2">HOTASH</span>
                            </Link>
                        </div>

                        {/* Search & Menu Toggle */}
                        <div className="col-12 col-sm-4 d-flex align-items-center part2 ps-4">
                            <Button className="rounded-circle mr-3">
                                <MdMenuOpen />
                            </Button>
                            <SearchBox />
                        </div>

                        {/* Additional Menu Icons */}
                        <div className="col-12 col-sm-6 d-flex align-items-center justify-content-end part3">
                            <Button className="rounded-circle mr-3">
                                <MdOutlineLightMode />
                            </Button>
                            
                            <Button className="rounded-circle mr-3" >
                                <FaCartShopping />
                            </Button>
                                                               
                            <Button className="rounded-circle mr-3">
                                <MdEmail />
                            </Button>
                            
                            <div className="dropdownWrapper position-relative">
                            <Button className="rounded-circle mr-3" onClick={handleOpenNotificationsDrop}>
                                <MdNotificationsNone />
                            </Button>
                            <Menu
                                            anchorEl={notificationDrop}
                                            className="notification dropdown_list"
                                            id="notification"
                                            open={openNotification}
                                            onClose={handleClosenotificationsDrop}
                                            onClick={handleClosenotificationsDrop}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            
                                            <div className="head pl-3 pb-0">
                                            <h4>Orders (12)</h4>
                                            </div>

                                            <Divider className="mb-3"/>
                                                
                                            <MenuItem onClick={handleClosenotificationsDrop}>
                                            <div className="d-flex align-items-center">
                                                    <div className="userImg">
                                                     <span className="rounded-circle">

                                                    <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt=""/>
                                                         </span>
                                                     </div>

                                                     <div  className="info">
                                                        <h4><span><b>Mahmudul</b> added to his favourite list <b>Leather belt steve medden</b></span></h4>
                                                     </div>
                                            </div>
                                            </MenuItem>
                                            
                                        </Menu>

                            </div>


                            <div className="myAccWrapper">
                            <Button className="myAcc d-flex align-items-center"  onClick={handleOpenMyAccDrawer}>
                                    <div className="userImg">
                                        <span className="rounded-circle">

                                            <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt=""/>
                                        </span>
                                    </div>
                                    <div className="userInfo"> 
                                        <h4>Rinku Verma</h4>
                                        <p className="mb-0">@micoder</p>
                                    </div>
                                
                            </Button>
                            
                                        <Menu
                                            anchorEl={anchorEl}
                                            id="account-menu"
                                            open={openMyAcc}
                                            onClose={handleCloseMyAccDrawer}
                                            onClick={handleCloseMyAccDrawer}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >

                                            <MenuItem onClick={handleCloseMyAccDrawer}>
                                            <ListItemIcon>
                                                <PersonAdd fontSize="small" />
                                            </ListItemIcon>
                                            My Account
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseMyAccDrawer}>
                                            <ListItemIcon>
                                                <FaShieldAlt />
                                            </ListItemIcon>
                                            Reset Password
                                            </MenuItem>
                                            <MenuItem onClick={handleCloseMyAccDrawer}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                            </MenuItem>
                                        </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
