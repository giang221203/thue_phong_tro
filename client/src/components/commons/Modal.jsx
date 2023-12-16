import React from 'react'
import {  useAppStore } from '~/store/useAppStore'

const Modal = () => {
  const {contentModal,setModal} =useAppStore()     // lấy dữ liệu trong store của zuntand
  return (
    <div onClick={()=>setModal(false,null)} className='absolute z-[999] flex items-center justify-center w-screen h-screen bg-overlay-50'>
      {contentModal}
    </div>
  )
}

export default Modal