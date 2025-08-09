import { createSlice } from '@reduxjs/toolkit';

export interface SongType {
    name: string;
    type: string;
    lyrics: string;
}

export const songTypes = ['Nhập lễ', 'Dâng lễ', 'Hiệp lễ', 'Kết lễ', 'ĐC - Tất cả'];

// TODO: variable -> json file
const newSongsForTemplate = [{
    "slide":[
        {
            "slide_num": 0,
            "title": null,
            "title_font": null,
            "title_font_size": null,
            "content": null,
            "content_font": null,
            "content_font_size": null,
            "background_image": null,
        },
        {
            "slide_num": 1,
            "title": "Alleluia Hat Len Nguoi Oi",
            "content": "",
            "title_font": "Arial",
            "title_font_size": 40,
            "content_font": "Arial",
            "content_font_size": 20
        },
        {
            "slide_num": 2,
            "title": "Alleluia Hat Len Nguoi Oi",
            "content": "",
            "title_font": "Arial",
            "title_font_size": 40,
            "content_font": "Arial",
            "content_font_size": 20
        },
        {
            "slide_num": 3,
            "title": "Alleluia Hat Len Nguoi Oi",
            "content": "",
            "title_font": "Arial",
            "title_font_size": 40,
            "content_font": "Arial",
            "content_font_size": 20
        }
    ]
}]

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
    // TODO: use json file
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