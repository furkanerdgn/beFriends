import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //initial state of the app
  user: JSON.parse(localStorage.getItem("user")) || false,
  posts: [
    {
      id: 1,
      title: "Post 1",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDu68eqPhRHo543gUYKZuzatVItMKjjDu5f1mPUeI4HA&s",
    },
    {
      id: 2,
      title: "Post 2",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4tchINhf5q9IVSofup-e5NAh2qexiozuBu2X4FLC5QQ&s",
    },
    {
      id: 3,
      title: "Post 3",
      src: "https://img-s3.onedio.com/id-53c192adaa1cf6461479f5e8/rev-0/w-1200/h-778/f-jpg/s-0b41ba449f8c6b3ede28518be6b0c43674ca63cc.jpg",
    },
  ],
  stories: [
    {
      id: 1,
      title: "Story 1",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDu68eqPhRHo543gUYKZuzatVItMKjjDu5f1mPUeI4HA&s",
    },
    {
      id: 2,
      title: "Story 2",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4tchINhf5q9IVSofup-e5NAh2qexiozuBu2X4FLC5QQ&s",
    },
    {
      id: 3,
      title: "Story 3",
      src: "https://www.dilekmektubu.com/wp-content/uploads/2021/11/kopek-resimleri-2081017103.jpeg",
    },
  ],
  profilePicture: [
    {
      id: 1,
      title: "Profile Picture 1",
      src: "https://pbs.twimg.com/profile_images/1604306426779910144/l5Q3UepA_400x400.jpg",
    },
  ],
  followers: [
    { id: 1, title: "Follower 1" },
    { id: 2, title: "Follower 2" },
    { id: 3, title: "Follower 3" },
    { id: 4, title: "Follower 4" },
  ],
  message: [{ id: 1, title: "Message 1" }],
  userName: false,
  modalUpload: false,
  selectedUser: false,
  chatModal: false,
};
const auth = createSlice({
  // createSlice is a function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setModalUpload: (state, action) => {
      state.modalUpload = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setChatModal: (state, action) => {
      state.chatModal = action.payload;
    },
  },
});

export const {
  setUser,
  setUserName,
  setModalUpload,
  setSelectedUser,
  setChatModal,
} = auth.actions; // Export the action creators object and the reducer
export default auth.reducer; // Export the reducer, either as a default or named export
