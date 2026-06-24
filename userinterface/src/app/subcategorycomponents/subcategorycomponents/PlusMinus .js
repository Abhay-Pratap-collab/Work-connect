import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export default function PlusMinus() {
    const [value, setValue] = useState(0);
    const [active, setActive] = useState(false);

    const handledecrease = () => {
        setValue(value - 1);
    }
    const handleincrease = () => {
        setActive(true);
        setValue(value + 1);
    }

    return (<div>
        {value == 0 ? (<div onClick={handleincrease} style={{ color: active ? '#9574f0' : "rgba(162, 133, 236, 0.8)", background: '#fff', width: '80px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '6px', border: '0.1px solid #9574f0', borderRadius: '7px', fontSize: '16px', fontWeight: '700px', cursor: 'pointer', transition: "all 0.2s ease", }}>Add</div>) : (
            <div style={{ color: '#9574f0', width: '80px', height: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px', border: '1px solid #9574f0', borderRadius: '7px', background: '#f2f0f5' }}>
                <LuMinus onClick={handledecrease} style={{ fontSize: '14px', cursor: 'pointer' }} />
                <span>{value}</span>
                <LuPlus onClick={handleincrease} style={{ fontSize: '14px', cursor: 'pointer' }} />
            </div>)}
    </div>)
}