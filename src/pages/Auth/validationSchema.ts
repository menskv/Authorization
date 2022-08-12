import * as yup from "yup"
import {ValidationErrors} from "../../common/validationErrors";

export const validationSchema = yup.object().shape({
    email: yup.string().required(ValidationErrors.Required).email(ValidationErrors.Email),
    password: yup.string().required(ValidationErrors.Required),
    code: yup.string().notRequired(),
})