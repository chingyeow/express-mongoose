import Joi from 'joi';
import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().default(8080),
    LOG_LEVEL: Joi.string().valid('error', 'warn', 'http', 'verbose', 'debug', 'silly').default('silly'),
    API_PREFIX: Joi.string().required(),
    MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
        is: Joi.string().equal('development'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false),
    }),
})
    .unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    log: {
        level: envVars.LOG_LEVEL,
    },
    api: {
        prefix: envVars.API_PREFIX,
    },
};

export default config;
