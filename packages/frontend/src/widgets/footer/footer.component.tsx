import ControllerIcon from '@/assets/icons/controller.svg?react'

export const Footer = () => {
    return (
        <div className="flex flex-row justify-between gap-6 px-4 md:px-20 py-5 border-b border-b-[#404040] w-full h-fit">
            <div
                className="flex flex-row items-center gap-2 cursor-pointer"
                role="button"
                tabIndex={0}
            >
                <ControllerIcon
                    width={25}
                    height={20}
                />
                <p className="text-white text-xl">
                    Game Atlas
                </p>
            </div>
            <p className='text-[#737373] text-sm'>
                © 2025 Game Atlas. All rights reserved.
            </p>
        </div>
    )
}