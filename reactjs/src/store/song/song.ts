import { createSlice } from '@reduxjs/toolkit';

export interface SongType {
    name: string;
    type: string;
    lyrics: string;
}

export const songTypes = ['Nhập lễ', 'Dâng lễ', 'Hiệp lễ', 'Kết lễ', 'ĐC - Tất cả'];

const songs = [{
    name: 'Tên bài hát nhập lễ 1',
    type: 'Nhập lễ',
    lyrics: 'Lời thu gọn...'
},{
    name: 'Tên bài hát nhập lễ 2',
    type: 'Nhập lễ',
    lyrics: 'Lời thu gọn...'
},{
    name: 'Tên bài hát nhập lễ 3',
    type: 'Nhập lễ',
    lyrics: 'Lời thu gọn...'
},
{
    name: 'Tên bài hát dâng lễ 3',
    type: 'Dâng lễ',
    lyrics: 'Lời thu gọn...'
},
{
    name: 'Tên bài hát Hiệp lễ 3',
    type: 'Hiệp lễ',
    lyrics: 'Lời thu gọn...'
},
{
    name: 'Tên bài hát Kết lễ 3',
    type: 'Kết lễ',
    lyrics: 'Lời thu gọn...'
},
{
    name: 'Tên bài hát ĐC - Tất cả 3',
    type: 'ĐC - Tất cả',
    lyrics: 'Lời thu gọn...'
},
]

export interface ChosenSongsForTemplateType{
    chosenType: string;
    chosenSong: string;
}

const chosenSongsForTemplate : ChosenSongsForTemplateType[] = [{
    chosenType: 'Nhập lễ',
    chosenSong: 'Tên bài hát nhập lễ 1'
}];

const initialState: {
    chosenSongType: string,
    songs: SongType[],
    chosenSongsForTemplate: ChosenSongsForTemplateType[]} = {
    chosenSongType: 'Nhập lễ',
    songs: songs.filter((song) => song.type === 'Nhập lễ'),
    chosenSongsForTemplate: chosenSongsForTemplate,
}

export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        chooseSongType: (state, action) => {
            state.chosenSongType = action.payload;
            state.songs = songs.filter((song) => song.type === action.payload);
        },
        chooseSong: (state, action) => {
            const chosen = state.chosenSongsForTemplate.find((song) => {
                return song.chosenType === state.chosenSongType;
            })
            if (chosen) {
                chosen.chosenSong = action.payload;
            } else {
                state.chosenSongsForTemplate.push({chosenType: state.chosenSongType, chosenSong: action.payload});
            }
        }
}})

export const { chooseSongType, chooseSong } = songSlice.actions;
export default songSlice.reducer;