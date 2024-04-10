const validator = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        return next(); // Success, move to the next middleware
    } catch (err) {
        
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.errors[0].message;
        const error ={
            status,
            message,
            extraDetails
        }
        next(error);
    }
};

module.exports = validator;