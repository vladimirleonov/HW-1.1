import {Request, Response} from "express";
import {OutputVideoType} from "../input-output-types/video-types";
import {VideoDBType} from "../db/video-db-type";
import {db} from "../db/db";

export const findVideoController = (req: Request, res: Response<OutputVideoType>) => {
    const videoId = Number(req.params.id);

    const video: VideoDBType | undefined = db.videos.find((video: VideoDBType) => video.id === videoId);
    if(!video) {
        res.status(404).json()
        return
    }

    res.status(200).json(video)
}