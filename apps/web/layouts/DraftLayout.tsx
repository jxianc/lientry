import React from 'react'
import { FiSave, FiXCircle } from 'react-icons/fi'

interface DraftLayoutProps {
  children?: React.ReactNode
}

export const DraftLayout: React.FC<DraftLayoutProps> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-li-gray-1500">
      <div className="max-w-4xl mx-auto w-full min-h-screen">
        <div className="flex flex-col justify-center">
          <main className="p-4 pb-8 mt-10 border-2 border-li-gray-200 dark:border-li-gray-1300 rounded-md">
            <div className="px-2 font-bold text-xl">Draft</div>
            {children}
            <div className="flex space-x-4 mt-24 justify-end">
              <button className="bg-li-gray-100 dark:bg-li-gray-1400 hover:bg-li-gray-200 dark:hover:bg-li-gray-1300 px-3 py-1 rounded-[0.3rem] text-base font-semibold inline-flex items-center space-x-1">
                <FiXCircle />
                <span>cancel</span>
              </button>
              <button className="bg-li-gray-100 dark:bg-li-gray-1400 hover:bg-li-gray-200 dark:hover:bg-li-gray-1300 px-3 py-1 rounded-[0.3rem] text-base font-semibold inline-flex items-center space-x-1">
                <FiSave />
                <span>save</span>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
