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
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/95 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center px-3 gap-4">
                <div className='flex items-center space-x-8'>
                    <Link href="/" className="flex items-center gap-2">

                        {/* ICON WRAPPER (div OUTSIDE svg) */}
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                            <Stethoscope size={20} color="white" />
                        </div>

                        {/* TEXT */}
                        <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            PremGanga HealthCare+
                        </span>

                    </Link>

                    {/* dashboard navigation */}
                    {isAuthenticated && showDashboardNav && (
                        <nav className="hidden md:flex items-center space-x-6">
                            {getDashboardNavigation().map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-1 transition-colors ${item.active
                                        ? "text-blue-600 font-semibold"
                                        : "text-gray-600 hover:text-blue-600"
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{item.lable}</span>
                                </Link>
                            ))}
                        </nav>
                    )}
                </div>
                {isAuthenticated && showDashboardNav ? (
                    <div className="ml-auto flex items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="relative overflow-visible"
                            aria-label="Notifications"
                        >
                            <Bell className="h-5 w-5" />

                            <span className="absolute -top-1 -right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                                4
                            </span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild >
                                <Button variant="ghost" className='flex items-center space-x-2 px-2'>
                                    <Avatar className='w-8 h-8'>
                                        <AvatarImage src={user?.profileImage} alt={user.name}></AvatarImage>
                                        <AvatarFallback className='bg-blue-100 text-blue-600 text-sm font-semibold'>
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='hidden md:block text-left'>
                                        <p className='text-sm font-medium text-gray-900'>
                                            {user.name}
                                        </p>
                                        <p className='text-xs text-gray-500 capitalize'>
                                            {user.type}
                                        </p>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='w-56'>
                                <DropdownMenuLabel>
                                    <div className='flex items-center space-x-2'>
                                        <Avatar className='w-10 h-10'>
                                            <AvatarImage src={user?.profileImage} alt={user.name}></AvatarImage>
                                            <AvatarFallback className='bg-blue-100 text-blue-600'>
                                                {user?.name?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                            <div className='flex-1 min-w-0 '>
                                                <p className=' font-medium truncate'>
                                                    {user.name}
                                                </p>
                                                <p className='text-sm text-gray-500 truncate max-w-[140px]'>
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </Avatar>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={`/${user.type}/profile`} className='flex items-center'>
                                        <User className='w-4 h-4 mr-2' />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={`/${user.type}/settings`} className='flex items-center'>
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
                                    <Button
                                        variant='ghost'
                                        className='text-blue-900 font-medium hover:text-blue-700'
                                    >
                                        Login
                                    </Button>
                                </Link>

                                <Link href='/signup/patient' className='hidden md:block'>
                                    <Button
                                        className='bg-gradient-to-r from-blue-600 to-blue-700 font-medium hover:from-blue-700 hover:to-blue-800 rounded-full px-6'
                                    >
                                        Book Consultation
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <div className='flex items-center space-x-4'>
                                <span className='hidden md:block text-sm text-gray-700 font-medium whitespace-nowrap'>
                                    Welcome,&nbsp;{user?.name}
                                </span>

                                <Link href={`/${user?.type}/dashboard`}>
                                    <Button
                                        variant='ghost'
                                        className='text-blue-900 font-medium hover:text-blue-700'
                                    >
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



