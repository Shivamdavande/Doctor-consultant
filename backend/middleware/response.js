

module.exports = (req, res, next) => {
    res.ok = (data = {}, message = 'ok', meta = {}) =>
        res.status(200).json({ sucess: true, message, data, meta });


    res.created = (data = {}, message = 'created', meta = {}) =>
        res.status(201).json({ sucess: true, message, data, meta });


    res.badrequest = (message = 'Bad Request', error = []) =>
        res.status(400).json({ sucess: false, message, error });


    res.unauthorized = (message = 'Unauthorized') =>
        res.status(400).json({ sucess: false, message });


    res.forbidden = (message = 'Forbidden') =>
        res.status(403).json({ sucess: false, message });


    res.notFound = (message = 'Not Found') =>
        res.status(404).json({ sucess: false, message });

    res.serverError = (message = 'Internal Server Error', error = []) =>
        res.status(500).json({ sucess: false, message, error });

    next();
}