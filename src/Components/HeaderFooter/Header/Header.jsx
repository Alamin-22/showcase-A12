import { Link, NavLink } from "react-router-dom";

const Header = () => {

    const PageLinks = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/About"}>AboutUs</NavLink></li>
        <li><NavLink to={"/Blog"}>Blog</NavLink></li>
        <li><NavLink to={"/ContactUs"}>ContactUs</NavLink></li>
    </>
    const user = false;

    const handleLogout = () => {
        // logOut()
        //     .then()
        //     .catch()
    }
    return (
        <div>
            <div className="drawer ">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-[#73d5ee60]">
                        <div className=" w-full max-w-7xl mx-auto">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </label>
                            </div>
                            <div className="flex-1 px-2 mx-2">
                                <figure className="flex items-end gap-0">
                                    <img className="h-16" src="https://i.ibb.co/GWbk0LX/Capture-removebg-preview-1.png" alt="Logo" />
                                    <div>
                                        <p className="font-semibold text-lg">PrimeCare Diagnostics</p>
                                        <p className="text-sm text-gray-700">Your Health, Our Priority</p>
                                    </div>
                                </figure>
                            </div>
                            <div className="flex-none hidden lg:block">
                                <ul className="menu menu-horizontal">
                                    {PageLinks}
                                </ul>
                            </div>
                            <div>
                                {user ? (
                                    <div className="dropdown dropdown-end ">
                                        <label tabIndex={0} className="cursor-pointer">
                                            <div className="avatar online">
                                                <div className="w-10 rounded-full">
                                                    <img src={user.photoURL} />
                                                    {/* <img src="https://i.ibb.co/vDKyLSS/My-Offical-pic.jpg" /> */}
                                                </div>
                                            </div>
                                        </label>
                                        <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <p className="px-4 py-2 hover:bg-base-300 rounded-lg"> {user.displayName}</p>
                                            <NavLink to="/DashBoard" className="px-4 py-2 hover:bg-base-300 rounded-lg">
                                                DashBoard
                                            </NavLink>

                                            <div onClick={handleLogout}
                                                className="cursor-pointer text-red-500 px-4 py-2 hover:bg-base-300 rounded-lg">
                                                Logout
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <NavLink to="/login" className="btn bg-[#219ebc] hover:bg-[#3c738f] text-white  btn-sm border-none ">
                                        Login
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        {PageLinks}
                        <Link to={"/appointment"} className="btn btn-primary ">Appointment</Link>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Header;