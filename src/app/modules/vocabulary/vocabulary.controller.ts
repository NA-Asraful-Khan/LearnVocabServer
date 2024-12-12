import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { handleResponse } from '../../utils/responseHandler';
import { BaseController } from '../base/base.controller';
import { IVocabulary } from './vocabulary.model';
import { vocabularyService } from './vocabulary.service';
import AppError from '../../errors/AppError';

export class VocabularyController extends BaseController<IVocabulary> {
  constructor() {
    super(vocabularyService);
  }

  createVocabulary = catchAsync(async (req, res) => {
    const requestBody = { ...req.body, adminEmail: req.user.email };
    const vocabulary = await (
      this.service as typeof vocabularyService
    ).createVocabulary(requestBody);

    res.status(201).json({
      status: 'success',
      data: { vocabulary },
    });
  });

  updateVocabulary = catchAsync(async (req, res): Promise<void> => {
    const item = await vocabularyService.updateVocabulary(
      req.params.id,
      req.body,
    );
    if (item) {
      handleResponse.sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Item updated successfully',
        data: item,
      });
    } else {
      throw new AppError(httpStatus.NOT_FOUND, 'Item not found');
    }
  });

  deleteVocabulary = catchAsync(async (req, res) => {
    await (this.service as typeof vocabularyService).deleteVocabulary(
      req.params.id,
    );

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
}

export const vocabularyController = new VocabularyController();
