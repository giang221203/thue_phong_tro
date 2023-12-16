import { create } from 'zustand'

export const useAppStore = create((set)=>({      // khởi tạo store trong zustand 
    isShowModal :false ,
    contentModal :null ,
    setModal :(isShowModal,contentModal)=>set(()=>({isShowModal,contentModal}))       // viết hàm nhận vào 2 đối số và set lại gía trị của 2 đối sô đó

 
}))