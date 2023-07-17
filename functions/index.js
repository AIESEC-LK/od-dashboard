const functions = require("firebase-functions");
const od_scores = require("./od_scores");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getScores = functions.https.onRequest(async (request, response) => {
  const month = request.query.month;
  if (month == null) {
    response.send("ERROR");
  }
  const functions_list = ["Finance", "BD", "EwA & PR", "Product Marketing", "Brand MKT", "EM", "IM", "iGV", "oGV", "iGTa/iGTe", "oGTa/oGTe", "TM", "XDI", "HDI", "ODI"];
  let result = [];
  for (const function_name of functions_list) {
    result.push(await od_scores.add(function_name, month))
  }
  response.send(result);
});