import React, { createElement } from 'react'
import { IconType } from 'react-icons'

export const iconButtonStyles =
  'p-1.5 rounded-md hover:bg-gray-200 border border-gray-300'

interface IconButtonProps {
  Icon: IconType
}

export const IconButton: React.FC<IconButtonProps> = ({ Icon }) => {
  // TODO figure out to dynamic return this
  return <button></button>
}
