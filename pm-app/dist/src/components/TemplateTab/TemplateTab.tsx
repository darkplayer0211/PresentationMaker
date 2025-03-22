import '../../css/templateTab/templateTab.css'
import { useDispatch, useSelector } from 'react-redux';
import { SeasonType } from '../../store/season/season';
import { TemplateType } from '../../store/template/template';
import { chooseTemplate } from '../../store/template/template';
import { Link } from 'react-router-dom';

interface TemplateTabProps {
    seasonId: number,
}

const TemplateTab : React.FC<TemplateTabProps> = ({seasonId}) => {

    const seasons = useSelector((state: {seasons: SeasonType[]}) => {
        return state.seasons
    });

    const dispatch = useDispatch();

    const handleTemplateChoose = (template: TemplateType) => {
        dispatch(chooseTemplate(template));
    }

    return (
        <div className="templateTab">
            {seasons[seasonId].templates.map((template : TemplateType, index : number) => {
                return <Link to={'/choosingSongs'} key={index}
                onClick={() => handleTemplateChoose(template)}
                className="templateTab_item">
                    <div className='templateTab_item_name'>{template.name}</div>
                    <div className='templateTab_item_description'>{template.description}</div>
                    <div className='templateTab_item_noSlides'> Số slide: <p>{template.noSlides}</p></div>
                </Link>
            })}
        </div>
    )
}

export default TemplateTab;/*************  ✨ Codeium Command ⭐  *************/
/******  316fd710-fcd1-43c2-bb05-99f846453155  *******/    /**
     * Handles choosing a template from the list of templates. Dispatches the chooseTemplate action 
     * from the template slice with the chosen template as the payload.
     * @param {TemplateType} template - The chosen template.
     */
