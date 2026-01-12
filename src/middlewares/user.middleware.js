import { body, validationResult } from 'express-validator';

export const validateCreateUser = [
    // validación del nombre
    body('name')
        .exists({ checkNull: true })
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long')
        .isLength({ max: 50 }) //DONE: Añadir máximo de 50 caracteres
        .withMessage("Name cannot be over 50 characters long"),
    // validación del email
    body('email')
        .exists({ checkNull: true })
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email address'),
    // Middleware to handle validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];