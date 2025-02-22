import { Modal, message } from 'antd';
import { deleteMovie } from '../../api/movie';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import {useDispatch} from "react-redux";

const DeleteMovieModal = ({isDeleteModalOpen, setIsDeleteModalOpen, selectedMovie, setSelectedMovie, getData}) => {
    const dispatch = useDispatch();
    const handleOk = async () => {
        try{
            dispatch(ShowLoading())
            const movieId = selectedMovie._id;
            const response = await deleteMovie(movieId);
            if(response.success){
                message.success(response.message);
                getData();
            }
            else{
                message.error(response.message);
            }
            setIsDeleteModalOpen(false);
            setSelectedMovie(null);
            dispatch(HideLoading())
        }
        catch(error){
            console.log(error);
            dispatch(HideLoading());
            setIsDeleteModalOpen(false);
        }
    }

    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedMovie(null);
    }

    return (
        <Modal
            centered
            title="Delete Movie"
            open={isDeleteModalOpen}
            onCancel={handleCancel}
            onOk={handleOk}
        >
            Are you sure you want to delete this movie?
        </Modal>
    )
}
export default DeleteMovieModal