
import download from '../../download.webp';

const Charusat = () => {
  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        {/* Header Section */}
        <div className="text-center mb-5">
          <div className="mb-4">
            <div className="bg-primary bg-opacity-10 rounded-circle p-4 d-inline-block mb-3">
              <img src={download} alt="Charusat Logo" style={{height: 120, width: 120, objectFit: 'contain'}} />
            </div>
          </div>
          <h1 className="display-4 fw-bold text-dark mb-3">Charusat University</h1>
          <p className="lead text-muted">Charotar University of Science and Technology</p>
          <hr className="w-25 mx-auto border-primary border-3" />
        </div>
        
        {/* About Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm bg-white">
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="h3 fw-bold text-primary mb-3">About Charusat University</h2>
                    <p className="text-muted mb-4 lh-lg">
                      Charusat University is a leading educational institution dedicated to providing 
                      quality education in engineering, technology, and applied sciences. We foster 
                      innovation, research, and academic excellence.
                    </p>
                    <div className="d-flex gap-3">
                      <div className="text-center">
                        <h4 className="text-primary fw-bold mb-0">15,000+</h4>
                        <small className="text-muted">Students</small>
                      </div>
                      <div className="text-center">
                        <h4 className="text-primary fw-bold mb-0">500+</h4>
                        <small className="text-muted">Faculty</small>
                      </div>
                      <div className="text-center">
                        <h4 className="text-primary fw-bold mb-0">50+</h4>
                        <small className="text-muted">Programs</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-4 d-inline-block">
                      <span className="fs-1 text-primary">🎓</span>
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
                  <span className="fs-3 text-primary">🎓</span>
                </div>
                <h4 className="fw-bold text-dark mb-3">Quality Education</h4>
                <p className="text-muted mb-0">Comprehensive academic programs with industry-relevant curriculum</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm bg-white">
              <div className="card-body text-center p-4">
                <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <span className="fs-3 text-success">🔬</span>
                </div>
                <h4 className="fw-bold text-dark mb-3">Research & Innovation</h4>
                <p className="text-muted mb-0">State-of-the-art research facilities and innovation centers</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm bg-white">
              <div className="card-body text-center p-4">
                <div className="bg-warning bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <span className="fs-3 text-warning">⭐</span>
                </div>
                <h4 className="fw-bold text-dark mb-3">Excellence</h4>
                <p className="text-muted mb-0">Commitment to academic excellence and student success</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card border-0 shadow-sm bg-primary text-white">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-3">Join Our Academic Community</h3>
              <p className="mb-4">Discover opportunities for growth, learning, and innovation at Charusat University</p>
              <button className="btn btn-light btn-lg px-4">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charusat;
