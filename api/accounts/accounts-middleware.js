// const db = require('../../data/db-config')
const Account = require('./accounts-model');

function checkAccountPayload(req, res, next){
  const { name, budget } = req.body;
  const message = { message: '' };
 if(!name || !budget) {
  message.message = 'name and budget are required';
 } else if(name.trim().length < 3 || name.trim().length > 100) {
  message.message = 'name of account must be between 3 and 100';
 } else if(!parseInt(budget)) {
  message.message = 'budget of account must be a number';
 } else if(budget > 10**7 || budget < 0) {
  message.message = 'budget of account is too large or too small';
 } else {
  next()
 }

 next(res.status(400).json({ message: `${message.message}`}));
}

async function checkAccountNameUnique(req, res, next){
  const name = req.body.name.trim();
  const account = await Account.getByName(name)
  if(account) {
    next({ status: 400, message: 'that name is taken'})
  } else {
    next()
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