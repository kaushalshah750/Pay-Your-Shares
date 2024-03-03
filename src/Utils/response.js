export default function responsedata(res, err, errMessage, data) {
    if(err) console.log(errMessage)
    return res.json({err, errMessage, data})
}