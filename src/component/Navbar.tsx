import CustomButton from "./ui/button";
import {Link} from "react-router-dom";

function Navbar() {
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
        <Link to="#features" className="text-gray-600 hover:text-gray-900 font-medium">
          Features
        </Link>
        <Link to="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
          Pricing
        </Link>
        <Link to="/docs" className="text-gray-600 hover:text-gray-900 font-medium">
          Documentation
        </Link>
        <Link to="/blog" className="text-gray-600 hover:text-gray-900 font-medium">
          Blog
        </Link>
      </nav>
      <div className="flex items-center gap-2 ">
      <CustomButton type={'button'} label="Login" labelClass="text-black capitalize" />
      <CustomButton type={'button'} label="Signup"styleClass={"bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"}labelClass="text-white"/>
      </div>
    </div>
  </header>
  )
}

export default Navbar