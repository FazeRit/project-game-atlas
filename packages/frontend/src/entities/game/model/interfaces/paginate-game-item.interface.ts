import {  IPaginateGameResponse } from "@/entities/game";

export interface IPaginateGameItemProps {
    game: IPaginateGameResponse;
    to: string;
}