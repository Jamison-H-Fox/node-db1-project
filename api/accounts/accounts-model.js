const db = require('../../data/db-config');

async function getAll() {
  const result = await db('accounts');
  return result;
}

async function getById(id) {
  const result = await db('accounts').where('id', id).first();
  return result
}

async function getByName(name) {
  const result = await db('accounts').where('name', name).first();
}

async function create(account) {
  const accountId = await db('accounts').insert(account);
  const result = await getById(accountId);
  return result;
}

async function updateById(id, account) {
  await db('accounts').where('id', id).update({ 'name': account });
  const result = await getById(id);
  return result
}

async function deleteById(id) {
  const result = await getById(id);
  await db('accounts').where('id', id).del();
  return result;
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
