import store from "./store/index";
import { setUser } from "./store/auth";
import { setUserName } from "./store/auth";
import { setModalUpload } from "./store/auth";
import { setSelectedUser } from "./store/auth";
import { setChatModal } from "./store/auth";

export const userHandle = (data) => {
  // this function set user data to redux store
  store.dispatch(setUser(data));
};

export const setName = (veri) => {
  // this function change user name in redux store
  store.dispatch(setUserName(veri));
};
export const setUploadModal = (madalState) => {
  // this function change user name in redux store
  store.dispatch(setModalUpload(madalState));
};

export const setSelectedUserUpdate = (user) => {
  // this function change selected user name in redux store
  store.dispatch(setSelectedUser(user));
};

export const setChatModalUpdate = (chatModalState) => {
  // this function change chat modal state in redux store
  store.dispatch(setChatModal(chatModalState));
};
