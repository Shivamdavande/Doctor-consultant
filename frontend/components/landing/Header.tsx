"use client";
import { Badge, Bell, Calculator, Settings, Stethoscope, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import React from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


interface HeaderProps {
    showDashboardNav?: boolean
}

interface NavigationItem {
    lable: string;
    icon: React.ComponentType<any>;
    href: string;
    active: boolean
}
const Header: React.FC<HeaderProps> = ({ showDashboardNav = false }) => {
    const user = {
        type: 'patient',
        name: 'Akash',
        profileImage: '/placeholder.png',
        email: "akash@gmail.com"
    }

    const isAuthenticated = false;

    const pathname = usePathname();
    const getDashboardNavigation = (): NavigationItem[] => {
        // if (!user || showDashboardNav) return [];

        if (user?.type === 'patient') {
            return [
                {
                    lable: 'Appointments',
                    icon: Calculator,
                    href: '/patient/dashboard',
                    active: pathname?.includes('/patient/dashboard') || false
                }
            ];

        } else if (user?.type === 'doctor') {
            return [
                {
                    lable: 'Dashboard',
                    icon: Calculator,
                    href: '/doctor/dashboard',
                    active: pathname?.includes('/doctor/dashboard') || false
                },
                {
                    lable: 'Appointments',
                    icon: Calculator,
                    href: '/doctor/appointments',
                    active: pathname?.includes('/doctor/dashboard') || false
                }
            ];
        }
        return [];
    }
    return (
        <header className="fixed top-0 left-0 right-0 z-50 
border-b border-white/10 
bg-[#020617]/70 backdrop-blur-xl">

            <div className="container mx-auto flex h-16 items-center px-3 gap-4">

                {/* LEFT */}
                <div className='flex items-center space-x-8'>
                    <Link href="/" className="flex items-center gap-3 group">

                        {/* ICON */}
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl 
                bg-gradient-to-br from-blue-500 to-violet-500
                shadow-lg shadow-blue-500/30
                group-hover:scale-110 group-hover:shadow-blue-500/50 
                transition-all duration-300">
                            <Stethoscope size={20} className="text-white" />
                        </div>

                        {/* TEXT */}
                        <span className="text-2xl font-bold bg-gradient-to-r 
                from-blue-400 via-violet-400 to-cyan-400 
                bg-clip-text text-transparent 
                group-hover:opacity-80 transition">
                            PremGanga HealthCare+
                        </span>

                    </Link>

                    {/* NAV */}
                    {isAuthenticated && showDashboardNav && (
                        <nav className="hidden md:flex items-center space-x-4">
                            {getDashboardNavigation().map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl transition-all duration-300
                            ${item.active
                                            ? "bg-white/10 text-white shadow-md scale-105"
                                            : "text-gray-400 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span className="text-sm">{item.lable}</span>
                                </Link>
                            ))}
                        </nav>
                    )}
                </div>

                {/* RIGHT */}
                {isAuthenticated && showDashboardNav ? (
                    <div className="ml-auto flex items-center space-x-4">

                        {/* NOTIFICATION */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="relative rounded-full hover:bg-white/10 transition"
                        >
                            <Bell className="h-5 w-5 text-gray-300" />

                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center 
                    rounded-full bg-pink-500 text-xs font-semibold text-white animate-pulse">
                                4
                            </span>
                        </Button>

                        {/* PROFILE */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className='flex items-center space-x-2 px-2 bg-transparent hover:bg-white/10 rounded-full transition'>

                                    <Avatar className='w-9 h-9 ring-2 ring-blue-500/40'>
                                        <AvatarImage src={user?.profileImage} />
                                        <AvatarFallback className='bg-gradient-to-br from-blue-500 to-violet-500 text-white font-semibold'>
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className='hidden md:block text-left'>
                                        <p className='text-sm font-medium text-white'>
                                            {user.name}
                                        </p>
                                        <p className='text-xs text-gray-400 capitalize'>
                                            {user.type}
                                        </p>
                                    </div>

                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align='end'
                                className='w-56 bg-[#020617]/90 backdrop-blur-xl border border-white/10 text-white shadow-xl'
                            >
                                <DropdownMenuLabel>
                                    <div className='flex items-center space-x-3'>
                                        <Avatar className='w-10 h-10'>
                                            <AvatarImage src={user?.profileImage} />
                                            <AvatarFallback className='bg-gradient-to-br from-blue-500 to-violet-500 text-white'>
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <p className='font-medium'>{user.name}</p>
                                            <p className='text-xs text-gray-400 truncate max-w-[140px]'>
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator className="bg-white/10" />

                                <DropdownMenuItem asChild>
                                    <Link href={`/${user.type}/profile`} className='flex items-center hover:text-blue-400'>
                                        <User className='w-4 h-4 mr-2' />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                    <Link href={`/${user.type}/settings`} className='flex items-center hover:text-blue-400'>
                                        <Settings className='w-4 h-4 mr-2' />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div className='flex items-center space-x-3 ml-auto'>
                        {!isAuthenticated ? (
                            <>
                                <Link href='/login/patient'>
                                    <Button className='text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition'>
                                        Login
                                    </Button>
                                </Link>

                                <Link href='/signup/patient' className='hidden md:block'>
                                    <Button
                                        className='bg-gradient-to-r from-blue-500 to-violet-500 
                                hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30
                                transition-all duration-300 
                                rounded-xl px-6 text-white font-medium'
                                    >
                                        Book Consultation
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <div className='flex items-center space-x-4'>
                                <span className='hidden md:block text-sm text-gray-300 font-medium'>
                                    Welcome,&nbsp;{user?.name}
                                </span>

                                <Link href={`/${user?.type}/dashboard`}>
                                    <Button className='text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition'>
                                        Dashboard
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;



