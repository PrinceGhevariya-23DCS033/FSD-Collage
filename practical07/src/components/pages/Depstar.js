

const Depstar = () => {
  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
    
        <div className="text-center mb-5">
          <div className="mb-4">
        
            <div className="bg-success bg-opacity-10 rounded-circle p-4 d-inline-block mb-3">
              <span className="fs-1">💻</span>
              
            </div>
          </div>
          <h1 className="display-4 fw-bold text-dark mb-3">Depstar Institute</h1>
          <p className="lead text-muted">Department of Computer Science & Information Technology</p>
          <hr className="w-25 mx-auto border-success border-3" />
        </div>
        
        
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm bg-white">
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="h3 fw-bold text-success mb-3">About Depstar Institute</h2>
                    <p className="text-muted mb-4 lh-lg">
                      Depstar is a leading institute specializing in computer science and 
                      information technology education with modern curriculum, cutting-edge facilities,
                      and industry partnerships that prepare students for the digital future.
                    </p>
                    <div className="d-flex gap-3">
                      <div className="text-center">
                        <h4 className="text-success fw-bold mb-0">100%</h4>
                        <small className="text-muted">Placement</small>
                      </div>
                      <div className="text-center">
                        <h4 className="text-success fw-bold mb-0">50+</h4>
                        <small className="text-muted">Companies</small>
                      </div>
                      <div className="text-center">
                        <h4 className="text-success fw-bold mb-0">20+</h4>
                        <small className="text-muted">Labs</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="bg-success bg-opacity-10 rounded-circle p-4 d-inline-block">
                      <span className="fs-1 text-success">🖥️</span>
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
                <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <span className="fs-3 text-success">💻</span>
                </div>
                <h4 className="fw-bold text-dark mb-3">Modern Computing</h4>
                <p className="text-muted mb-0">Latest technologies and programming languages</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm bg-white">
              <div className="card-body text-center p-4">
                <div className="bg-info bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <span className="fs-3 text-info">🚀</span>
                </div>
                <h4 className="fw-bold text-dark mb-3">Innovation Hub</h4>
                <p className="text-muted mb-0">Startup incubation and project development</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm bg-white">
              <div className="card-body text-center p-4">
                <div className="bg-warning bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <span className="fs-3 text-warning">🎯</span>
                </div>
                <h4 className="fw-bold text-dark mb-3">Career Focus</h4>
                <p className="text-muted mb-0">Industry placement and career guidance</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Programs Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm bg-white">
              <div className="card-header bg-success text-white text-center py-3">
                <h3 className="fw-bold mb-0">Academic Programs</h3>
              </div>
              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded text-center">
                      <h5 className="fw-bold text-success mb-2">B.Tech CSE</h5>
                      <p className="text-muted small mb-0">4 Years Program</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded text-center">
                      <h5 className="fw-bold text-success mb-2">M.Tech SE</h5>
                      <p className="text-muted small mb-0">2 Years Program</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 bg-light rounded text-center">
                      <h5 className="fw-bold text-success mb-2">MCA</h5>
                      <p className="text-muted small mb-0">3 Years Program</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card border-0 shadow-sm bg-success text-white">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-3">Shape Your Tech Career</h3>
              <p className="mb-4">Join Depstar Institute and become part of the next generation of tech innovators</p>
              <button className="btn btn-light btn-lg px-4">Explore Programs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Depstar;
