import EmailVerifiedCard from "@/components/cards/EmailVerifiedCard";
import { Suspense } from "react";
export default async function EmailVerifiedPage() {

	return (
        <div className="
        flex items-center justify-center h-screen
    bg-[radial-gradient(50%_50%_at_50%_50%,#02A95D_0%,#FFFFFF_100%)]
    dark:bg-[radial-gradient(50%_50%_at_50%_50%,#02A95D_0%,#000000_100%)]
        ">
            <Suspense fallback={<p>loading....</p>}>
                <EmailVerifiedCard></EmailVerifiedCard>
            </Suspense>
        </div>
	);
}