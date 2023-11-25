import { Disclosure } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";


const navigation = [
  { name: "Dashboard", href: "/home", current: true },
  { name: "Generate Paper", href: "/generate", current: false },
  { name: "Past Question Papers", href: "/previous", current: false },
  { name: "Help", href: "/help", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
//{ user, isAuthenticated }
function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    props.logoutUser();
    navigate('/');
  };

  const handleNavigation = (href) => {
    navigate(href);
  };

  const handleLogin = () => {
    navigate('/');
  };

  navigation.forEach((item) => {
    item.current = location.pathname === item.href;
  });


  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">

              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">

                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        onClick={() => handleNavigation(item.href)}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {props.auth.isAuthenticated ? (
                  <div className="flex items-center text-white">
                    <span className="mr-2">
                      <UserIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </span>
                    <span className="mr-4"> {props.auth.user.name}</span>
                    <span className="mr-4">Logged In</span>
                    <input
                      type="button"
                      value="Sign out"
                      onClick={handleLogout}
                      className="text-sm text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md cursor-pointer"
                    />
                  </div>
                ) : (
                  <div>
                    <span className="text-white">Logged Out</span>
                    <input
                      type="button"
                      value="Sign in"
                      onClick={handleLogin}
                      className="ml-4 text-sm text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>


          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )
      }
    </Disclosure >
  );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
  auth: state.auth,

});


export default connect(mapStateToProps, { logoutUser })(Navbar);
