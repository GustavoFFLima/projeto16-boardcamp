export function validitySchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if(error) {
            return res.status(400).send({
                messae: error.details.mao((d) => d.message)
            })
            next();
        }
    }
}