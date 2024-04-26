import { Request, Response } from "express";
import { VideoDBType } from "../db/video-db-type";
import { db } from "../db/db";
import { OutputErrorsType } from "../input-output-types/output-errors-type";
import { Resolutions } from "../input-output-types/video-types";
import { UpdateInputVideoType, OutputVideoType } from "../input-output-types/video-types";

const inputValidation = (video: UpdateInputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    };
    if(typeof video.title !== 'string' || video.title.length > 40) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'title'
        })
    }
    if(typeof video.author !== 'string' || video.author.length > 20) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'author'
        })
    }
    if(!Array.isArray(video.availableResolutions) || video.availableResolutions.find(p => !Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolutions'
        })
    }
    if(typeof video.canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'canBeDownloaded'
        })
    }
    if(typeof video.minAgeRestriction !== 'number' || video.minAgeRestriction > 18 || video.minAgeRestriction < 1) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'minAgeRestriction'
        })
    }
    if(typeof video.publicationDate !== 'string') {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'publicationDate'
        })
    }
    return errors
}

export const updateVideoController = (req: Request<any, any, UpdateInputVideoType>, res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors: OutputErrorsType = inputValidation(req.body)
    if(errors.errorsMessages.length) {
        res.status(400).json(errors)
        return
    }

    const videoId = Number(req.params.id);

    const videoIndex = db.videos.findIndex((video: VideoDBType) => video.id === videoId);
    if(videoIndex === -1) {
        res.status(404).send()
        return
    }

    const existingVideo: VideoDBType = db.videos[videoIndex];

    const updatedVideo: VideoDBType = {
        ...existingVideo,
        ...req.body,
    }

    db.videos[videoIndex] = updatedVideo;

    res.status(204).send()
}

