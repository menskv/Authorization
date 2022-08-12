import * as yup from "yup"
import {ValidationErrors} from "../../common/validationErrors";

export const validationSchema = yup.object().shape({
    title: yup.string().required(ValidationErrors.Required),
    description: yup.string().required(ValidationErrors.Required),
    choices: yup.array().required(ValidationErrors.Required).min(2)
})