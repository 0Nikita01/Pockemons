import s from './style.module.css';
import cn from 'classnames';
import {ReactComponent as ArrowSVG} from "../../../../../../assets/arrow_down.svg";

const Arrow = ({hidden}) => {
    return (
        <>
            <div className={cn(s.arrow, {[s.hidden]: hidden})}>
                <ArrowSVG />
            </div>
        </>
    )
}

export default Arrow;