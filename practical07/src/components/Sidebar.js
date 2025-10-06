import { useState } from 'react';
import { FaBars, FaCogs, FaLaptopCode, FaUniversity } from 'react-icons/fa';

const Sidebar = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setIsOpen(false); 
  };

  const menuItems = [
    { id: 'charusat', name: 'Charusat', icon: <FaUniversity /> },
    { id: 'depstar', name: 'Depstar', icon: <FaLaptopCode /> },
    { id: 'cse', name: 'CSE', icon: <FaCogs /> }
  ];

  return (
    <>
      {/* Bootstrap Navbar Toggle Button */}
      <button 
        className="btn btn-primary position-fixed top-0 start-0 m-3" 
        style={{zIndex: 1051}}
        onClick={toggleSidebar}
        type="button"
      >
        <FaBars />
      </button>
      
      {/* Bootstrap Offcanvas Sidebar */}
      <div className={`offcanvas offcanvas-start ${isOpen ? 'show' : ''}`} style={{visibility: isOpen ? 'visible' : 'hidden'}}>
        <div className="offcanvas-header bg-dark text-white">
          <h5 className="offcanvas-title">Navigation Menu</h5>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={toggleSidebar}
          ></button>
        </div>
        
        <div className="offcanvas-body bg-dark">
          <ul className="nav nav-pills flex-column">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item mb-2">
                <button 
                  className={`btn w-100 text-start d-flex align-items-center ${
                    currentPage === item.id ? 'btn-primary' : 'btn-outline-light'
                  }`}
                  onClick={() => handleNavigation(item.id)}
                >
                  <span className="me-3 fs-5">{item.icon}</span>
                  <span className="flex-grow-1">{item.name}</span>
                  <span>→</span>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto pt-4">
            <div className="text-center text-light">
              <p className="mb-1 fw-bold">Academic Portal</p>
              <small className="text-muted">Version 1.0</small>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bootstrap Backdrop */}
      {isOpen && <div className="offcanvas-backdrop fade show" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;