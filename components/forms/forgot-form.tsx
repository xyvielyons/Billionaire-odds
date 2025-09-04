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

import { ForgotPasswordSchema } from "@/zod/authschema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/auth-client";
import { useState } from "react";
import { toast } from "sonner"
import Image from "next/image";
import { logo } from "@/public/images";
export default function ForgotPassword() {
	const [pending, setPending] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: ""
		},
	});

	const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
	//the on submit functions gives us all the value s we aquired from the form
	//here we are using the email and password method
		await authClient.forgetPassword(
			{
			//we use authClient because we are using a client component to access the auth instance
			//we give it the email password and name from the form inputs
				email: values.email,
				redirectTo:"/reset-password"
			},
			//it emits events that we can listen to
			{
			//when requests to the auth server starts we set pending to true
				onRequest: () => {
					setPending(true);
				},
			//if requst to create a user is successfull we show a toast success
				onSuccess: () => {
                    router.push('/')
                    router.refresh();
					toast.success('Success',{
                        description:"If an account exists with this email, you will receive a password reset link.",
                    })
					
				},
			//if we encountered an error we show an error in the console 
			//and we show a toast describing the error
				onError: (ctx) => {
					console.log("error", ctx);
                    toast.error('Something went wrong',{
                        description:ctx.error.message ?? "Something went wrong.",
                    })
				
				},
			}
		);
	//we then set is pending to false
		setPending(false);

	};

	return (
		<div className="flex items-center justify-center p-4 w-[800px] mt-[80px] md:mt-[0px]">
			<Card className="w-full max-w-md rounded-sm opacity-95">
				<CardHeader>
					<CardTitle className="">
						<div className="mb-2 cursor-pointer" onClick={()=>router.push('/')}>
							<Image src={logo} alt="billionare logo" width={180} height={180} className="dark:invert"></Image>
						</div>
						<h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Forgot Password 😩</h1>
						<p className="text-gray-600 text-sm font-normal dark:text-gray-300">To recover your account please enter your registered email address.</p>

					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						
						<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
							<FormLabel className='font-bold text-[13px] text-slate-600 dark:text-slate-200'>Email</FormLabel>
							<FormControl>
								<Input placeholder="johndoe@example.com" {...field} />
							</FormControl>
							<FormMessage />
							</FormItem>
						)}
						/>
						
							{/* <LoadingButton pending={pending}>Sign up</LoadingButton> */}
							<Button isLoading={pending} className="bg-primarymain text-white w-full" type="submit" radius="none">Recover Account</Button>
						</form>
					</Form>
					<div className="mt-4 text-center text-sm">
						<p className="text-gray-600 hover:underline cursor-pointer hover:text-green-950 active:text-green-950 dark:text-green-300" onClick={() => router.push('/sign-in')}>
							have an account? Sign in
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}