import ControllerIcon from '@/assets/icons/controller.svg?react'
import { IAuthLayoutProps } from "./interfaces"
import { CenteredLayout } from '../centered-layout';

export const AuthLayout = (props: IAuthLayoutProps) => {
    const {
        children
    } = props;

    return (
        <CenteredLayout
            className="flex flex-col justify-start items-center gap-8"
        >
            <div className="flex flex-col items-center gap-4 pt-11 w-full">   
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
            <div className="flex justify-center w-full">
                {children}
            </div>
        </CenteredLayout>
    )
}