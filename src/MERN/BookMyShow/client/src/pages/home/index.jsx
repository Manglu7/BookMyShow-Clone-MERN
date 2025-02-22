import {useEffect, useState} from "react";
import {ShowLoading, HideLoading} from '../../redux/loaderSlice'
import {useDispatch} from 'react-redux'
import {getAllMovies} from '../../api/movie'
import {message, Row, Col, Input} from 'antd'
import {useNavigate} from 'react-router-dom'
import {SearchOutlined} from '@ant-design/icons'
import moment from 'moment'

const Home = () => {
    const [movies, setMovies] = useState([])
    const [searchText, setSearchText] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getData = async () => {
        try{
            dispatch(ShowLoading())
            const response = await getAllMovies()
            if(response.success){
                setMovies(response.data);
            }
            else{
                message.error(response.error)
            }
        };
        catch(error){
            message.error('error while loading all movies')
            console.log('error while loading all movies', error)
            dispatch(HideLoading())
        };
    }

    useEffect(() => {
        getData()
    }, []);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        console.log('searchText', searchText);
    }

    return (
        <>
            <Row className="justify-content-center w-100">
                <col xs={{span:24}} lg={{span:12}}>
                    <input
                        placeholder="Type here to search for movies..."
                        onChange={handleSearch}
                        prefix={<SearchOutlined />}
                    />
                    <br/>
                    <br/>
                    <br/>
                </col>
            </Row>
            <Row
                className="justify-content-center"
                gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}
            >
                {movies && movies.filter((movie) =>
                    movie.title.toLowerCase().includes(searchText.toLowerCase())
                ).map((movie) => (
                    <col
                        className="gutter-row mb-5"
                        key={movie._id}
                        span={{
                            xs:24,
                            sm:24,
                            md:12,
                            lg:10,
                        }}
                    >
                        <div className='text-center'>
                            <img
                                onClick={() => {
                                    navigate(
                                        `movie/${movie._id}?date=${moment.format(
                                            'YYYY-MM-DD'
                                        )}`,
                                    )
                                }}
                                className="cursor-pointer"
                                src={movie.poster}
                                alt='Movie Poster'
                                width={200}
                                style={{borderRadius:'8px'}}
                            />
                            <h3
                                onClick={() => {
                                    navigate(
                                        `movie/${movie._id}?date=${moment.format(
                                            'YYYY-MM-DD'
                                        )}`,
                                    )
                                }}
                                className="cursor-pointer"
                            >
                                {movie.title}
                            </h3>
                        </div>

                    <col/>
                ))}
            </Row>
        </>
    )
}

export default Home;