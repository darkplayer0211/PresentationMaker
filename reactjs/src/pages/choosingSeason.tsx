import Header from '../components/Header/header';
import TemplateTab from '../components/TemplateTab/TemplateTab';
import '../css/pages/choosingSeason.css'
import { useState } from 'react';

interface ChoosingSeasonProps {} // Define your props interface if needed

const ChoosingSeason: React.FC<ChoosingSeasonProps> = () => {
    const seasons = ["Mùa vọng", "Mùa giáng sinh", "Mùa thường niên", "Mùa chay", "Mùa phục sinh"];
    const [activeSeason, setActiveSeason] = useState(0);
    
    return (
            <div className='choosingSeason'>
                <Header />
                <div className='choosingSeason_title'>
                    Title
                </div>
                <div className='choosingSeason_seasons'>
                    <div className='choosingSeason_seasons_seasonsList'>
                        <div className='choosingSeason_seasons_seasonsList_title'>Chọn mùa lễ</div>
                        <ul className='choosingSeason_seasons_seasonsList_list'>
                            {seasons.map((season, index) => (
                                <li className={`choosingSeason_seasons_seasonsList_list_item ${activeSeason === index ? 'activeSeason' : ''}`}
                                onClick={() => setActiveSeason(index)}
                                key={index}
                                id={index.toString()}>{season}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='choosingSeason_seasons_templatesList'>
                        <div className='choosingSeason_seasons_seasonsList_title'>
                            Chọn mẫu
                        </div>
                        <TemplateTab seasonId={activeSeason}/>
                    </div>
                </div>
            </div>
    )
}

export default ChoosingSeason;