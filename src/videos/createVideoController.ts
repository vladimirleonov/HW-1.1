import { Request, Response } from "express"
import { db } from "../db/db"
import { OutputErrorsType } from '../input-output-types/output-errors-type'
import { CreateInputVideoType, OutputVideoType } from "../input-output-types/video-types"
import { VideoDBType } from "../db/video-db-type"
import { Resolutions } from "../input-output-types/video-types"

const inputValidation = (video: CreateInputVideoType) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    }
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
    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.find(p => !Resolutions[p])) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolutions'
        })
    }
    return errors
}

export const createVideoController = (req: Request<any, any, CreateInputVideoType>, res: Response<OutputVideoType | OutputErrorsType>) => {
    const errors: OutputErrorsType = inputValidation(req.body)
    if (errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }

    const now = new Date();
    const tomorrow  = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const newVideo: VideoDBType = {
        ...req.body,
        id: Date.now() + Math.random(),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: now.toISOString(),
        publicationDate: tomorrow.toISOString(),
    }
    db.videos = [...db.videos, newVideo]

    res
        .status(201)
        .json(newVideo)
}