import { create } from 'zustand'

export const useUserStore = create(()=>({       // khởi tạo store trong zustand 
    token :null ,
    current :null ,
}))