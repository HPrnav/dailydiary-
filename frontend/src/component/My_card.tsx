import React from 'react'

interface MyCardType {
   num:  number|0
}

export const MyCard: React.FC<MyCardType> = ({ num }) => {
  return (
    <div className='w-4/5 py-6'>

    <div className="w-full font-mono bg-gradient-to-r from-green-400 via-purple-500 to-blue-500 p-4 rounded-lg shadow-lg flex items-center justify-center text-black animate-float">
      <p className="text-center text-xl font-semibold">
        Welcome , your total published experiences are ={num} 

      </p>
    </div>
    </div>
  )
}

    
