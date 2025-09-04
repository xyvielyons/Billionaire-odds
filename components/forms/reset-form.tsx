"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
//import LoadingButton from "@/components/shared/loading-button";
import {Button} from "@heroui/react"
import Link from "next/link";

import { resetPasswordSchema } from "@/zod/authschema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/auth-client";
import { useState } from "react";
import { toast } from "sonner"
import Image from "next/image";
import { logo } from "@/public/images";
import { useSearchParams } from "next/navigation";
export default function ResetPassword() {
	const [pending, setPending] = useState(false);
	const router = useRouter();
    const searchParams = useSearchParams()
    const token:any = searchParams.get("token");
    const error = searchParams.get("error");

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});
    const {reset} = form;

	const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
	//the on submit functions gives us all the value s we aquired from the form
	//here we are using the email and password method
		await authClient.resetPassword(
			{
			//we use authClient because we are using a client component to access the auth instance
			//we give it the email password and name from the form inputs
				newPassword:values.password,
                token
			},
			//it emits events that we can listen to
			{
			//when requests to the auth server starts we set pending to true
				onRequest: () => {
					setPending(true);
				},
			//if requst to create a user is successfull we show a toast success
				onSuccess: () => {
                    toast.success('Password Reset',{
                        description:"Password reset successful. Login to continue.",
						
                    })
					reset();
				},
			//if we encountered an error we show an error in the console 
			//and we show a toast describing the error
				onError: (ctx) => {
					console.log("error", ctx);
                    toast.error('Something went wrong',{
                        description:ctx.error.message ?? "Something went wrong."
                    })
				
				},
			}
		);
	//we then set is pending to false
		setPending(false);

	};

    if (error === "INVALID_TOKEN") {
        //if error occurs in the search params we show that the token in invalid
          return (
            <div className="grow flex items-center justify-center p-2">
              <Card className="w-full max-w-md opacity-95">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center text-gray-800">
                  <div className="mb-2 cursor-pointer" onClick={()=>router.push('/')}>
							<Image src={logo} alt="billionare logo" width={180} height={180} className="dark:invert"></Image>
						</div>
                    Invalid Reset Link
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button radius="sm" className="w-full" onClick={()=>router.push('/')}>Back to Home</Button>
                    <p className="text-center text-gray-600">
                      This password reset link is invalid or has expired.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        }

	return (
		<div className="flex items-center justify-center p-4 w-[800px] mt-[80px] md:mt-[0px]">
			<Card className="w-full max-w-md rounded-sm opacity-95">
				<CardHeader>
					<CardTitle className="">
						<div className="mb-2 cursor-pointer" onClick={()=>router.push('/')}>
							<Image src={logo} alt="billionare logo" width={180} height={180} className="dark:invert"></Image>
						</div>
						<h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Reset Password 🤓</h1>
						<p className="text-gray-600 text-sm font-normal dark:text-gray-300">Please enter your new password </p>

					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						
						<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
							<FormLabel className='font-bold text-[13px] text-slate-600 dark:text-slate-200'>Password</FormLabel>
							<FormControl>
								<Input placeholder="Atleast 8 characters" {...field} type="password" />
							</FormControl>
							<FormMessage />
							</FormItem>
						)}
						/>
						<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
							<FormLabel className='font-bold text-[13px] text-slate-600 dark:text-slate-200'>Confirm Password</FormLabel>
							<FormControl>
								<Input placeholder="Atleast 8 characters" {...field} type="password" />
							</FormControl>
							<FormMessage />
							</FormItem>
						)}
						/>
                        
							
							{/* <LoadingButton pending={pending}>Sign up</LoadingButton> */}
							<Button isLoading={pending} className="bg-primarymain text-white w-full" type="submit" radius="none">Reset Password</Button>
						</form>
					</Form>
					
				</CardContent>
			</Card>
		</div>
	);
}