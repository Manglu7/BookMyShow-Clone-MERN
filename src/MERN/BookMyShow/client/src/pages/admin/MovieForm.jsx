import {Col, Modal, Row, Form, Input, Select, Button, message} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { addMovie, updateMovie } from '../../api/movie';
import moment from 'moment';

const MovieForm = ({
    isModalOpen,
    setIsModalOpen,
    selectedMovie,
    setSelectedMovie,
    formType,
    getData
}) => {
    const dispatch = useDispatch();

    if (selectedMovie) {
        selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format('YYYY-MM-DD');
    }

    const onFinish = async (values) => {
        try{
            dispatch(ShowLoading());
            let response = null;
            if(formType === 'add'){
                response = await addMovie(values);
            }
            else{
                response = await updateMovie({...values, movieId:selectedMovie._id});
            }
            if(response.success){
                getData();
                message.success(response.message);
                setIsModalOpen(false);
            }
            else{
                message.error(response.message);
            }
            setSelectedMovie(null);
            dispatch(HideLoading());
        }
        catch(error){
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    return (
        <Modal
            centered
            title={formType === 'add' ? 'Add Movie' : 'Edit Movie'}
            open={isModalOpen}
            onCancel={handleCancel}
            width={800}
            footer={null}
        >
            <Form layout="vertical" initialValues={selectedMovie} onFinish={onFinish}>
                <Row gutter={{xs:6, sm:10, md:12, lg:16}}>
                    <Col span={24}>
                        <Form.Item
                            label="Movie Name"
                            name="name"
                            rules={[{required: true, message: 'Movie Name is required'}]}
                        >
                            <Input placeholder="Enter Movie Name"/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Description"
                            name="Description"
                            rules={[{required: true, message: 'Description is required'}]}
                        >
                            <TextArea rows="4" placeholder="Enter Movie Description"/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Row gutter={{xs:6, sm:10, md:12, lg:16}}>
                            <Col span={8}>
                                <Form.Item
                                    label="Movie Duration in minutes"
                                    name="duration"
                                    rules={[{required: true, message: 'Duration is required'}]}
                                >
                                    <input type="number" placeholder="Enter Movie Duration in minutes"/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Select Movie Language"
                                    name="language"
                                    rules={[{required: true, message: 'Language is required'}]}
                                >
                                    <Select
                                        placeholder="Select Language"
                                        options={[
                                            {value: 'English', label: 'English'},
                                            {value: 'Spanish', label: 'Spanish'},
                                            {value: 'Hindi', label: 'Hindi'},
                                            {value: 'Punjabi', label: 'Punjabi'},
                                            {value: 'Telugu', label: 'Telugu'},
                                            {value: 'Bengali', label: 'Bengali'},
                                            {value: 'Russian', label: 'Russian'},
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label='Release Date'
                                    name="releaseDate"
                                    rules={[{required: true, message: 'Release Date is required'}]}
                                >
                                    <input type="date"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={{xs:6, sm:10, md:12, lg:16}}>
                            <Col span={8}>
                                <Form.Item
                                    label='Select Movie Genre'
                                    name="genre"
                                    rules={[{required: true, message: 'Genre is required'}]}
                                >
                                    <Select
                                        placeholder="Select Movie Genre"
                                        options={[
                                            {value: 'Action', label: 'Action'},
                                            {value: 'Comedy', label: 'Comedy'},
                                            {value: 'Horror', label: 'Horror'},
                                            {value: 'Romance', label: 'Romance'},
                                            {value: 'Patriot', label: 'Patriot'},
                                            {value: 'Bhakti', label: 'Bhakti'},
                                            {value: 'Thriller', label: 'Thriller'},
                                            {value: 'Mystry', label: 'Mystry'},
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item
                                    label='Poster Url'
                                    name="poster"
                                    rules={[{required: true, message: 'Poster is required'}]}
                                >
                                    <Input placeholder="Enter Poster Url"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Form.Item>
                    <Button
                        block
                        type="primary"
                        htmlType="submit"
                        style={{ fontSize: '1rem',fontWeight: '600' }}
                    >
                        Submit the Data
                    </Button>
                    <Button className='mt-3' block onClick={handleCancel}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default MovieForm