import s from './HomeAllProductsGrid.module.css'

import { FC } from 'react'
import Link from 'next/link'

// -----------------

import { getCategoryPath, getDesignerPath } from '@lib/search'

import { ProductCard } from '@components/product'
import { Grid } from '@components/ui'

// -----------------

interface Props {
  categories?: any
  brands?: any
  newestProducts?: any
}

// -----------------

const Head: FC<Props> = ({ categories, brands, newestProducts }) => (
  <div className={s.root}>
    <div className={s.asideWrapper}>
      <div className={s.aside}>
        <ul className="mb-10">
          <li className="py-1 text-base font-bold tracking-wide">
            <Link href={getCategoryPath('')}>
              <a>All Categories</a>
            </Link>
          </li>
          {categories.map((cat: any) => (
            <li key={cat.path} className="py-1 text-accents-8 text-base">
              <Link href={getCategoryPath(cat.path)}>
                <a>{cat.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="">
          <li className="py-1 text-base font-bold tracking-wide">
            <Link href={getDesignerPath('')}>
              <a>All Designers</a>
            </Link>
          </li>
          {brands.flatMap(({ node }: any) => (
            <li key={node.path} className="py-1 text-accents-8 text-base">
              <Link href={getDesignerPath(node.path)}>
                <a>{node.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="flex-1">
      <Grid layout="normal">
        {newestProducts.map(({ node }: any) => (
          <ProductCard
            key={node.path}
            product={node}
            variant="simple"
            imgWidth={480}
            imgHeight={480}
          />
        ))}
      </Grid>
    </div>
  </div>
)

export default Head
