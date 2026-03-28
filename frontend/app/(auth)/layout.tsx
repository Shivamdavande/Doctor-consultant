import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='min-h-screen flex'>
        <div className='w-full lg:w-1/2 flex items-center justify-center p-6 bg-white'>
            {children}
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default layout