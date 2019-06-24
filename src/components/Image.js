import React from 'react'

const sizes = {
  'large': 150,
  'medium': 100,
  'small': 50,
  'x-small': 30,
}

const Image = ({ src, alt, size = sizes.medium }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={sizes[size]}
      height={sizes[size]}
    />
  )
}

export default Image
