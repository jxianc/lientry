import React from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'

interface OAuthButtonsGroupProps {}

export const OAuthButtonsGroup: React.FC<OAuthButtonsGroupProps> = ({}) => {
  return (
    <div className="flex flex-row space-x-2">
      <button
        type="button"
        className="inline-flex items-center justify-center space-x-2 w-full py-2 px-4 bg-[#4285F4] hover:bg-[#3772d0] text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#84b3ff]"
      >
        <FaGoogle />
        <span>Google</span>
      </button>
      <button
        type="button"
        className="inline-flex items-center justify-center space-x-2 w-full py-2 px-4 bg-[#333] hover:bg-[#272727] text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f5f5f]"
      >
        <FaGithub />
        <span>GitHub</span>
      </button>
    </div>
  )
}
