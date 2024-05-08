import { Lock } from "lucide-react";
import NextImage from "next/image"; // Rename to NextImage
import { Button } from "../ui/button";
import LogoImage from "../assets/logo.jpg"; // Rename to LogoImage

const ChatPlaceHolder = () => {
	return (
		<div className='w-3/4 bg-gray-secondary flex flex-col items-center justify-center py-10'>
			<div className='flex flex-col items-center w-full justify-center py-10 gap-4'>
			<NextImage src={LogoImage} alt='Hero' width={320} height={188} /> {/* Use NextImage instead of Image */}
				<p className='text-3xl font-extralight mt-5 mb-2'>Welcome to IM - Instant Messenger</p>
				<p className='w-1/2 text-center text-gray-primary text-sm text-muted-foreground'>
					Make calls, share your screen and get a good experience.
				</p>

				<a href="https://qasimamin15.netlify.app" target="_blank">
				<Button className='rounded-full my-5 developers_name' >
					 Developed by Muhammad Qasim & Ahmad Iqbal
				</Button>
				</a>
			</div>
			<p className='w-1/2 mt-auto text-center text-gray-primary text-xs text-muted-foreground flex items-center justify-center gap-1'>
				<Lock size={10} /> Your personal messages are end-to-end encrypted
			</p>
		</div>
	);
};
export default ChatPlaceHolder;