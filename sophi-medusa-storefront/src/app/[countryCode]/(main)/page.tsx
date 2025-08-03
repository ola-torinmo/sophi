// src/app/page.tsx
import { Metadata } from "next"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import Bestsellers from "@modules/home/components/best-sellers"
import Testimonial from "@modules/home/components/testimonial"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "Sophi Global - Beauty & Cosmetics",
  description: "Discover our collection of premium beauty products including makeup, skincare, and cosmetics.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)
  
  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  // Fetch products for bestsellers section
  const { response: productsResponse } = await listProducts({
    pageParam: 1,
    queryParams: {
      limit: 8,
    },
    countryCode,
  })

  const products = productsResponse?.products || []

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      
      {/* Bestsellers Section */}
      <Bestsellers products={products} region={region} />

    <Testimonial/>
      
      {/* Existing Featured Products */}
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}