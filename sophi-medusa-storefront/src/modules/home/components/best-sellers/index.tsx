// src/modules/home/components/bestsellers/index.tsx
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

type BestsellersProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

const Bestsellers = ({ products, region }: BestsellersProps) => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="content-container">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
            SHOP OUR BESTSELLER ITEMS
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Try out our highly-rated hits and find out why buyers keep coming back.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="group">
              <ProductPreview
                product={product}
                region={region}
                isFeatured
              />
            </div>
          ))}
        </div>

        {/* View All Link */}
        {/* <div className="text-center">
          <InteractiveLink href="/collections/bestsellers">
            <Text className="text-base font-medium" style={{ color: '#B07A5D' }}>
              View all bestsellers
            </Text>
          </InteractiveLink>
        </div> */}
      </div>
    </div>
  )
}

export default Bestsellers