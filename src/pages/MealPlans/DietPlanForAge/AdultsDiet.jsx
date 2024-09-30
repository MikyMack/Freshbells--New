import React from 'react'
import Header from '../../../components/home/Header/Header'
import HeaderBottom from '../../../components/home/Header/HeaderBottom'
import Footer from '../../../components/home/Footer/Footer'
import FooterBottom from '../../../components/home/Footer/FooterBottom'
import Adults from '../../../components/MealPlans/DietPlanForAge/Adults'
import Navigation from '../../../components/home/Header/Navigation'

export default function AdultsDiet() {
    return (
        <div>
            <Header />
            <HeaderBottom />
            <Adults />
            <Footer />
            <FooterBottom />
            <div className="block lg:hidden overflow-hidden mt-24">
      <Navigation />
      </div>
        </div>
    )
}
