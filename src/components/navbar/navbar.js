import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          VIDEOTECA SCCOT
        </Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/VideoForm">
                Agregar Video
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" component={NavLink} to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
