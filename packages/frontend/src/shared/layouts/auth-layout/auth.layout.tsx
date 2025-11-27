import ControllerIcon from '@/assets/icons/controller.svg?react'
import { IAuthLayoutProps } from "./interfaces"
import { CenteredLayout } from '../centered-layout';
import { memo } from 'react';

export const AuthLayout = memo((props: IAuthLayoutProps) => {
    const {
        children
    } = props;

    return (
        <CenteredLayout
            className="flex flex-col justify-start items-center gap-8"
        >
            <div className="hidden md:flex flex-col items-center gap-4 pt-11 w-full">   
                <div className="flex justify-center items-center bg-[#404040] rounded-lg w-12 h-12">
                    <ControllerIcon 
                        width={25}
                        height={20}
                    />
                </div>
                <p className="font-medium text-white text-2xl">
                    Game Atlas
                </p>
            </div>
            <div className="flex justify-center pt-11 md:pt-0 w-full">
                {children}
            </div>
        </CenteredLayout>
    )
})