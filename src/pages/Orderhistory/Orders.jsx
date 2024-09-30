import React from 'react'
import Header from '../../components/home/Header/Header'
import HeaderBottom from '../../components/home/Header/HeaderBottom'
import Footer from '../../components/home/Footer/Footer'
import FooterBottom from '../../components/home/Footer/FooterBottom'
import OrderDetails from '../../components/OrderHistory/Orders'
import Navigation from '../../components/home/Header/Navigation'

export default function Orders() {
  return (
    <div>
        <Header />
        <HeaderBottom />
        <OrderDetails />
        <Footer />
        <FooterBottom />
        <div className="block lg:hidden overflow-hidden mt-24">
      <Navigation />
      </div>
    </div>
  )
}
