import { useState } from "react";
import PockemonCard from "../../../../../../components/PockemonCard";
import Arrow from "../Arrow";
import s from './style.module.css';
import cn from 'classnames';

const PlayerBoard = ({ player, cards, onClickCard, hidden }) => {
    const [isSelected, setSelected] = useState(null);
    return (
        <>
            <Arrow hidden={hidden}/>
            {
                cards.map((item) => (
                    <div className={cn(s.cardBoard, {
                        [s.selected] : isSelected === item.id
                        })}
                        onClick={() => {
                            if (!hidden){
                                setSelected(item.id)
                                onClickCard && onClickCard({
                                    player,
                                    ...item,
                                })
                            }
                            
                        }}
                    >
                        <PockemonCard 
                            key={item.id} 
                            name={item.name} 
                            img={item.img} 
                            id={item.id} 
                            type={item.type} 
                            values={item.values} 
                            isActive={true} 
                            minimize
                        />
                    </div>
                ))
            }
        </>
    );
};

export default PlayerBoard;