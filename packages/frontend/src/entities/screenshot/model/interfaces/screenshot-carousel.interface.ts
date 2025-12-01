import { ICoverResponse } from "@/entities/cover";
import { IScreenshotResponse } from "./screenshot.interface";

export interface IScreenshotCarouselProps {
    cover?: ICoverResponse;
    screenshots: Array<IScreenshotResponse>
}