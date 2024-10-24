'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Button
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { useRouter, usePathname } from 'next/navigation';


export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const router = useRouter();
    const pathname = usePathname();
    let isAuthPage = false;
    const handleLoginClick = () => {
        router.push('/login');
    };

    const handleSignUpClick = () => {
        router.push('/register');
    };
    if (pathname == '/') {
        isAuthPage = true;
    } else {
        isAuthPage = false;
    }

    return (
        <header className="bg-white border-b border-gray-200">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="">Freelance Connect</span>
                        {/* <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            /> */}
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                {isAuthPage && ( // Hide buttons if on /login page

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Button
                            className="rounded py-2 px-4 text-sm text-color-cool-black"
                            onClick={handleLoginClick}
                        >
                            Log in
                        </Button>
                        <Button
                            className="py-2 px-4 text-sm text-white font-semibold bg-green-primary text-white rounded-[12px] hover:bg-green-secondary transition-colors transition-transform duration-200 active:scale-95"
                            onClick={handleSignUpClick}
                        >
                            Sign up
                        </Button>
                    </div>
                )}
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
