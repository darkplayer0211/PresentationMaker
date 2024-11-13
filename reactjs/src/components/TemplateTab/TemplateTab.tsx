import '../../css/templateTab/templateTab.css'

interface TemplateTabProps {
    seasonId: number,
}

const TemplateTab : React.FC<TemplateTabProps> = ({seasonId}) => {

    const seasons = [{
        id: 0,
        templates: [{
            name: 'Mùa vọng 1',
            description: 'Mô tả của mùa vọng 1',
            noSlides: 3,
        },{
            name: 'Mùa vọng 2',
            description: 'Mô tả của mùa vọng 2',
            noSlides: 3,
        },{
            name: 'Mùa vọng 3',
            description: 'Mô tả của mùa vọng 3',
            noSlides: 3,
        },{
            name: 'Mùa vọng 3',
            description: 'Mô tả của mùa vọng 3',
            noSlides: 3,
        },{
            name: 'Mùa vọng 3',
            description: 'Mô tả của mùa vọng 3',
            noSlides: 3,
        },{
            name: 'Mùa vọng 3',
            description: 'Mô tả của mùa vọng 3',
            noSlides: 3,
        },{
            name: 'Mùa vọng 3',
            description: 'Mô tả của mùa vọng 3',
            noSlides: 3,
        },
    ]},{
        id: 1,
        templates: [{
            name: 'Mùa giáng sinh 1',
            description: 'Mô tả của mùa giáng sinh 1',
            noSlides: 3,
        },{
            name: 'Mùa giáng sinh 2',
            description: 'Mô tả của mùa giáng sinh 2',
            noSlides: 3,
        },{
            name: 'Mùa giáng sinh 3',
            description: 'Mô tả của mùa giáng sinh 3',
            noSlides: 3,
        },
    ]},{
        id: 2,
        templates: [{
            name: 'Mùa thường niên 1',
            description: 'Mô tả của mùa thường niên 1',
            noSlides: 3,
        },{
            name: 'Mùa thường niên 2',
            description: 'Mô tả của mùa thường niên 2',
            noSlides: 3,
        },{
            name: 'Mùa thường niên 3',
            description: 'Mô tả của mùa thường niên 3',
            noSlides: 3,
        },
    ]},{
        id: 3,
        templates: [{
            name: 'Mùa chay 1',
            description: 'Mô tả của mùa chay 1',
            noSlides: 3,
        },{
            name: 'Mùa chay 2',
            description: 'Mô tả của mùa chay 2',
            noSlides: 3,
        },{
            name: 'Mùa chay 3',
            description: 'Mô tả của mùa chay 3',
            noSlides: 3,
        },
    ]},{
        id: 4,
        templates: [{
            name: 'Mùa phục sinh 1',
            description: 'Mô tả của mùa phục sinh 1',
            noSlides: 3,
        },{
            name: 'Mùa phục sinh 2',
            description: 'Mô tả của mùa phục sinh 2',
            noSlides: 3,
        },{
            name: 'Mùa phục sinh 3',
            description: 'Mô tả của mùa phục sinh 3',
            noSlides: 3,
        },
    ]},
]

    return (
        <div className="templateTab">
            {seasons[seasonId].templates.map((template, index) => {
                return <div className="templateTab_item">
                    <div>{template.name}</div>
                    <div>{template.description}</div>
                    <div> Số slide: {template.noSlides}</div>
                </div>
            })}
        </div>
    )
}

export default TemplateTab;