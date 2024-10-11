import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { createContext, useState } from 'react';
import Leads from './components/Leads/index.js';
import Chat from './components/Chat/index';

const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
  };


  

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <Header />
          <div className='main d-flex'>
            <div className={`sidebarWrapper ${isToggleSidebar ? 'toggle' : ''}`}>
              <Sidebar />
            </div>

            <div className={`content ${isToggleSidebar ? 'toggle' : ''}`}>
              <Routes>
                <Route path="/" exact={true} element={<Dashboard />} />
                <Route path="/dashboard" exact={true} element={<Dashboard />} />
                <Route path="/leads" exact={true} element={<Leads />} />
                <Route path="/chats"  element={<Chat />} />
              </Routes>
            </div>
          </div>
        </MyContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
export { MyContext };
