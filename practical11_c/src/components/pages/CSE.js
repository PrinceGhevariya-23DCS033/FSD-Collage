

const CSE = () => {
  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        {/* Header Section */}
        <div className="text-center mb-5">
          <div className="mb-4">
            {/* Logo placeholder */}
            <div className="bg-primary bg-opacity-10 rounded-circle p-4 d-inline-block mb-3">
              <span className="fs-1">⚙️</span>
            </div>
          </div>
          <h1 className="display-4 fw-bold text-dark mb-3">Computer Science & Engineering</h1>
          <p className="lead text-muted">Building Tomorrow's Technology Leaders</p>
          <hr className="w-25 mx-auto border-primary border-3" />
        </div>
        
        {/* About Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm bg-white">
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="h3 fw-bold text-primary mb-3">About CSE Department</h2>
                    <p className="text-muted mb-4 lh-lg">
                      The Computer Science & Engineering department focuses on modern technology 
                      education including AI, software development, and emerging technologies. 
                      We prepare students for the rapidly evolving tech industry.
                    </p>
                    <div className="d-flex gap-3">
                      <div className="text-center">
                        <h4 className="text-primary fw-bold mb-0">95%</h4>
                        <small className="text-muted">Job Rate</small>
                      </div>
                      <div className="text-center">
                        <h4 className="text-primary fw-bold mb-0">30+</h4>
                        <small className="text-muted">Courses</small>
                      </div>
                      <div className="text-center">
                        <h4 className="text-primary fw-bold mb-0">15+</h4>
                        <small className="text-muted">Projects</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-4 d-inline-block">
                      <span className="fs-1 text-primary">💡</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm bg-white">
              <div className="card-body text-center p-4">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <span className="fs-3 text-primary">🤖</span>
                </div>
                <h4 className="fw-bold text-dark mb-3">AI & Machine Learning</h4>
                <p className="text-muted mb-0">Advanced artificial intelligence and ML technologies</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm bg-white">
              <div className="card-body text-center p-4">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <span className="fs-3 text-primary">🌐</span>
                </div>
                <h4 className="fw-bold text-dark mb-3">Web Technologies</h4>
                <p className="text-muted mb-0">Full-stack development and modern frameworks</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm bg-white">
              <div className="card-body text-center p-4">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <span className="fs-3 text-primary">🔒</span>
                </div>
                <h4 className="fw-bold text-dark mb-3">Cybersecurity</h4>
                <p className="text-muted mb-0">Information security and data protection</p>
              </div>
            </div>
          </div>
        </div>
        
        
       

    
        <div className="text-center">
          <div className="card border-0 shadow-sm bg-primary text-white">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-3">Build Your Tech Future</h3>
              <p className="mb-4">Join the CSE department and master the technologies that shape tomorrow</p>
              <button className="btn btn-light btn-lg px-4">Start Your Journey</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSE;
