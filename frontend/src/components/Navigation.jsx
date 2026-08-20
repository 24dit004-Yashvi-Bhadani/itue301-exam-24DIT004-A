import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">Library System</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/borrow">Borrow</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;