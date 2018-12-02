var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: '{iam_api_key}'
});

module.exports = (url,callback)=>{
	var owners = ["me"];
	var threshold = 0.6;

	var params = {
	  url: url,
	  owners: owners,
	  threshold: threshold
	};

	visualRecognition.classify(params, function(err, response) {
	  if (err) {
	    callback(err,null)
	  } else {
	  	callback(null,response["images"][0]["classifiers"][0]["classes"][0]["class"])
	  }
	});
}