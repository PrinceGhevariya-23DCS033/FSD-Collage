import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import CSE from './components/pages/CSE';
import Charusat from './components/pages/Charusat';
import Depstar from './components/pages/Depstar';
import download from './download.webp';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'charusat':
        return <Charusat />;
      case 'depstar':
        return <Depstar />;
      case 'cse':
        return <CSE />;
      default:
        return (
          <div className="bg-light min-vh-100">
            <div className="container py-5">
              {/* Header Section */}
              <div className="text-center mb-5">
                <div className="mb-4">
                  <img src={download} className="App-logo" alt="logo" style={{height: '120px'}} />
                </div>
                <h1 className="display-3 fw-bold text-dark mb-3">Welcome to CHARUSAT Navigation</h1>
                <p className="lead text-muted mb-4">Explore our academic institutions and departments</p>
                <hr className="w-25 mx-auto border-primary border-3" />
              </div>
              
              {/* Welcome Cards */}
              <div className="row g-4 mb-5">
                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm bg-white">
                    <div className="card-body text-center p-5">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-4 d-inline-block mb-4">
                        <span className="fs-1 text-primary">🏛️</span>
                      </div>
                      <h3 className="fw-bold text-dark mb-3">Charusat University</h3>
                      <p className="text-muted mb-4">Explore our premier educational institution with world-class facilities</p>
                      <div className="d-grid">
                        <button className="btn btn-outline-primary" onClick={() => handleNavigation('charusat')}>Learn More</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm bg-white">
                    <div className="card-body text-center p-5">
                      <div className="bg-success bg-opacity-10 rounded-circle p-4 d-inline-block mb-4">
                        <span className="fs-1 text-success">💻</span>
                      </div>
                      <h3 className="fw-bold text-dark mb-3">Depstar Institute</h3>
                      <p className="text-muted mb-4">Discover our IT and Computer Science programs with modern curriculum</p>
                      <div className="d-grid">
                        <button className="btn btn-outline-success" onClick={() => handleNavigation('depstar')}>Explore Programs</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm bg-white">
                    <div className="card-body text-center p-5">
                      <div className="bg-warning bg-opacity-10 rounded-circle p-4 d-inline-block mb-4">
                        <span className="fs-1 text-warning">⚙️</span>
                      </div>
                      <h3 className="fw-bold text-dark mb-3">CSE Department</h3>
                      <p className="text-muted mb-4">Learn about Computer Science & Engineering with cutting-edge technology</p>
                      <div className="d-grid">
                        <button className="btn btn-outline-warning" onClick={() => handleNavigation('cse')}>Start Journey</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <div className="card border-0 shadow-sm bg-primary text-white">
                  <div className="card-body p-5">
                    <h2 className="fw-bold mb-3">Ready to Begin Your Academic Journey?</h2>
                    <p className="lead mb-4">Use the sidebar menu to explore our institutions and find the perfect program for you</p>
                    <button className="btn btn-light btn-lg px-5">Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <Sidebar onNavigate={handleNavigation} currentPage={currentPage} />
      <div className="main-content" style={{ marginLeft: '0', width: '100%' }}>
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default App;
