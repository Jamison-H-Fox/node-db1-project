const db = require('../../data/db-config')
const Account = require('./accounts-model');

function checkAccountPayload(req, res, next){
  const error = { status: 400 };
  const { name, budget } = req.body;
  console.log(typeof req.body.budget)

  if(name === undefined || budget === undefined) {
    error.message = 'name and budget are required';
  } else if(name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'name of account must be between 3 and 100';
  } else if(typeof budget !== 'number' || isNaN(budget)) {
    error.message = 'budget of account must be a number';
  } else if(budget > 10**6 || budget < 0) {
    error.message = 'budget of account is too large or too small';
  }

  if (error.message) {
    next(error)
  } else {
    req.name = name.trim();
    req.budget = budget;
    next()
  }
}

async function checkAccountNameUnique(req, res, next){
  try {    
    const account = await db('accounts').where('name', req.body.name.trim()).first();

    if(account) {
      next({ status: 400, message: 'that name is taken'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

async function checkAccountId(req, res, next){
  const account = await Account.getById(req.params.id)
  console.log(account)
  if(!account) {
    next({ status: 404, message: "account not found" })
  } else {
    next()
  }
};

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
}