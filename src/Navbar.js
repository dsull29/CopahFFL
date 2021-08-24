import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="navbar">COPAH Fantasy Football</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/Seasons">Seasons</Link>
                <Link to="/Totals">Totals</Link>

            </div>
        </nav>
      );
}
 
export default Navbar;
