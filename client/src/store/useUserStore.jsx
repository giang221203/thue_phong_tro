import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// export const useUserStore = create(() => ({
//   // khởi tạo store trong zustand
//   token: null,
//   current: null,
// }));

export const useUserStore = create(
  persist(
    (set, get) => ({
      // thêm persist để lưu vào storage
      token: null,
      current: null,
      hiih: "gdg",
    }),
    {
      name: "rest06",
      storage: createJSONStorage(() => localStorage), //   nơi lưu vào storage
      partialize: (
        state //   chọn các trường cần lưu vào storage
      ) =>
        Object.fromEntries(                //   chuyển object các trường thành mãng có phần tử 0 là key và phần tử 1 là value  ["key" ,"value"] ,
          Object.entries(state).filter(    //   lọc ra các phần tử 0 bằng token và current, chuyển lại thành object         
            (el) => el[0] === "token" || el[0] === "current"
          )
        ),
    }
  )
);
