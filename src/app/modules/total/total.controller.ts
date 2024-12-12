import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { handleResponse } from '../../utils/responseHandler';
import { User } from '../user/user.model';
import { Lesson } from '../lesson/lesson.model';
import { Vocabulary } from '../vocabulary/vocabulary.model';

const totalValue = catchAsync(async (req, res) => {
  // const result = await UserServices.getMe(req.user);
  const user = await User.find();
  const lesson = await Lesson.find();
  const vocabulary = await Vocabulary.find();

  const result = {
    user: user?.length,
    lesson: lesson?.length,
    vocabulary: vocabulary?.length,
  };
  handleResponse.sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Me Successfully',
    data: result,
  });
});

export const TotalController = {
  totalValue,
};
