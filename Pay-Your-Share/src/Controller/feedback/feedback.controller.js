import feedbackbusiness from '../../Business/feedback.busines'
import responsedata from '../../Utils/response'

exports.createFeedback = (req, res) => {
    feedbackbusiness.createFeedback(req.body)
        .then(data => responsedata(res, false, "", data))
        .catch(err => responsedata(res, true, err, null))
};