const router = require('express').Router()
const Account = require('./accounts-model')

const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require('./accounts-middleware')


router.get('/', async (req, res, next) => {
  try{
    const data = await Account.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try{
    const data = await Account.getById(req.params.id);
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try{
    const data = await Account.create({ name: req.name, budget: req.budget });
    res.status(201).json(data);
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try{
    const data = await Account.updateById(req.params.id, { name: req.name, budget: req.budget })
    res.status(200).json(data);
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
    const data = await Account.deleteById(req.params.id);
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    // customMessage: 'this is the catch-all',
    message: err.message,
  })
})

module.exports = router;
