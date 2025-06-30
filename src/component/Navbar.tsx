import CustomButton from "./ui/button";
import { Link } from "react-router-dom";
import { Typography, Popover, Avatar } from "@mui/material";
import { useState } from "react";
// import NoImage from "../assets/NoImage.png";
import { useNavigate } from "react-router-dom";
import { IsLoggedin, GetStorage } from "../service/authservice";
import { logout } from "../redux/sliceing/authslice";
import { useDispatch } from "react-redux";

function Navbar() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [isdropdownopen, setisDropdownOpen] = useState(false);
  const getstorage = GetStorage();
  const handleLogout = () => {
    dispatch(logout());
    navigator("/signin");
  };
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          {/* <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-lg">
          <Phone className="h-5 w-5" />
        </div> */}
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            VerifyPhone
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
        <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Home
          </Link>
          <Link
            to="/features"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Pricing
          </Link>
          <Link
            to="/docs"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Documentation
          </Link>
          {/* <Link
            to="/blog"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Blog
          </Link> */}
        </nav>
        <div className="flex items-center gap-2 ">
          {IsLoggedin() ? (
            <div>
              <Typography
                variant="h6"
                noWrap
                component="div"
                className={`!ml-auto rounded-full ${
                  isdropdownopen ? " ease-in duration-300  " : "bg-white"
                } flex items-center justify-center`}
                aria-describedby={"simple-popover"}
              >
                <div className="flex items-center justify-between cursor-pointer">
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      mb: 1,
                      bgcolor: "primary.main",
                    }}
                    alt="Admin User"
                    onClick={() => setisDropdownOpen(true)}
                  >
                    {getstorage?.name.slice(0, 1) || ""}
                  </Avatar>
                </div>
              </Typography>
              <Popover
                open={isdropdownopen}
                onClose={() => setisDropdownOpen(false)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  ".MuiPopover-paper": {
                    top: "55px !important",
                  },
                }}
              >
                <div className="w-64 ">
                  <div className="flex flex-col justify-center items-center my-4">
                    <div
                      className="flex  w-full font-semibold text-xs p-2 mt-3 cursor-pointer"
                      onClick={() => {
                        setisDropdownOpen(false);
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          mb: 1,
                          bgcolor: "primary.main",
                        }}
                        alt="Admin User"
                      >
                        {getstorage?.name.slice(0, 1) || ""}
                      </Avatar>

                      <div className="flex flex-col w-full ml-3">
                        <p className="text-black-900 font-medium text-sm capitalize">
                          {getstorage?.name || ""}
                        </p>
                        <p className="text-black-900 text-opacity-30 font-medium sm:text-[9px] text-[11px]  w-40 break-words">
                          {getstorage?.email || ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col w-full mt-2">
                      <p className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer">
                        Profile Settings
                      </p>
                      <p className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer hover:bg-gray-100 hover:pb-1 ">
                        Payment Method
                      </p>
                      <p className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer hover:bg-gray-100 hover:pb-1 ">
                        Manage Shorts
                      </p>
                      <p className="text-xs font-medium text-black-900 pl-3 pt-2 cursor-pointer hover:bg-gray-100 hover:pb-1 ">
                        Settings
                      </p>
                      <p
                        className="text-xs font-medium text-red-500 pl-3 pt-2 cursor-pointer hover:bg-gray-100 hover:pb-1 "
                        onClick={() => handleLogout()}
                      >
                        {" "}
                        Sign Out
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-around items-center bg-grey-200"></div>
                </div>
              </Popover>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CustomButton
                handleButtonClick={() => navigator("/signin")}
                type={"button"}
                label="Login"
                labelClass="text-black capitalize"
              />
              <CustomButton
                handleButtonClick={() => navigator("/signup")}
                type={"button"}
                label="Signup"
                styleClass={
                  "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                }
                labelClass="text-white"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
