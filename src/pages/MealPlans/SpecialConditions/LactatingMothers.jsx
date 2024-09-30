import React from 'react'
import Header from '../../../components/home/Header/Header'
import HeaderBottom from '../../../components/home/Header/HeaderBottom'
import Footer from '../../../components/home/Footer/Footer'
import FooterBottom from '../../../components/home/Footer/FooterBottom'
import LactatingMother from '../../../components/MealPlans/SpecialCOnditions/LactatingMother'
import Navigation from '../../../components/home/Header/Navigation'

export default function LactatingMothersDiet() {
  return (
    <div>
        <Header />
      <HeaderBottom />
     <LactatingMother />
     <Footer />
     <FooterBottom />
     <div className="block lg:hidden overflow-hidden mt-24">
      <Navigation />
      </div>
    </div>
  )
}
