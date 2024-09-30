import React from 'react'
import ExpectantMothers from "../../../components/MealPlans/SpecialCOnditions/ExpectantMothers"
import Header from '../../../components/home/Header/Header'
import HeaderBottom from '../../../components/home/Header/HeaderBottom'
import Footer from '../../../components/home/Footer/Footer'
import FooterBottom from '../../../components/home/Footer/FooterBottom'
import Navigation from '../../../components/home/Header/Navigation'

export default function ExpectantMothersDiet() {
  return (
    <div>
      <Header />
      <HeaderBottom />
     <ExpectantMothers />
     <Footer />
     <FooterBottom />
     <div className="block lg:hidden overflow-hidden mt-24">
      <Navigation />
      </div>
    </div>
  )
}
