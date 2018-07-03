import { failed, succeed } from '../../common/response';
import { Subject } from '../../models/subject';

const getLimit = limit => {
  limit = +limit;
  return limit > 100 ? 100 : limit;
};

const getSkip = (page, limit) => {
  page = +page;
  const skip = limit * (page - 1);
  return skip;
};

const getFilterName = queryName => {
  let filterByName;
  if (queryName) {
    const regExpName = new RegExp(`${queryName.trim()}`, 'i');
    filterByName = { name: regExpName };
  } else {
    filterByName = {};
  }
  return filterByName;
};

export const createSubject = async (req, res) => {
  try {
    const { name, teacher } = req.body;
    const subject = new Subject({ name, teacher });
    const result = await subject.save();
    if (result) succeed(res, { message: 'Created Success', Data: result }, 200);
    else failed(res, "Couldn't create subject", 500);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const getSubjectList = async (req, res) => {
  try {
    let { limit = 10, page = 1, isActive, name } = req.query;
    limit = getLimit(limit);
    const skip = getSkip(page, limit);

    const filterByActive = isActive ? { isActive } : { isActive: true };
    const filterByName = getFilterName(name);
    console.log(filterByName);
    const condition = { ...filterByActive, ...filterByName };

    const [subjects, total] = await Promise.all([
      Subject.find(condition)
        .skip(skip)
        .limit(limit),
      Subject.count(condition)
    ]);

    if (subjects) succeed(res, { message: 'Success', Data: subjects, options: { limit, skip, total } }, 200);
    else failed(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findOne({ _id: id, isActive: true });
    if (subject) succeed(res, { message: 'Success', Data: subject }, 200);
    else failed(res, 'Not Found', 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const updateSubjectById = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const subject = await Subject.findOneAndUpdate({ _id: id, isActive: true }, { $set: data });
    if (subject) succeed(res, { message: 'Updated Sucess', Data: subject }, 200);
    else failed(res, { message: 'Subject not found' }, 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};

export const deleteSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findOneAndUpdate({ _id: id, isActive: true }, { $set: { isActive: false } });
    console.log(subject);
    if (subject) succeed(res, { message: 'Deleted Sucess' }, 200);
    else failed(res, { message: 'Student not found' }, 404);
  } catch (error) {
    console.log(error);
    failed(res, error, 400);
  }
};
