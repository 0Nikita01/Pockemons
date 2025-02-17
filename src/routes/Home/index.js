/* import HeaderBlock from "./components/headerBlocks"; */
import Header from '../../components/Header';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const history = useHistory();

    const handlerClick = () => {
        history.push('/game');
    }
	return (
		<>
            <Header 
                title="This is title" 
                descr="This is Description!" 
                clickButton={handlerClick}
            />
		</>
	)
}

export default HomePage;