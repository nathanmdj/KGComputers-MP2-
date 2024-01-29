import 'bootstrap/dist/js/bootstrap.bundle'
import { NavLink, Link } from 'react-router-dom';
import logoImage from '../../assets/logo.png';
import './header.scss';
import Login from '../Login/Login';


function Header() {
  return (
    <>
      <header className="fixed-top">
      {/* NAVBAR */}
      <nav className="navbar pt-3 pb-3 navbar-dark bg-secondary ">
        <div className="container-md d-flex">
          <div className="d-flex gap-2 align-items-center">
            <button
              className="navbar-toggler d-md-none pe-2 ps-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-items"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div>
              <Link
                to='/'
              >
                <img src={logoImage} alt="" className='brand-logo'/>
              </Link>
            </div>
          </div>
          {/* logo */}
          <div className="sign-in-logo gap-2 d-flex ">
            <a className="" href="/">
              <i className="bi bi-cart4"></i>
            </a>

            {/* <button
              className="border-0 bg-secondary"
              data-bs-toggle="modal"
              data-bs-target="#signin"
            >
              <i className="bi bi-person"></i>
              <span>Login</span>
            </button> */}
            <Login
            />
              
          
          </div>

          {/* menu */}
          <div className="collapse navbar-collapse navbar-hide d-md-none" id="navbar-items">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className='nav-item '>
            <NavLink
            to="/"
              className={({isActive}) =>
              `nav-link 
              ${isActive ? 'active' : "not-active" }`
              }
              
            >
              Home
            </NavLink>
            </li>
            <li>
            <NavLink
            to="/desktop"
              className={({isActive}) =>
              `nav-link 
              ${isActive ? 'active' : "not-active" }`
              }
            >
              Desktop
            </NavLink>
            </li>
            <li>
            <NavLink
            to="/laptop"
              className={({isActive}) =>
              `nav-link 
              ${isActive ? 'active' : "not-active" }`
              }
            >
              Laptop
            </NavLink>
            </li>
            <li>
            <NavLink
            to="/peripherals"
              className={({isActive}) =>
              `nav-link 
              ${isActive ? 'active' : "not-active" }`
              }
            >
              Peripherals
            </NavLink>
            </li>
            <li>
            <NavLink
            to="/components"
              className={({isActive}) =>
              `nav-link 
              ${isActive ? 'active' : "not-active" }`
              }
            >
              Components
            </NavLink>
            </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* MENU BAR */}
      <div className="p-3 p-md-0 d-flex align-items-center  bg-light justify-content-center">
        <div className="menu-items">
          <ul className="nav justify-content-center d-none d-md-flex">
            <li>
            <NavLink
            to="/"
              className={({isActive}) =>
              `nav-link 
              ${isActive ? "text-secondary" : "text-primary" }`
              }
            >
              Home
            </NavLink>
            </li>
            <li>
            <NavLink
            to="/desktop"
              className={({isActive}) =>
              `nav-link 
              ${isActive ? "text-secondary" : "text-primary" }`
              }
            >
              Desktop
            </NavLink>
            </li>
            <li>
            <NavLink
            to="/laptop"
              className={({isActive}) =>
              `nav-link 
              ${isActive ? "text-secondary" : "text-primary" }`
              }
            >
              Laptop
            </NavLink>
            </li>
            <li>
            <NavLink
            to="/peripherals"
              className={({isActive}) =>
              `nav-link 
              ${isActive ? "text-secondary" : "text-primary" }`
              }
            >
              Peripherals
            </NavLink>
            </li>
            <li>
            <NavLink
            to="/components"
              className={({isActive}) =>
              `nav-link 
              ${isActive ? "text-secondary" : "text-primary" }`
              }
            >
              Components
            </NavLink>
            </li>
            
          </ul>
        </div>

        <div>
          <form action="search.html" className="d-flex m-md-3 " role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
    </>
  );
}

export default Header;