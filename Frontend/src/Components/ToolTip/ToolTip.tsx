import { TooltipPorps } from "./ToolTip.types"
import './ToolTip.scss';
const ToolTip = ({ text, top, left }: TooltipPorps) => {
    return (
        <div className='ToolTip' style={{ position: "absolute", top, left }}>
            <h4>{text}</h4>
        </div>
    )
}

export default ToolTip