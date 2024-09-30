import React, { useEffect, useState, lazy, Suspense } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import SpecialCase from "../../components/SpecialCase/SpecialCase";
import Header from "../../components/home/Header/Header";
import HeaderBottom from "../../components/home/Header/HeaderBottom";
import HomeNutritionForm from "../../components/SpecialCase/HomeNutritionForm";
import { fetchHomeDetails } from "../../actions/HomeActions";
import Loader from "../../components/Loader/Loader";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css"
import Navigation from "../../components/home/Header/Navigation";

const BestSellersLazy = lazy(() => import("../../components/home/BestSellers/BestSellers"));
const NewArrivalsLazy = lazy(() => import("../../components/home/NewArrivals/NewArrivals"));
const SaleLazy = lazy(() => import("../../components/home/Sale/Sale"));
const SpecialOffersLazy = lazy(() => import("../../components/home/SpecialOffers/SpecialOffers"));
const YearProductLazy = lazy(() => import("../../components/home/YearProduct/YearProduct"));
const FeaturesLazy = lazy(() => import("../../components/features/Features"));
const OfferLazy = lazy(() => import("../../components/home/OfferCard/Offer"));
const FooterLazy = lazy(() => import("../../components/home/Footer/Footer"));
const FooterBottomLazy = lazy(() => import("../../components/home/Footer/FooterBottom"));

const Home = () => {
  const isLoading = useSelector(state => state.auth.isLoading);
  const dispatch = useDispatch();
  const [showNutritionForm, setShowNutritionForm] = useState(false);

  const closeNutritionForm = () => {
    setShowNutritionForm(false);
    localStorage.setItem('nutritionFormClosed', 'true'); 
  };

  useEffect(() => {
    const isFormClosed = localStorage.getItem('nutritionFormClosed') === 'true';
    if (!isFormClosed) {
      const timer = setTimeout(() => {
        setShowNutritionForm(true);
      }, 4000); 
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchHomeDetails());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="parent-div ">
      {showNutritionForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <HomeNutritionForm onClose={closeNutritionForm}/>
          <button onClick={closeNutritionForm} className="absolute top-5 right-5 text-white text-2xl">&times;</button>
        </div>
      )}
      <Header />
      <HeaderBottom />
      <ToastContainer />
      <div className="w-full mx-auto overflow-x-hidden scroll-smooth bg-[#EFFDEC] ">
        <Banner />
        <SpecialCase />
        <BannerBottom />
        <Suspense fallback={<div><Loader /></div>}>
          <div className="mx-auto  mt-10">
            <NewArrivalsLazy />
          </div>
          <FeaturesLazy />
          <BestSellersLazy />
          <YearProductLazy />
          <SpecialOffersLazy />
          <div className="overflow-hidden mb-8 shadow-lg">
            <SaleLazy />
          </div>
          <OfferLazy />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <FooterLazy />
        <FooterBottomLazy />
      </Suspense>
      <div className="block lg:hidden overflow-hidden mt-24">
        <Navigation />
      </div>
    </div> 
  );
};

export default Home;
