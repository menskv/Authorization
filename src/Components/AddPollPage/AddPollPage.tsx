import React from 'react';
import {Button, Col, Row, Table, Spin, Typography} from "antd";
import styled from "styled-components";
import {PlusOutlined} from "@ant-design/icons";
const {Title} = Typography


const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

export const AddPollPage = () => {
    const [loading, setLoading] = React.useState(true);
    const [polls, setPolls] = React.useState([])

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Имя',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Статус',
            dataIndex: 'isActive',
            key: 'isActive',
            width: '15%',

            // render: is_active => {
            //     return (
            //         <Badge status={is_active ? 'success' : 'error'}
            //                text={is_active ? 'Активен' : 'Неактивен'}
            //         />
            //     )
            // }
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
            // render: created_at => {
            //     return (
            //         <div>{created_at.split('T')[0]}</div>
            //     )
            // }
        },
        {
            title: 'Действия',
            dataIndex: 'isActive',
            key: 'isActive',
            width: '10%',

            // render: (is_active, poll) => (
            //     <>
            //         <Link to={`../edit-poll/${poll.id}`} type="link">Редактировать</Link>
            //         <Button danger type="link"
            //                 onClick={() => handleActivateButton(poll)}
            //         >{is_active ? 'Остановить' : 'Запустить'}</Button>
            //     </>
            // )
        },
    ]
    return (
        <>

            <TableDiv>
                <Row style={{width: '100%', marginBottom: 16}} justify="space-between" align="middle">
                    <Col>
                        <Title level={5} style={{margin: 0}}>Список контактов</Title>
                    </Col>
                    <Col>
                        <Button type="primary" icon={<PlusOutlined/>}>Создать</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Spin spinning={loading}>
                            <Table
                                rowKey="id"
                                locale={{emptyText: 'Ничего не найдено'}}
                                columns={columns}
                                dataSource={polls}/>
                        </Spin>
                    </Col>
                </Row>
            </TableDiv>
        </>
    )
};

