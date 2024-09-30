import React, { useEffect, useState, lazy, Suspense } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes } from 'react-router-dom';
import PublicRoutes from '../utils/PublicRoutes';
import ProtectedRoutes from '../utils/ProtectedRoutes';
import Home from '../pages/Home/Home';
import ForgetOtp from '../pages/Account/ForgetOtp';
import ResetPasswordPage from '../pages/Account/ResetPassword';

const SignIn = lazy(() => import('../pages/Account/SignIn'));
const SignUp = lazy(() => import('../pages/Account/SignUp'));
const Shop = lazy(() => import('../pages/Shop/Shop'));
const About = lazy(() => import('../pages/About/About'));
const Contact = lazy(() => import('../pages/Contact/Contact'));
const Offer = lazy(() => import('../pages/Offer/Offer'));
const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetails'));
const Cart = lazy(() => import('../pages/Cart/Cart'));
const Payment = lazy(() => import('../pages/payment/Payment'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const WeightsLoss = lazy(() => import('../pages/MealPlans/HealthyDiets/WeightsLoss'));
const Weightsgain = lazy(() => import('../pages/MealPlans/HealthyDiets/WeightGain'));
const WeaningDiet = lazy(() => import('../pages/MealPlans/DietPlanForAge/WeaningDiet'));
const SchoolKids = lazy(() => import('../pages/MealPlans/DietPlanForAge/SchoolKids'));
const AdultsDiet = lazy(() => import('../pages/MealPlans/DietPlanForAge/AdultsDiet'));
const GeriatricDiet = lazy(() => import('../pages/MealPlans/DietPlanForAge/GeriatricDiet'));
const ExpectantMothersDiet = lazy(() => import('../pages/MealPlans/SpecialConditions/ExpectantMothers'));
const LactatingMothersDiet = lazy(() => import('../pages/MealPlans/SpecialConditions/LactatingMothers'));
const PCODdiet = lazy(() => import('../pages/MealPlans/SpecialConditions/PCOD'));
const DiabetesMellitus = lazy(() => import('../pages/MealPlans/SpecialConditions/DiabetesMellitus'));
const GlutenFreeDiet = lazy(() => import('../pages/MealPlans/SpecialConditions/GlutenFreeDiet'));
const LactoseIntrolerent = lazy(() => import('../pages/MealPlans/SpecialConditions/LactoseIntrolerent'));
const OtpPage = lazy(() => import('../pages/Account/Otp'));
const CheckOut = lazy(() => import('../pages/CheckoutPage/CheckOut'));
const Orders = lazy(() => import('../pages/Orderhistory/Orders'));
const ForgotPasswordPage = lazy(() => import('../pages/Account/ForgotPassword'));
const ShopByCategory = lazy(() => import('../components/SpecialShop/ShopByCategory'));

export default function MainRoutes() {
    const [showRoutes, setShowRoutes] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowRoutes(true);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 1200,
            easing: "ease-in",
            delay: 100,
        });
        AOS.refresh();
    }, []);

    return showRoutes ? (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<PublicRoutes />}>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/otppage" element={<OtpPage />} />
                    <Route path='/forgot-password' element={<ForgotPasswordPage />} />
                    <Route path='/forgot-otp' element={<ForgetOtp />} />
                    <Route path='/new-password' element={<ResetPasswordPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/productDetails" element={<ProductDetails />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/offer" element={<Offer />} />
                    <Route path="/WeightsLoss" element={<WeightsLoss />} />
                    <Route path="/weightsGain" element={<Weightsgain />} />
                    <Route path="/weaning" element={<WeaningDiet />} />
                    <Route path="/schoolgoing" element={<SchoolKids />} />
                    <Route path="/adults" element={<AdultsDiet />} />
                    <Route path="/geriatric" element={<GeriatricDiet />} />
                    <Route path="/expectantmothers" element={<ExpectantMothersDiet />} />
                    <Route path="/lactatingmothers" element={<LactatingMothersDiet />} />
                    <Route path="/pcod" element={<PCODdiet />} />
                    <Route path="/diabetes-millets-diet" element={<DiabetesMellitus />} />
                    <Route path="/gluten-free-diet" element={<GlutenFreeDiet />} />
                    <Route path="/lactose-introlerent" element={<LactoseIntrolerent />} />
                    <Route path='/checkout' element={<CheckOut />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/ShopByCategory' element={<ShopByCategory />} />
                </Route>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/paymentgateway" element={<Payment />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<Home />} />
            </Routes>
        </Suspense>
    ) : null;
}
