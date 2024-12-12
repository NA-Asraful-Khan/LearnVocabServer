import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { handleResponse } from '../../utils/responseHandler';
import { BaseController } from '../base/base.controller';
import { ILesson } from './lesson.model';
import { lessonService } from './lesson.service';
import AppError from '../../errors/AppError';

export class LessonController extends BaseController<ILesson> {
  constructor() {
    super(lessonService);
  }

  create = catchAsync(async (req, res): Promise<void> => {
    const item = await this.service.create(req.body);
    handleResponse.sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Item created successfully',
      data: item,
    });
  });

  findByLessonNumber = catchAsync(async (req, res) => {
    const item = await lessonService.findByLessonNumber(Number(req.params.id));

    if (item) {
      handleResponse.sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Item retrieved successfully',
        data: item,
      });
    } else {
      throw new AppError(httpStatus.NOT_FOUND, 'Item not found');
    }
  });

  deleteLesson = catchAsync(async (req, res): Promise<void> => {
    const item = await lessonService.deleteLesson(req.params.id);
    if (item) {
      handleResponse.sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Item deleted successfully',
        data: item,
      });
    } else {
      throw new AppError(httpStatus.NOT_FOUND, 'Item not found');
    }
  });
}

export const lessonController = new LessonController();
