import {Request, Response} from "express";
import {db} from "../db/db";
import {VideoDBType} from "../db/video-db-type";

export const deleteVideoController = (req: Request, res: Response) => {
    const videoId = Number(req.params.id);

    console.log(videoId)
    console.log(db.videos)
    const video: VideoDBType | undefined = db.videos.find((video: VideoDBType) => video.id === videoId);
    if(!video) {
        console.log("adsde423432")
        res.status(404).send()
        return
    }

    db.videos = db.videos.filter((video: VideoDBType) => video.id !== videoId);
    res.status(204).send()
}