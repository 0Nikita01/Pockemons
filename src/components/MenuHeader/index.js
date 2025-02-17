import { useState } from 'react';
import { NotificationManager } from 'react-notifications';

import Menu from '../Menu';
import Navbar from '../Navbar';
import Modal from '../Modal';
import LoginForm from '../LoginForm';
import { useDispatch } from 'react-redux';
import { getRemoveUser, getUserFetch, getUserUpdateAsync } from '../../store/user';


const loginSignupUser = async ({email, password, type}) => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
        })
    }

    switch (type) {
        case 'signup':
            return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDg4tP9wqUTV4mQoFde2nkS6g3uzFk28PY', requestOptions).then(res => res.json());
        case 'login':
            return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDg4tP9wqUTV4mQoFde2nkS6g3uzFk28PY', requestOptions).then(res => res.json());
        default:
            return 'I cannot login user';
    }
}

const MenuHeader = ({bgActive}) => {
    const [bClass, setbClass] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    const handlerClickHamb = () => {
        setbClass(prevState => !prevState);
    }

    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState);
    }

    const handleSubmitLoginForm = async (props) => {
        handleClickLogin();
        dispatch(getUserFetch());
        const responce = await loginSignupUser(props);
        if (responce.hasOwnProperty('error')) {
            dispatch(getRemoveUser());
            NotificationManager.error(responce.error.message, "Wrong!");
        }
        else {
            if (props.type === 'signup')
            {
                const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
                console.log("pokemons: ", pokemonsStart);

                for (const item of pokemonsStart.data) {
                    await fetch(`https://pokemon-game-3cae4-default-rtdb.firebaseio.com/${responce.localId}/pokemons.json?auth=${responce.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(item)
                    });
                }
            }
            localStorage.setItem('idToken', responce.idToken);
            NotificationManager.success("Successful");
            dispatch(getUserUpdateAsync());
            
        }
    }

    return (
        <>
           <Menu bClass={bClass} onClickLinks={handlerClickHamb}/>
           <Navbar 
                onClickHaburger={handlerClickHamb} 
                bClass={bClass} 
                bgActive={bgActive}
                onClickLogin={handleClickLogin}
            />
            <Modal 
                isOpen={isOpenModal}
                title="Log in..." 
                onCloseModal={handleClickLogin}
            >
                <LoginForm 
                    isResetField={!isOpenModal}
                    onSubmit={handleSubmitLoginForm}
                />
            </Modal>
        </>
    );
};

export default MenuHeader;