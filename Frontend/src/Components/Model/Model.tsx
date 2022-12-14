import { ModelProps } from "./Model.types"
import './Model.scss'
import Loading from "../Spinner/Loading"
const Model = ({ icon, title, description, actionFun , closeModel , isLoading }: ModelProps) => {
    return (
        <div className="Model">
            <div className="Model_content" onClick={(e) => e.stopPropagation()}>
                {icon && <div className="flex justify-center mb-3">{icon}</div>}
                <h1 className="Model_content_title">{title}</h1>
                <p className="Model_content_description">{description}</p>
                <div className="Model_actions"> 
                    <button className="btn btn-blank" onClick={closeModel}  >Cancel</button>
                    <button className="btn btn-primary" onClick={actionFun}>{isLoading ? <Loading /> : "Yes"}</button>
                </div>
            </div>
        </div>
    )
}

export default Model