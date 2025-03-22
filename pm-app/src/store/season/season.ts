import { createSlice } from '@reduxjs/toolkit';
import { TemplateType } from '../template/template';

export interface SeasonType {
    id: number,
    templates: TemplateType[]
}

const initialState: SeasonType[] = [{
    id: 0,
    templates: [{
        name: 'Mùa vọng 1',
        description: "Lorem ipsum",
        noSlides: 3
    }]
}, {
    id: 1,
    templates: [{
        name: 'Mùa giáng sinh 1',
        description: "Lorem ipsum",
        noSlides: 3
    }]
}, {
    id: 2,
    templates: [{
        name: 'Mùa thường niên 1',
        description: "Lorem ipsum",
        noSlides: 3
    }]
}, {
    id: 3,
    templates: [{
        name: 'Mùa chay 1',
        description: "Lorem ipsum",
        noSlides: 3
    }]
}, {
    id: 4,
    templates: [{
        name: 'Mùa phục sinh 1',
        description: "Lorem ipsum",
        noSlides: 3
    }]},

]


export const seasonSlice = createSlice({
    name: 'season',
    initialState,
    reducers: {
        fetchSeason: (state, action) => {
            state = action.payload
        }
    }
})

export default seasonSlice.reducer;