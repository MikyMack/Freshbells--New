import Logo from "../../assets/logo/logo.webp";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown, FaHeart,FaSearch  } from "react-icons/fa";


const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 3,
    name: "Cart",
    link: "/#",
  },
  {
    id: 4,
    name: "About",
    link: "/#",
  },
  {
    id: 5,
    name: "Contact",
    link: "/#",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Super Foods",
    link: "/#",
  },
  {
    id: 2,
    name: "Premium Products",
    link: "/#",
  },
  {
    id: 3,
    name: "Healthy Delights",
    link: "/#",
  },
];
const MealPlans=[{
  id:1,
  name:"Healthy Diets",
  SubNames:[{name:"Weight Loss Diet",link:"/#"},{name:"Weight Gain Diet",link:"/#"}],
  link:"/#"
},{
id:2,
name:"Diet Plan For Age",
SubNames:[{name:"School Student",link:"/#"},{name:"Adults",link:"/#"},{name:"Geriatric",link:"/#"},{name:"Weaning",link:"/#"}],
link:"/#"
},{
  id:3,
  name:"Special Conditions",
  SubNames:[{name:"Expectant Mothers",link:"/#"},{name:"Lactating Mothers",link:"/#"},{name:"PCOD",link:"/#"},{name:"Diabetes Mellitus Diet",link:"/#"},{name:"Gluten Free Diet",link:"/#"},{name:"Lactose Intolerent",link:"/#"}],
  link:"/#"
}]

const Navbar = () => {

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
    {/* upper Navbar */}
    <div className="bg-primary/40 py-2">
      <div className="container flex justify-between items-center">
        {/* Left side: Logo */}
        <div className="flex-1">
          <img src={Logo} alt="Logo" className="w-32" />
        </div>
  
        {/* Center: Search bar */}
        <div className="flex-1 justify-center hidden sm:flex">
          <div className="relative group hover:scale-105 duration-300">
            <input
              type="text"
              placeholder="Search for Products,Categories..."
              className="w-[200px] sm:w-[400px] md:w-[400px] transition-all duration-300 font-body1 rounded-lg border border-primary px-2 py-2 focus:outline-none focus:border-1 focus:border-primary "
            />
            <FaSearch className="text-gray-900 absolute top-1/2 -translate-y-1/2 right-3 " />
          </div>
        </div>
  
        {/* Right side: Buttons */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="hidden sm:flex gap-2">
            <button
              className="bg-gradient-to-r from-primary to-secondary transition-all text-white py-2 px-5 rounded-2xl flex items-center gap-3 group hover:scale-125 duration-300"
            >
              <FaHeart className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            <button
              className="bg-gradient-to-r from-primary to-secondary transition-all text-white py-2 px-5 rounded-2xl flex items-center gap-3 group hover:scale-125 duration-300"
            >
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>  
          </div>
          <button
              className="bg-gradient-to-r from-primary to-secondary transition-all text-white py-2 px-5 rounded-2xl flex items-center gap-3 group hover:scale-125 duration-300 font-body4 shadow shadow-secondary"
            >
             Login
            </button>
        </div>
      </div>
    </div>  
  
    {/* lower Navbar */}
    <div data-aos="zoom-in" className="flex justify-center">
      <ul className="sm:flex hidden items-center gap-4">
        {Menu.map((data) => (
          <li key={data.id}>
            <a
              href={data.link}
              className="inline-block px-4 text-lg font-body1 text-primary hover:text-secondary duration-200"
            >
              {data.name}
            </a>
          </li>
        ))}
        <li className="group relative cursor-pointer">
            <a href="/meal-plans" className="flex items-center gap-[2px] py-2 text-lg font-body1 hover:text-secondary duration-200">
              Meals Plans
              <span>
                <FaCaretDown className="transition-all duration-200" />
              </span>
            </a>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {MealPlans.map((plan) => (
                  <li key={plan.id} className="group relative cursor-pointer">
                    <a
                      href={plan.link}
                      className="inline-block w-full rounded-md p-2 hover:bg-primary/20 text-lg font-body1"
                    >
                      {plan.name}
                      <span>
                        <FaCaretDown className="ml-2 transition-all duration-200" />
                      </span>
                    </a>
                    {/* Sub-menu */}
                    <div className="absolute left-full top-0 hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                      <ul>
                        {plan.SubNames.map((sub) => (
                          <li key={sub.name}>
                            <a
                              href={sub.link}
                              className="inline-block w-full rounded-md p-2 hover:bg-primary/20 text-lg font-body1"
                            >
                              {sub.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        {/* Simple Dropdown and Links */}
        
        <li className="group relative cursor-pointer">
          <a href="#" className="flex items-center gap-[2px] py-2 text-lg font-body1 hover:text-secondary duration-200">
            Special Categories
            <span>
              <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
            </span>
          </a>
          <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
            <ul>
              {DropdownLinks.map((data) => (
                <li key={data.id}>
                  <a
                    href={data.link}
                    className="inline-block w-full rounded-md p-2 hover:bg-primary/20 text-lg font-body1"
                  >
                    {data.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
  

  );
};

export default Navbar;





