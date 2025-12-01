import { memo, useMemo } from "react";
import { Carousel } from 'react-responsive-carousel';
import { IScreenshotCarouselProps } from '../../model/interfaces/screenshot-carousel.interface';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

export const ScreenshotsCarousel = memo((props: IScreenshotCarouselProps) => {
    const {
        cover,
        screenshots,
    } = props;

    const slides = useMemo(() => {
        const slideItems = [];

        if (cover?.url) {
            slideItems.push({
                url: cover.url,
                checksum: 'cover-0',
            });
        }

        if (screenshots && screenshots.length > 0) {
            slideItems.push(...screenshots);
        }

        return slideItems;
    }, [cover, screenshots]);


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