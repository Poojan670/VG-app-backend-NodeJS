const { UserDetails, validate } = require('../models/userDetails')

const createUserDetails = async function (req, res) {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let userDetail = await UserDetails.findOne({ user: req.body.userId })
    if (userDetail) return res.status(400).json({ "error": "User Details of this user already exists!" })

    userDetail = new UserDetails({
        firstName: req.body.firstName,
        middleName: req.body.firstName,
        lastName: req.body.firstName,
        user: req.body.userId,
        dateOfBirth: req.body.dateOfBirth,
        userPhoto: req.file.filename
    })
    userDetail = await userDetail.save()
    res.status(201).send(userDetail)
}

const listUserDetails = async function (req, res) {
    const userDetails = await UserDetails.find().sort('createdAt')
    res.send(userDetails)
}

const getuserDetail = async function (req, res) {
    const userDetail = await UserDetails.findOne({ user: req.user._id })
    if (!userDetail) return res.status(403).json({ "error": "User Details not found!" })
    res.send(userDetail)
}
exports.post = createUserDetails
exports.list = listUserDetails
exports.get = getuserDetail