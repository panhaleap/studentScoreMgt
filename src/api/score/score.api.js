import { failed, succeed } from '../../common/response';
import { Score } from '../../models/score';

const getLimit = limit => {
  limit = +limit;
  return limit > 100 ? 100 : limit;
};

const getSkip = (page, limit) => {
  page = +page;
  const skip = limit * (page - 1);
  return skip;
};

// This one is correct
// export const createScore = async (req, res) => {
//   try {
//     const { student, subject, score } = req.body;
//     const scoreModel = new Score({ student, subject, score });
//     const result = await scoreModel.save();
//     if (result) succeed(res, { message: 'Created Success', Data: result }, 200);
//     else failed(res, "Couldn't create subject", 500);
//   } catch (error) {
//     console.log(error);
//     failed(res, error, 400);
//   }
// };

export const createScore = async (req, res) => {
  try {
    let { score } = req.query;
   // console.log(score.student);
   //const score = {student: '5b39d24bdebf1727dce75d97'};
   console.log(req.query);
    //score = new RegExp(`${score.trim()}`);
    return res.status(200).json(req.query);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const getScoretList = async (req, res) => {
  try {
    let { limit = 10, page = 1, isActive } = req.query;
    limit = getLimit(limit);
    const skip = getSkip(page, limit);

    const filterByActive = isActive ? { isActive } : { isActive: true };
    const condition = { ...filterByActive };

    const [scoreModels, total] = await Promise.all([
      Score.find(condition)
        .populate({ path: 'student', select: '-_id firstName lastName' })
        .populate({path: 'subject', select: '-_id name'})
        .skip(skip)
        .limit(limit),
      Score.count(condition)
    ]);

    if (scoreModels) succeed(res, { message: 'Success', Data: scoreModels, options: { limit, skip, total } }, 200);
    else failed(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const getScoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const scoreModel = await Score.findOne({ _id: id, isActive: true }).populate({ path: 'student', select: '-_id firstName lastName' })
    .populate({path: 'subject', select: '-_id name'});
    if (scoreModel) succeed(res, { message: 'Success', Data: scoreModel }, 200);
    else failed(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const updateScoreById = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const scoreModel = await Score.findOneAndUpdate({ _id: id, isActive: true }, { $set: data });
    if (scoreModel) succeed(res, { message: 'Updated Sucess', Data: scoreModel }, 200);
    else failed(res, { message: 'Score not found' }, 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const deleteScoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const scoreModel = await Score.findOneAndUpdate({ _id: id, isActive: true }, { $set: { isActive: false } });
    if (scoreModel) succeed(res, { message: 'Deleted Sucess' }, 200);
    else failed(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};
