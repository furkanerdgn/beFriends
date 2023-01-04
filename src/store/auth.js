import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user'))||false,
    userName: "furkan",
    posts: [
        {id: 1, title: 'Post 1',src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDu68eqPhRHo543gUYKZuzatVItMKjjDu5f1mPUeI4HA&s"},
        {id: 2, title: 'Post 2',src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4tchINhf5q9IVSofup-e5NAh2qexiozuBu2X4FLC5QQ&s"},
        {id: 3, title: 'Post 3',src:"https://img-s3.onedio.com/id-53c192adaa1cf6461479f5e8/rev-0/w-1200/h-778/f-jpg/s-0b41ba449f8c6b3ede28518be6b0c43674ca63cc.jpg"},
        {id: 4, title: 'Post 4'},
        {id: 5, title: 'Post 5'},
        {id: 6, title: 'Post 6'},
        {id: 7, title: 'Post 7'},
    ],
    stories: [
        {id: 1, title: 'Story 1',src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDu68eqPhRHo543gUYKZuzatVItMKjjDu5f1mPUeI4HA&s"},
        {id: 2, title: 'Story 2',src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4tchINhf5q9IVSofup-e5NAh2qexiozuBu2X4FLC5QQ&s"},
        {id: 3, title: 'Story 3',src:"https://www.dilekmektubu.com/wp-content/uploads/2021/11/kopek-resimleri-2081017103.jpeg"},  
    ],
    profilePicture: [
        {id: 1, title:"Profile Picture 1",src:"https://pbs.twimg.com/profile_images/1604306426779910144/l5Q3UepA_400x400.jpg"}
    ],
    followers: [
        {id: 1, title: 'Follower 1'},
        {id: 2, title: 'Follower 2'},
        {id: 3, title: 'Follower 3'},
        {id: 4, title: 'Follower 4'},
    ]
        
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;}
        }
    }
)

export const {setUser} = auth.actions
export default auth.reducer 