import clsx from 'clsx'
import React, { useState } from 'react'

const Login = () => {
  const [variant ,setVariant] = useState('LOGIN')   // khởi tạo state để mặc định là login
  
  return (
    <div onClick={(e)=>e.stopPropagation()} className='bg-white text-lg rounded-md px-6 py-8 w-[500px] flex flex-col items-center gap-6'>
      <h1 className='text-3xl font-semibold font-hedvig tracking-tight'>Welcome to REST06</h1>
      <div className='w-full border-b flex items-start gap-6'>
        <span onClick={()=>setVariant("LOGIN")} className={clsx(variant === 'LOGIN' && 'border-b-2  border-main-700',"cursor-pointer")}>Login</span>
        <span onClick={()=>setVariant("REGISTER")} className={clsx(variant === 'REGISTER' && 'border-b-2  border-main-700',"cursor-pointer")}>New account</span>
         {/* khi click thì set lại giá trị về register và xét điều kiện chuyển đổi style  */}
      </div>
    </div>

  ) 
}

export default Login