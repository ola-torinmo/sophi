import React from "react"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
// import Testimonial from "@modules/home/components/testimonial"

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className="relative">{children}</main>
      {/* <Testimonial/> */}
      <Footer />
    </div>
  )
}

export default Layout
