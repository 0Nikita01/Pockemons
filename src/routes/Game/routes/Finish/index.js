import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext';
import { FireBaseContext } from '../../../../context/firebaseContext';
import PockemonCard from '../../../../components/PockemonCard';
import { selectLocalID } from "../../../../store/user";
import s from './style.module.css';
import {getPokemonsAsync, selectPokemonsData, selectPokemonsLoading} from '../../../../store/pokemons';

const FinishPage = () => {
    const { pokemon } = useContext(PokemonContext);
    const context = useContext(PokemonContext);
    const firebase = useContext(FireBaseContext);
    const history = useHistory();
    const oldKey = useSelector(selectLocalID);
    const [pokemonsUser1, setPokemonsUser1] = useState({});
    const [pokemonsUser2, setPokemonsUser2] = useState({});
    const dispatch = useDispatch();
    const handlerClick = () => {
        const newKey = firebase.database.ref().child('pokemons').push().key;
        
        console.log(newKey);
        Object.entries(pokemonsUser2).forEach(item => {
            if (item[1].selected)
            {
                console.log(pokemonsUser2);
                delete item[1].selected;
                firebase.postPokemon(oldKey, newKey, item[1]);
            }
        context.onClearContext();
        dispatch(getPokemonsAsync());
        history.replace('/game');
        });
    }

    const handleCardClick = (key) => {
        setPokemonsUser2(prevState => ({
            ...Object.entries(prevState).map(item => {
                if (item[0] === key)
                {
                    item[1].selected = true;
                    return item[1];
                }
                item[1].selected = false;
                return item[1];
            }),
        }))

    }

    useEffect(() => {
        Object.entries(pokemon).forEach((item, key) => {
            if (key < 5)
            {
                setPokemonsUser2(prevState => ({
                    ...prevState,
                    [item[0]]: {
                        ...item[1],
                    }
                }))
            }
            else
            {
                setPokemonsUser1(prevState => ({
                    ...prevState,
                    [item[0]]: {
                        ...item[1],
                    }
                }))
            }
        })
    }, [pokemon]);

    if (Object.keys(pokemon).length === 0)
    {
        history.replace('/game');
    }

    return (
        <div>
            <div className={s.flex}>
				{
					Object.entries(pokemonsUser1).map(([key, {name, img, id, type, values, selected}]) => 
                        <PockemonCard 
                            className={s.card} 
                            key={key} 
                            name={name} 
                            img={img} 
                            id={id} 
                            type={type} 
                            values={values} 
                            isActive={true} 
                        />
                    )
				}
			</div>
            <div className={s.button}>
                <button onClick={handlerClick}>END GAME</button>
            </div>
            <div className={s.flex}>
				{
					Object.entries(pokemonsUser2).map(([key, {name, img, id, type, values, selected}]) => 
                        <PockemonCard 
                            className={s.card} 
                            key={key} 
                            name={name} 
                            img={img} 
                            id={id} 
                            type={type} 
                            values={values} 
                            isActive={true} 
                            isSelected={selected}
                            cardClick={() => {handleCardClick(key)
                            }}
                        />
                    )
				}
			</div>
        </div>
    );
};

export default FinishPage;