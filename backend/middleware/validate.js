
const { validateResult } = require('express-validator')


module.exports = (req, res, next) => {
    const errors = validateResult(req);
    if (!errors.isEmpty()) {
        return res.badRequest("Validation Error", errors.array())
    }
    next();
}