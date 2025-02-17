import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PockemonCard from '../../../../components/PockemonCard';
import Spinner from '../../../../components/Spinner';
import s from './style.module.css';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemonsAsync, selectPokemonsData, selectPokemonsLoading} from '../../../../store/pokemons';
const axios = require('axios');

const StartPage = ({onChangePage}) => {
    const firebase = useContext(FireBaseContext);
    const pokemonContext = useContext(PokemonContext);
    const isLoading = useSelector(selectPokemonsLoading);
    const pokemonsRedux = useSelector(selectPokemonsData);
    const dispatch = useDispatch();
    const history = useHistory();
    const [Pockemons, setPockemons] = useState({});

    useEffect(() => {
        console.log("loading");
        dispatch(getPokemonsAsync());
        console.log("loaded");
        
        let config = {
            method: 'post',
            url: 'http://cm20792.tmweb.ru/',
            data: {
                positions: 554,
                date: 2014
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true'
              }
          };
          
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
        //console.log(Request);
    }, []);
    
    useEffect(() => {
        setPockemons(pokemonsRedux);
       // setLoading(prevState => !prevState);
    }, [pokemonsRedux])


    const handleCardClick = (key) => {
        const pokemon = {...Pockemons[key]}
        pokemonContext.onSelectedPokemons(key, pokemon);
        setPockemons(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected,
            }
        }))
        /*
        setPockemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                    firebase.postPokemon(item[0], pokemon);
                };
        
                acc[item[0]] = pokemon;
        
                return acc;
            }, {});
        
        });
        

        setPockemons(prevState => prevState.map(item => {
            const newItem = {...item}
            if (newItem["id"] === id){
                newItem["active"] = !newItem["active"];
            }
            return newItem;
        }));*/
    };

    /*
    const randomID = (min, max, district = false) => {
        let rand = Math.round(min - 0.5 + Math.random() * (max - min + 1));

        if (district)
        {
            Object.entries(Pockemons).forEach(item => {
                if (rand === item[1].id)
                {
                    rand = randomID(min, max, district);
                }
            });
        }
        
        return rand;
    }
    

    const AddNewPokemon = () => {
        const id = randomID(1, 100, true);
        const index = randomID(0, 4);
        const newPokemon = POCKEMONS[index];
        newPokemon.id = id;
        firebase.addPokemon(newPokemon);
        /*
        database.ref('pokemons/' + newKey)
            .set(newPokemon)
            .then(() => getPockemons());
    }*/

    const handlerStartGameClick = () => {
        history.push('/game/board');
    }

    return (
        <>
            {
                isLoading ? <Spinner /> : (
                    
            <div>
                <div className={s.button}>
                    <button 
                    onClick={handlerStartGameClick}
                    disabled={Object.keys(pokemonContext.pokemon).length < 5}
                    >
                        START GAME
                    </button>
                </div>
                <div className={s.flex}>
                    {
                        Object.entries(Pockemons).map(([key, {name, img, id, type, values, selected}]) => 
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
                                cardClick={() => {
                                    if (Object.keys(pokemonContext.pokemon).length < 5 || selected){
                                        handleCardClick(key)
                                    }
                                }}
                            />
                        )
                    }
                </div>
            </div>
                )
            }
        </>
    );
};

export default StartPage;