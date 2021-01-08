import React, { ButtonHTMLAttributes, FC, useState } from 'react'

import cn from 'classnames'

// -----------------

import type { ProductNode } from '@framework/api/operations/get-all-products'
import useRemoveItem from '@framework/wishlist/use-remove-item'
import useWishlist from '@framework/wishlist/use-wishlist'
import useAddItem from '@framework/wishlist/use-add-item'
import useCustomer from '@framework/use-customer'

import { Heart } from '@components/icons'
import { useUI } from '@components/ui/context'

// -----------------

type Props = {
  productId: number
  variant: NonNullable<ProductNode['variants']['edges']>[0]
} & ButtonHTMLAttributes<HTMLButtonElement>

// -----------------

const WishlistButton: FC<Props> = ({
  productId,
  variant,
  className,
  ...props
}) => {
  // state -----------

  const [loading, setLoading] = useState(false)

  // Ui thing -----------

  const { openModal, setModalView } = useUI()

  // framework -----------

  const addItem = useAddItem()
  const removeItem = useRemoveItem()
  const { data } = useWishlist()
  const { data: customer } = useCustomer()

  // Util -----------

  const itemInWishlist = data?.items?.find(
    (item) =>
      item.product_id === productId &&
      item.variant_id === variant?.node.entityId
  )

  // functionanlities -----------

  const handleWishlistChange = async (e: any) => {
    e.preventDefault()

    if (loading) return

    // A login is required before adding an item to the wishlist
    if (!customer) {
      setModalView('LOGIN_VIEW')
      return openModal()
    }

    setLoading(true)

    try {
      itemInWishlist
        ? await removeItem({ id: itemInWishlist.id! })
        : await addItem({
            productId,
            variantId: variant?.node.entityId!,
          })

      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <button
      aria-label="Add to wishlist"
      className={cn({ 'opacity-50': loading }, className)}
      onClick={handleWishlistChange}
      {...props}
    >
      <Heart fill={itemInWishlist ? 'var(--pink)' : 'none'} />
    </button>
  )
}

export default WishlistButton
