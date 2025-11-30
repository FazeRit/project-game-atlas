import { memo, useCallback, useEffect, startTransition, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { headerConfig } from "../../config";
import { useHeader } from "../../providers";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet/sheet.component";
import clsx from "clsx";
import { Button } from "@/shared/components/ui/button/button.component";
import ControllerIcon from '@/assets/icons/controller.svg?react'
import { ROUTES } from "@/shared";
import { useUserStore } from "@/entities";

export const MobileHeader = memo(() => {
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
        }
    }, [location.pathname, setActiveIndex])

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
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    className="hover:bg-gray-800 p-2 text-white"
                >
                    <Menu
                        className="stroke-white w-6 h-6"
                    />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="bg-gray-700 p-0 border border-gray-800 w-[200px] h-fit text-white"
            >
                <div
                    className="flex flex-row justify-center items-center gap-2 py-2 border-b border-b-white cursor-pointer"
                    onClick={() => handleNavigation(ROUTES.CATALOG, 0)}
                    role="button"
                    tabIndex={0}
                >
                    <ControllerIcon
                        width={25}
                        height={20}
                        className="block" 
                    />
                    <p
                        className="m-0 text-white text-lg leading-none" 
                    >
                        Game Atlas
                    </p>
                </div>

                <div className="flex flex-col space-y-1 p-2">
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
                                    'hover:bg-gray-800 p-2 text-white text-sm text-left transition-all duration-200',
                                    {
                                        'border-b-2 border-white': isActive,
                                        'border-b-2 border-transparent': !isActive,
                                    }
                                )}
                            >
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </SheetContent>
        </Sheet>
    )
})
