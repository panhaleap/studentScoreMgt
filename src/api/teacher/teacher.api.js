import { failed, succeed } from '../../common/response';
import { Teacher } from '../../models/teacher';

const condiSearchByName = filterByName => {
  let wordSplit = { ...filterByName }.name.split(' ', 2);

  wordSplit.forEach((word, index, theArray) => {
    theArray[index] = new RegExp(`${word.trim()}`, 'i');
  });

  const twoWordCondition = {
    $or: [
      { $and: [{ firstName: wordSplit[0] }, { lastName: wordSplit[1] }] },
      { $and: [{ firstName: wordSplit[1] }, { lastName: wordSplit[0] }] }
    ]
  };

  const oneWordCondition = { $or: [{ firstName: wordSplit[0] }, { lastName: wordSplit[0] }] };
  return wordSplit.length < 2 ? oneWordCondition : twoWordCondition;
};

const getLimit = limit => {
  limit = +limit;
  return limit > 100 ? 100 : limit;
};

const getSkip = (page, limit) => {
  page = +page;
  const skip = limit * (page - 1);
  return skip;
};

export const createTeacher = async (req, res) => {
  try {
    const { firstName, lastName, gender } = req.body;
    const teacher = new Teacher({ firstName, lastName, gender });
    const result = await teacher.save();
    if (result) succeed(res, result, 200);
    else failed(res, "Couldn't create teacher", 500);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const getTeacherList = async (req, res) => {
  try {
    let { limit = 10, page = 1, isActive, gender, name } = req.query;
    limit = getLimit(limit);
    const skip = getSkip(page, limit);

    const filterByActive = isActive ? { isActive } : { isActive: true };
    const filterByGender = gender ? { gender: { $in: gender } } : { gender: { $in: ['male', 'female'] } };
    const filterByName = name ? { name } : {};
    const conditionByName = name ? condiSearchByName(filterByName) : {};

    const condition = { ...filterByActive, ...filterByGender };

    const [teachers, total] = await Promise.all([
      Teacher.find(conditionByName)
        .find(condition)
        .skip(skip)
        .limit(limit),
      Teacher.count(conditionByName).count(condition)
    ]);

    if (teachers) succeed(res, { message: 'Success', Data: teachers, options: { limit, skip, total } }, 200);
    else failed(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findOne({ _id: id, isActive: true });
    if (teacher) succeed(res, { message: 'Success', Data: teacher }, 200);
    else failed(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const updateTeacherById = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const teacher = await Teacher.findOneAndUpdate({ _id: id, isActive: true }, { $set: data });
    if (teacher) succeed(res, { message: 'Updated Sucess', Data: teacher }, 200);
    else failed(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const deleteTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findOneAndUpdate({ _id: id, isActive: true }, { $set: { isActive: false } });
    if (teacher) succeed(res, { message: 'Deleted Sucess' }, 200);
    else failed(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};
