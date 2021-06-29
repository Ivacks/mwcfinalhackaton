const target_pred = require('../../Data-set/csvjson');


const computeECM = (req, res) => {

  const { predictions } = req.body;

  console.log("hola", req.user)

  const squareDiff = target_pred.map((el, index) => {
    const diff = (predictions[index] - el) ** 2;
    //console.log(diff);
    return diff;
    //return (el - (target_pred[index] - 0.1)) ** 2
  });

  const Sum = squareDiff.reduce((acum, val) => (acum + val));

  const average = Sum / target_pred.length;

  res.send({
    ECM: average
  })
}

module.exports = computeECM