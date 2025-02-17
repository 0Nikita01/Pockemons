import s from "./style.module.css";
import { useHistory } from 'react-router-dom';
import {ReactComponent as WinSVG} from "../../assets/winner.svg";
import {ReactComponent as LoseSVG} from "../../assets/lose.svg";
import {ReactComponent as DrawSVG} from "../../assets/peace.svg";
import cn from "classnames";

const ResultGame = ({result, active}) => {
    const history = useHistory();

    const handlerEndGameClick = () => {
        console.log('click');
        history.replace('/game/finish');
    }
    return (
        <div className={cn(s.wrapper, {[s.active] : active})}>
            <div className={cn(s.score , {[s.active] : active})}>
                        
                <div className={cn(s.img , {[s.activeScore] : active})}>
                    {result === 'win' ? <WinSVG /> : result === 'lose' ? <LoseSVG /> : result === 'draw' ? <DrawSVG /> : null}
                </div>
                <div className={cn(s.title , {[s.activeTitle] : active})}>{result}</div>
            </div>
            <div className={cn(s.buttonBlock, {[s.activeBlock] : active})}>
                <div className={s.button}>
                    <button 
                    onClick={handlerEndGameClick}
                    >
                        FINISH
                    </button>
                </div>
            </div>
        </div>
            
    )
};

export default ResultGame; 