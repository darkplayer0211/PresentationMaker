import { configureStore } from '@reduxjs/toolkit';
import templateReducer from './template/template';
import seasonReducer from './season/season';
import songReducer from './song/song';

export const store = configureStore({
    reducer: {
        template: templateReducer,
        seasons: seasonReducer,
        song: songReducer,
    },
})

export type AppDispatch = typeof store.dispatch;
