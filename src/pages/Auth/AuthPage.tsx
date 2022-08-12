import React from 'react';
import {useFormik} from "formik";
import {Form, Input, Button} from "antd"
import {ValidationStatus} from "../../common/validationErrors";
import {validationSchema} from "./validationSchema";
import {Title, Text, Wrapper, WrapperForm, WrapperTitle} from "./style"
import {useNavigate} from 'react-router-dom';
import {authController} from "../../api";
import {setGlobalState} from "../../../GlobalState";
import {FormikHelpers} from "formik/dist/types";
import any = jasmine.any;

interface Forma {
    email: string,
    password: string,
    code: string,
}

export const AuthPage = () => {
    const navigate = useNavigate();
    const [showVerify, setShowVerify] = React.useState(false);

    const setAuthState = (username: string, token: string) => {
        localStorage.setItem('token-admin', token);
        setGlobalState('username', username)
        setGlobalState('loggedIn', true)
    }

    const onSubmit = (values: Forma, formik: FormikHelpers<string>) => {
        if (showVerify) {
            return
        }
        authController.getAuth(values).then((res: ) => {
            if (res.data.two_factor_auth) {
                setShowVerify(true);
                return
            }
            const user = res.data
            setAuthState(user.full_name, user.token);
            navigate('/');

        }).catch((error) => {
            formik.setErrors({email: "Неправильный логин или пароль"})
        })
    }

    const {errors, handleChange, isValid, handleSubmit} = useFormik({
        initialValues: {
            email: "",
            password: "",
            code: ""
        },
        onSubmit,
        validationSchema,
    })

    return (
        <div>
            <Wrapper>
                <WrapperTitle>
                    <Title>Тестовое задание</Title>
                </WrapperTitle>
                <Text>Чтобы войти в административную панель введите логин и пароль в форму ниже</Text>
            </Wrapper>
            <WrapperForm>
                <Form
                    style={{ width: '30%' }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="email"
                        validateStatus={errors.email && ValidationStatus.ERROR}
                        help={errors?.email}

                    >
                        <Input placeholder="E-mail" onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        validateStatus={errors.password && ValidationStatus.ERROR}
                        help={errors?.password}
                    >
                        <Input placeholder="Пароль" type="password" onChange={handleChange} />
                    </Form.Item>

                    {
                        showVerify && <Form.Item>
                            <Input placeholder="Введите код подтверждения" style={{ width: '100%' }} type="primary" />
                        </Form.Item>
                    }

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!isValid}
                            style={{ width: '100%' }}
                        >
                            Войти
                        </Button>
                    </Form.Item>

                    <img src={img2} alt="img1" />
                </Form>
            </WrapperForm>
        </div>
    );
};
