import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { handleResponse } from '../../utils/responseHandler';
import { BaseController } from '../base/base.controller';
import { ILesson } from './lesson.model';
import { lessonService } from './lesson.service';

export class LessonController extends BaseController<ILesson> {
  constructor() {
    super(lessonService);
  }

  create = catchAsync(async (req, res): Promise<void> => {
    console.log(req.body);
    const item = await this.service.create(req.body);
    handleResponse.sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Item created successfully',
      data: item,
    });
  });
}

export const lessonController = new LessonController();
