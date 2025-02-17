import s from "./style.module.css";
import cn from 'classnames';
import Spinner from '../../components/Spinner';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../store/user";


const UserPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const email = useSelector(selectEmail);
    useEffect(() => {
        setIsLoading(preState => !preState);
    }, []);

    if (isLoading) {
        return <Spinner />
    } 
    
    return (

        <div className={s.wrapper}>
            <h1>
                {email}
            </h1>
        </div>
    )
}

export default UserPage;