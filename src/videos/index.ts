import {Router} from 'express'
import {getVideosController} from './getVideosController'
import {createVideoController} from './createVideoController'
import {findVideoController} from './findVideoController'
import {updateVideoController} from './updateVideoController'
import {deleteVideoController} from './deleteVideoController'

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.get('/:id', findVideoController)
videosRouter.post('/', createVideoController)
videosRouter.put('/:id', updateVideoController)
videosRouter.delete('/:id', deleteVideoController)