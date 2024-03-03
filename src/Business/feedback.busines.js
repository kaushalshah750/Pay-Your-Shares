import feedback from '../Controller/feedback/feedback.model'

async function createFeedback(data){
    var feedbackdata = new feedback(data)
    return await feedbackdata.save()
}

module.exports = {createFeedback}