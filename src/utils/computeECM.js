const target_pred = require('../../Data-set/csvjson');


const computeECM = (req, res) => {

  const { test_pred } = req.body;

  const squareDiff = target_pred.map((el, index) => {
    return (test_pred - target_pred) ** 2
    //return (el - (target_pred[index] - 0.1)) ** 2
  });

  const Sum = squareDiff.reduce((acum, val) => (acum + val));

  const average = Sum / target_pred.length;

  res.send({
    ECM: average
  })
}

module.exports = computeECM