import React from 'react'

interface MyCardType {
   num:  number|0
}

export const MyCard: React.FC<MyCardType> = ({ num }) => {
  return (
    <div className='w-4/5 py-6'>

    <div className="w-full font-mono bg-gradient-to-r from-green-400 via-gray-100 to-green-400 p-4 rounded-lg shadow-lg flex items-center justify-center text-black animate-float">
      <p className="text-center text-xl font-semibold">

         You have published {num}  experiences. 
         keep documenting your experience .

      </p>
    </div>
    </div>
  )
}

    
