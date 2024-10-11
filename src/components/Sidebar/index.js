import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { RxDashboard } from 'react-icons/rx';
import { FaAngleRight } from 'react-icons/fa';
import { BsChatSquareDots } from 'react-icons/bs';
import { SiGoogleadsense } from 'react-icons/si';
import { MdEditCalendar } from 'react-icons/md';
import { GrApps } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import './style.css';
import { MyContext } from '../../App';

const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(null); // Set to null initially


    const context = useContext(MyContext)

    const toggleSubmenu = (index) => {
        setActiveTab(activeTab === index ? null : index); // Toggle the active tab or close it
    };

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/dashboard">
                        <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`}  onClick={() => toggleSubmenu(0)}>
                            <span className="icon">
                                <RxDashboard />
                            </span>
                            Dashboard
                            <span className="arrow">
                                <FaAngleRight />
                            </span>
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/leads">
                        <Button className={`w-100 ${activeTab === 1 ? 'active' : ''}`}  onClick={() => toggleSubmenu(1)}>
                            <span className="icon">
                                <SiGoogleadsense />
                            </span>
                            Leads
                            <span className="arrow">
                                <FaAngleRight />
                            </span>
                        </Button>
                    </Link>
                </li>

                <li>
                    <Link to="/chats">
                        <Button className={`w-100 ${activeTab === 2 ? 'active' : ''}`}  onClick={() => toggleSubmenu(2)}>
                            <span className="icon">
                                <BsChatSquareDots />
                            </span>
                            Chats
                            <span className="arrow"> 
                                <FaAngleRight />
                            </span>
                        </Button>
                    </Link>
                </li>

                <li>
                    <Button
                        className={`w-100 ${activeTab === 3 ? 'active' : ''}`}
                        onClick={() => toggleSubmenu(3)}
                    >
                        <span className="icon">
                            <GrApps />
                        </span>
                        Apps
                        <span className="arrow">
                            <FaAngleRight />
                        </span>
                    </Button>
                    <div
                        className={`submenuWrapper ${
                            activeTab === 3 ? 'colapse' : 'colapsed'
                        }`}
                    >
                        <ul className="submenu">
                            <li>
                                <Link to="/whatsapp">WhatsApp</Link>
                            </li>
                            <li>
                                <Link to="/facebook">Facebook</Link>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <Link to="/calendar">
                        <Button className={`w-100 ${activeTab === 4 ? 'active' : ''}`}  onClick={() => toggleSubmenu(4)}>
                            <span className="icon">
                                <MdEditCalendar />
                            </span>
                            Calendar
                            <span className="arrow">
                                <FaAngleRight />
                            </span>
                        </Button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
