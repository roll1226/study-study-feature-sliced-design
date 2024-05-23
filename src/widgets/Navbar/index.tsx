import { Link } from "react-router-dom";

const Navbar = () => (
  <>
    <Link to="/" data-testid="main-page-link">
      Main Page
    </Link>{" "}
    |{" "}
    <Link to="/sub" data-testid="sub-page-link">
      Sub Page
    </Link>
  </>
);

export default Navbar;
