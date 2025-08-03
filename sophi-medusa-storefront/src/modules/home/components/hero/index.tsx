import Image from "next/image"
import Link from "next/link"
import { Button, Heading } from "@medusajs/ui"
import sophi from '../../../../../public/sophihero.png'
import arrow from '../../../../../public/arrow.png'

const Hero = () => {
  return (
    <section className="relative">
  {/* Image + card wrapper */}
  <div className="relative w-full md:h-[710px] h-[350px] overflow-hidden">
    {/* Background Image */}
    <Image
      src={sophi}
      alt="Hero background"
      fill
      className=""
      priority
    />

    {/* Product info card – now absolutely positioned */}
    <div className="absolute bottom-[0%] right-[0%] bg-white md:w-[450px] w-[250px] md:h-[250px] h-[100px] shadow-sm p-8 ">
      <h2 className="md:text-[30px] text-[22px] font-medium text-[#101010] mb-2 tracking-leading">
        BANANA POWDER
      </h2>
      <h3 className="md:text-[30px] text-[22px] font-medium text-[#101010] mb-6 tracking-leading">
        MATTE FINISH
      </h3>
      
      <Link 
        href="/products/banana-powder"
        className="inline-block bg-[#B07A5D] text-white font-medium py-3 px-6 rounded transition-colors duration-200 uppercase tracking-wide"
      >
        DISCOVER <Image src={arrow} alt="Arrow" width={20} height={20} className="inline-block ml-2" />
      </Link>
    </div>
  </div>
</section>

  )
}

export default Hero
