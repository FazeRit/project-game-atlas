import { memo, useMemo } from "react";
import { Carousel } from 'react-responsive-carousel';
import { IScreenshotCarouselProps } from '../../model/interfaces/screenshot-carousel.interface';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { transformCoverUrl } from "@/shared/utils/transform-cover-url.util";

export const ScreenshotsCarousel = memo((props: IScreenshotCarouselProps) => {
    const {
        cover,
        screenshots,
    } = props;

    const slides = useMemo(() => {
        let slideItems = [];

        if (cover?.url) {
            slideItems.push({
                url: transformCoverUrl(cover.url),
                checksum: 'cover-0',
            });
        }

        if (screenshots && screenshots.length > 0) {
            const optimizedScreenshots = screenshots.map((screenshot) => ({
                ...screenshot,
                url: transformCoverUrl(screenshot.url),
            }));
            
            slideItems = [
                ...slideItems,
                ...optimizedScreenshots
            ]; 
        }

        return slideItems;
    }, [cover?.url, screenshots]);

    if (!slides || slides.length === 0) {
        return <div className="p-4 text-white">Зображення відсутні.</div>;
    }

    return (
        <div className="w-full"> 
            <Carousel
                showArrows={true}
                showIndicators={false}
                showStatus={false}
                infiniteLoop={true}
                thumbWidth={120}
                dynamicHeight={false}
                className="carousel-container"
            >
                {slides.map((item, index) => (
                    <AspectRatio ratio={16 / 9} key={item.checksum || index}> 
                        <img
                            src={item.url}
                            alt={`Скріншот ${index}`}
                            className={`rounded-lg w-full h-full object-cover`}
                        />
                    </AspectRatio>
                ))}
            </Carousel>
        </div>
    );
});