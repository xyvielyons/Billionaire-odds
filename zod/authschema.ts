import { z,object,string } from "zod"
 
const getEmailSchema = ()=>(
    z.string()
    .min(1, "Email is required")
    .email("Invalid email")
)
const getNameSchema = () => (
    z.string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters")
)
const getPasswordSchema = (type:"password" | "confirmPassword" | "newPassword" | "currentPassword") => (
    z.string()
    .min(8, `${type} must be at least 8 characters`)
    .max(32, `${type} cannot exceed 32 characters`)
)
export const signUpSchema = z.object({
  name:getNameSchema(),
  email:getEmailSchema(),
  password:getPasswordSchema("password"),
  confirmPassword:getPasswordSchema("confirmPassword")

}).refine((data)=>data.password === data.confirmPassword,{
  message:"passwords dont match",
  //pinpoints where the error should be shown
  path:["confirmPassword"]
})
export const signInSchema = z.object({
  email:getEmailSchema(),
  password:getPasswordSchema("password"),

})