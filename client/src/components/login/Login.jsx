import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { InputForm, InputRadio } from "..";
import { useForm } from "react-hook-form";
import Button from "../commons/Button";
import { apiRegister, apiSignIn } from "~/apis/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import withRouter from "~/hooks/withRouter";
import { useAppStore } from "~/store/useAppStore";

const Login = ({navigate}) => {
  const [variant, setVariant] = useState("LOGIN"); // khởi tạo state để mặc định là login
  const { setModal } = useAppStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  useEffect(() => {
    // khi chuyển trạng thái từ login sang register thì reset lại input
    reset();
  }, [variant]);
  // console.log(errors);
  const onSubmit = async (data) => {
   
    if(variant === "REGISTER"){
      const response = await apiRegister(data);
      if(response.success){
        Swal.fire({
          icon:'success',
          title:"Congrats!",
          text:response.mes,
          showConfirmButton:true,
          confirmButtonText:"Go sign in"
        }).then(({isConfirmed})=>{
          if(isConfirmed)  setVariant('LOGIN')
         })
      }else toast.error(response.mes)
    }
    if(variant ==="LOGIN"){
      const {name ,role,...payload} = data  // dùng detruturing lọai bỏ name và role để lấy phone với password
      const response = await apiSignIn(payload);
      if(response.success){
        toast.success(response.mes)
        setModal(false,null)
      
      }else toast.error(response.mes)
      
    }
    console.log(data);
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white text-lg rounded-md px-6 py-8 w-[500px] flex flex-col items-center gap-6"
    >
      <h1 className="text-3xl font-semibold font-hedvig tracking-tight">
        Welcome to REST06
      </h1>
      <div className="w-full border-b flex items-start gap-6">
        <span
          onClick={() => setVariant("LOGIN")}
          className={clsx(
            variant === "LOGIN" && "border-b-2  border-main-700",
            "cursor-pointer"
          )}
        >
          Login
        </span>
        <span
          onClick={() => setVariant("REGISTER")}
          className={clsx(
            variant === "REGISTER" && "border-b-2  border-main-700",
            "cursor-pointer"
          )}
        >
          New account
        </span>
        {/* khi click thì set lại giá trị về register và xét điều kiện chuyển đổi style  */}
      </div>
      <form className="flex w-full flex-col gap-4 px-4">
        <InputForm
          register={register}
          label="Phone Number"
          placeholder="Type your phone number"
          inputClassName="rounded-md"
          id="phone"
          validate={{
            required: "This field cannot empty",
           
            pattern: {     // validate cho sdt
              value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Phone number invalid.",
            },
          }}
          error={errors}
        />
        <InputForm
          register={register}
          label="Password"
          placeholder="Type your password"
          inputClassName="rounded-md"
          id="password"
          type="password"
          error={errors} // truyền errors của react-hook-form
          validate={{ required: "This field cannot empty" }}
        />
        {variant === "REGISTER" && (
          <InputForm
            register={register}
            label="Fullname"
            placeholder="Type your name"
            inputClassName="rounded-md"
            id="name"
            error={errors}
            validate={{ required: "This field cannot empty" }}
          />
        )}
        {variant === "REGISTER" && (
          <InputRadio
            register={register}
            label="Type account"
            id="role"
            error={errors}
            validate={{ required: "This field cannot empty" }}
            options={[
              { label: "User", value: "USER" },
              { label: "Agent", value: "AGENT" },
            ]}
          />
        )}

        <Button handleOnclick={handleSubmit(onSubmit)} className="py-2 my-6">
          {variant === "LOGIN" ? "Sign in" : "Register "}
        </Button>
        <span className="cursor-pointer text-main-500 hover:underline w-full text-center">
          Forgot your password?
        </span>
      </form>
    </div>
  );
};

export default withRouter(Login);
