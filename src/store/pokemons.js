import { createSlice } from '@reduxjs/toolkit';
//import { act } from '@testing-library/react';
import FirebaseClass from '../service/firebase';
import { selectLocalID } from './user';

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchPokemons: state => ({
            ...state,
            isLoading: true,
        }),
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
    }
});

export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject} = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;

export const getPokemonsAsync = () => async (dispatch, getState) => {
    const localId = selectLocalID(getState());
    console.log(localId);
    dispatch(fetchPokemons());
    const data = await fetch(`https://pokemon-game-3cae4-default-rtdb.firebaseio.com/${localId}/pokemons.json`).then(res => res.json());
    dispatch(fetchPokemonsResolve(data));
}

export default slice.reducer;