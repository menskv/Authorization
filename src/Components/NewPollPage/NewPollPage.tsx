    import React from 'react';
import {
    Select,
    Button,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Typography,
    message
} from "antd";
import styled from "styled-components";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useFormik} from "formik";
import {validationSchema} from "./validationSchema"
import {ValidationStatus} from "../../common/validationErrors";
import {useNavigate} from 'react-router-dom';
import {array} from "yup";

const {Title} = Typography
const {Option} = Select
const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;
interface Forma {
    title: string,
    description: string,
    choices: string[],
    shoppingCenterId: string,
}

export const AddPollPage = () => {
    const navigate = useNavigate()
    const [centers, setCenters] = React.useState([])

    const onSubmit = async (values: Forma) => {
        const {title, description, choices} = values
        navigate('/polls')
    };
    // React.useEffect(() => {
    //     apiController.getShoppingCenters().then(res => {
    //         setCenters(res.data)
    //     })
    // }, [])
    const handleSubmit = () => {}

    const {
        values,
        setValues,
        errors } = useFormik<Forma>({
        initialValues: {
            title: "",
            shoppingCenterId: "",
            description: "",
            choices: [],
        },
        onSubmit,
        validationSchema
    })
    const removeChoice = (index: number) => {
        setValues({...values, choices: values.choices.filter((el, i) => i !== index)})
    }

    const addChoice = () => {
        setValues({...values, choices: [...values.choices, ""]})
    }
    const onChangeChoice = (e:React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value
        setValues({
            ...values, choices: values.choices.map((el, i) => {
                if (index === i) {
                    el = value;
                    return el;
                }
                return el;
            })
        })

    }
    return (
        <>
            <TableDiv style={{marginTop: 24, paddingBottom: 24}}>
                <Title level={5}>Опрос</Title>
                <Divider/>
                <Form layout="vertical">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                       label="Заголовок опроса">
                                <Input placeholder="Заголовок опроса"
                                       value={values.title}
                                       // onChange={onChangeEventValue("title")}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                       help={errors?.description} label="Описание">
                                <Input placeholder="Описание"
                                       value={values.description}
                                       // onChange={onChangeEventValue("description")}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.List
                                name="names"
                                rules={[
                                    {
                                        validator: async (_, names) => {
                                            if (!names || names.length < 2) {
                                                return Promise.reject(new Error('Должно быть минимум 2 варианта ответа'));
                                            }
                                        },
                                    },
                                ]}
                            >
                                {(fields, {add, remove}, {errors}) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                label={index === 0 ? 'Вариант ответа' : ''}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Введите вариант ответа или удалите поле",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="Вариант ответа"
                                                        style={{
                                                            width: '60%',
                                                        }}
                                                        onChange={e => onChangeChoice(e, index)}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => {
                                                            remove(field.name)
                                                            removeChoice(index)
                                                        }}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add()
                                                    addChoice()
                                                }}
                                                style={{
                                                    width: '60%',
                                                }}
                                                icon={<PlusOutlined/>}
                                            >
                                                Добавить вариант ответа
                                            </Button>
                                            <Form.ErrorList errors={errors}/>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                </Form>
            </TableDiv>

            <Row justify="center" style={{marginTop: 24}}>
                <Col>
                    <Button type="primary" onClick={handleSubmit}>
                        Создать
                    </Button>
                </Col>
            </Row>
        </>
    )
        ;
};

