import { useState, useEffect, useMemo } from "react";
import { FaHome,FaStore,FaOpencart  } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbTruckDelivery } from "react-icons/tb";

export default function Navigation() {
    const menus =useMemo(()=> [
        { name: 'Home', icon: <FaHome />, smdis: 'translate-x-3', link: "/" },
        { name: 'Store', icon: <FaStore />, smdis: 'translate-x-[76px]', link: "/shop" },
        { name: 'Cart', icon: <FaOpencart />, smdis: 'translate-x-[145px]', link: "/cart" },
        { name: 'Orders', icon: <TbTruckDelivery />, smdis: 'translate-x-[213px]', link: "/orders" },
        { name: 'Contact', icon: <CgProfile />, smdis: 'translate-x-[280px]', link: "/contact" }
    ],[]);

    const location = useLocation();
    const [active, setActive] = useState(0);

    useEffect(() => {
        const currentPath = location.pathname;
        const activeIndex = menus.findIndex(menu => menu.link === currentPath);
        setActive(activeIndex !== -1 ? activeIndex : 0);
    }, [location.pathname,menus]);

    return (
        <div className="bg-[#bbe6b9] h-[70px] p-2 font-body3 rounded-t-xl font-abc fixed bottom-0 w-full z-50">
            <ul className="flex relative h-full">
                {menus.map((menu, i) => (
                    <li key={i} className="w-full">
                        <Link to={menu.link} className="flex flex-col items-center justify-center text-center py-3 cursor-pointer" onClick={() => setActive(i)}>
                            <span className={`text-3xl duration-500 ${i === active ? ' text-gray-700' : 'text-white'}`}>{menu.icon}</span>
                            <span className={`text-sm font-normal duration-700 ${active === i ? 'text-gray-700' : 'text-gray-700'}`}>{menu.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
