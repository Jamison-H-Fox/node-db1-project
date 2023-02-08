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

router.post('/', checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  try{
    res.status(200).json({
      message: 'still working on this one...'
    })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, async (req, res, next) => {
  try{
    res.status(200).json({
      message: 'still working on this one...'
    })
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
    message: err.message,
  })
})

module.exports = router;
