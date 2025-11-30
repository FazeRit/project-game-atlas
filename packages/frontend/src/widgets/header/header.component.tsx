import ControllerIcon from '@/assets/icons/controller.svg?react'
import { memo, useCallback, useEffect, startTransition, useMemo } from 'react'
import { headerConfig } from './config'
import { useLocation, useNavigate } from 'react-router-dom'
import { useHeader } from './providers'
import clsx from 'clsx';
import { ROUTES } from '@/shared'
import { MobileHeader } from './ui'
import { useUserStore } from '@/entities'

export const Header = memo(() => {
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthenticated = useUserStore(state => state.isAuthenticated)

    const {
        activeIndex,
        setActiveIndex
    } = useHeader();

    const filteredItems = useMemo(() => {
        return headerConfig.filter((item) => {
            if (isAuthenticated && item.onlyGuest) return false;
            if (!isAuthenticated && item.onlyAuth) return false;
            
            return true;
        });
    }, [isAuthenticated]);

    useEffect(() => {
        const currentPath = location.pathname;

        const matchingItem = headerConfig.find(
            item => currentPath === item.path
        );

        if (matchingItem) {
            startTransition(() => {
                setActiveIndex(matchingItem.index);
            });
        } else {
            setActiveIndex(-1)
        }
    }, [location.pathname, setActiveIndex])

    const navigateToHome = useCallback(() => {
        startTransition(() => {
            setActiveIndex(0);
            navigate(ROUTES.CATALOG);
        });
    }, [navigate, setActiveIndex])

    const handleNavigation = useCallback((
        path: string,
        index: number
    ) => {
        startTransition(() => {
            setActiveIndex(index);
            navigate(path);
        });
    }, [navigate, setActiveIndex]);

    return (
        <div className="flex flex-row justify-between md:justify-start items-center gap-6 px-4 md:px-20 py-5 border-b border-b-[#404040] w-full h-fit">
            <div
                className="flex flex-row items-center gap-2 cursor-pointer"
                onClick={navigateToHome}
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

            <div className='hidden md:flex md:flex-row gap-6'>
                {filteredItems.map((item) => {
                    const isActive = activeIndex === item.index;

                    return (
                        <button
                            key={item.label}
                            data-active={isActive}
                            data-settings-button={item.index}
                            onClick={() => handleNavigation(
                                item.path,
                                item.index
                            )}
                            className={clsx(
                                'text-[16px] text-white transition-all duration-200',
                                {
                                    'border-white border-b-1': isActive,
                                    'border-transparent border-b-1': !isActive,
                                }
                            )}
                        >
                            {item.label}
                        </button>
                    )
                })}
            </div>

            <div className="md:hidden flex items-center">
                <MobileHeader />
            </div>
        </div>
    )
})