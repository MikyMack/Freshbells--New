
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useEffect, useState } from "react";
import aboutImg from "../../assets/categories/spices.webp"
import aboutImg1 from "../../assets/categories/powders.webp"
import AboutUs from "../../components/About/AboutUs";
import Header from "../../components/home/Header/Header";
import HeaderBottom from "../../components/home/Header/HeaderBottom";
import Footer from "../../components/home/Footer/Footer";
import FooterBottom from "../../components/home/Footer/FooterBottom";
import Navigation from "../../components/home/Header/Navigation";
 
const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);

  const [registeredUsers, setRegisteredUsers] = useState(0);
  const [visitors, setVisitors] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRegisteredUsers((prev) => {
        if (prev < 1053) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    }, 1);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors((prev) => {
        if (prev < 420) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    }, 1);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalProducts((prev) => {
        if (prev < 200) {
          return prev + 1;
        } else {
          return prev;
        }
      });
    }, 1);
    return () => clearInterval(interval);
  }, []);

  return (
<>
<Header />
    <HeaderBottom />
    <div className="bg-[#EFFDEC] font-body3">
    <div className="lg:container mx-auto md:container px-4 overflow-hidden ">    
     <Breadcrumbs title="About Us" prevLocation={prevLocation} />
     <section className="inner-section about-company">
      <div>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-8">
            <div className="about-content">
              <h2 className="text-xl lg:text-xl sm:text-lg bg-white p-3 shadow-lg font-bold font-body2 text-primeColor mb-4">Our new, premier brand Fresh Bells focus on developing and promoting a natural, organic and highly nutritious foods as a solution for life style diseases and wellness care. We believe in promoting health in our communities through sustainable products; acting sustainably and ethically as a business.</h2>
              <p className="text-primeColor font-body2 text-lg">We freshly source produces from purely known farmers, suppliers or groups who are following Organic or natural farming practices after visiting their farms and verifying their produces. We carefully pack the produce in a completely hygienic environment without losing their freshness and make sure to deliver it to your doorstep promptly. We offer food items that are healthy and natural like diet foods, pulses, cereals, seeds, rice, dried fruits, value added products etc. The usage of all our products makes your diet wholesome and tasty.</p>
            </div>
            <ul className="about-list mt-6 lg:mt-8 flex flex-row items-center justify-center gap-2">
              <li className="w-full lg:w-1/2 mb-4 py-2 lg:mb-0 bg-white text-center ">
                <h3 className="text-2xl font-bold text-primeColor ">{registeredUsers}</h3>
                <h6 className="text-lg text-red-500 font-body1 font-semibold">registered users</h6>
              </li>
              <li className="w-full lg:w-1/2 mb-4 py-2 lg:mb-0 bg-white text-center ">
                <h3 className="text-2xl font-bold text-gray-800">{visitors}</h3>
                <h6 className="text-lg text-blue-500 font-body1 font-semibold">per day visitors</h6>
              </li>
              <li className="w-full lg:w-1/2 mb-4 py-2 lg:mb-0 bg-white text-center ">
                <h3 className="text-2xl font-bold text-gray-800">{totalProducts}</h3>
                <h6 className="text-lg text-yellow-500 font-body1 font-semibold">total products</h6>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
            <div className="about-img flex flex-wrap items-center justify-center ">
              <img loading="lazy" src={aboutImg} alt="about" className="w-1/2 lg:w-[250px] h-[250px]  p-3 lg:mb-0 object-contain" />
              <img loading="lazy" src={aboutImg1} alt="about" className="w-1/2 lg:w-[250px] h-[250px] p-3 lg:mb-0 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <AboutUs />
 
  </div>
  </div>
  <Footer />
  <FooterBottom />
  <div className="block lg:hidden overflow-hidden mt-24">
      <Navigation />
      </div>
  </>
  );
};

export default About;
