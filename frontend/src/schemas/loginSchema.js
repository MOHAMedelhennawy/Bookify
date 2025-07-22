import joi from "joi";

const registerSchema = joi.object({
    email: joi.string()
            .required()
            .min(10)
            .max(100)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Email must be a valid email address.',
                'string.min': 'Email must be at least 10 characters long.',
                'string.max': 'Email must not exceed 100 characters.',
                'string.base': 'Email must be a string'
            }),

    password: joi.string()
            .required()
            .min(10)
            .max(50)
            // .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,50}$/)
            .messages({
                'string.empty': 'Password is required',
                'string.pattern.base': 'Password must contain at least one number and one special character (!@#$%^&*).',
                'string.min': 'Password must be at least 10 characters long.',
                'string.max': 'Password must not exceed 50 characters.',
                'string.base': 'Password must be a string',
            }),
});

export default registerSchema;