import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
	apiKey: "AIzaSyDg4tP9wqUTV4mQoFde2nkS6g3uzFk28PY",
	authDomain: "pokemon-game-3cae4.firebaseapp.com",
	databaseURL: "https://pokemon-game-3cae4-default-rtdb.firebaseio.com",
	projectId: "pokemon-game-3cae4",
	storageBucket: "pokemon-game-3cae4.appspot.com",
	messagingSenderId: "988476748574",
	appId: "1:988476748574:web:1c2f1cb8bacde20c034f0f"
  };

firebase.initializeApp(firebaseConfig);

class Firebase {
	constructor() {
		this.fire = firebase;
		this.database = this.fire.database();
	}

	offPokemonSoket = () => {
		this.database.ref('pokemons').off();
	} 

	getPokemonSoket = (cb) => {
		this.database.ref('pokemons').on('value', (snapshot) => {
			cb(snapshot.val());
		})
	}

	getPokemonsOnce = async () => {
		return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
	}

	postPokemon = (oldKey, key, pokemon) => {
		this.database.ref(`${oldKey}/pokemons/${key}`).set(pokemon)
	}

	addPokemon = (data, cb) => {
		const newKey = this.database.ref().child('pokemons').push().key;
		this.database.ref('pokemons/' + newKey).set(data);
	}
}

const FirebaseClass = new Firebase();

export default FirebaseClass;