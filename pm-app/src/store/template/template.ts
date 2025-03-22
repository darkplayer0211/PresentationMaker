import { createSlice } from '@reduxjs/toolkit';

export interface TemplateType {
    name: string,
    description: string,
    noSlides: number,
}

const initialState: TemplateType = {
    name: 'Mùa vọng 1',
    description: "Lorem ipsum",
    noSlides: 3
}

export const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        chooseTemplate: (state, action) => {
            state.name = action.payload.name;
            state.description = action.payload.description;
            state.noSlides = action.payload.noSlides;
        }
}})

export const { chooseTemplate } = templateSlice.actions;
export default templateSlice.reducer;