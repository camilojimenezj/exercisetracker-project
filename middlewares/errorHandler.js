module.exports = (error, req, res, next) => {
  console.log(error.name)
  res.status(400).json({error: error.name})
}