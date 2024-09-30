import React from 'react'
import Header from '../../../components/home/Header/Header'
import HeaderBottom from '../../../components/home/Header/HeaderBottom'
import Footer from '../../../components/home/Footer/Footer'
import FooterBottom from '../../../components/home/Footer/FooterBottom'
import Geriatric from "../../../components/MealPlans/DietPlanForAge/Geriatric" 
import Navigation from '../../../components/home/Header/Navigation'

export default function GeriatricDiet() {
  return (
    <div>
          <Header />
            <HeaderBottom />
            <Geriatric />
            <Footer />
            <FooterBottom />
            <div className="block lg:hidden overflow-hidden mt-24">
      <Navigation />
      </div>
    </div>
  )
}
