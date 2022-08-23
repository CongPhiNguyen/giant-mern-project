import { createSlice } from "@reduxjs/toolkit";
import { v1 as uuidv1 } from "uuid";

const imageSlice = createSlice({
  name: "imageSlice",
  initialState: {
    uploadingImageInfo: [],
  },
  reducers: {
    setLoadImageCount: (state, action) => {
      let newAdd = [];
      for (let i = 0; i < action.payload.length; i++) {
        newAdd.push({
          title: `Ảnh ${action.payload.fromIndex + i} - ${uuidv1().slice(
            0,
            8
          )}`,
          description: "",
          alt: "",
          storage: 0,
          dimension: {
            x: 0,
            y: 0,
          },
          generateTime: 0,
        });
      }
      state.uploadingImageInfo = [
        ...state.uploadingImageInfo.slice(0, action.payload.fromIndex),
        ...newAdd,
      ];
    },
    setUploadingImageInfo: (state, action) => {
      state.uploadingImageInfo[action.payload.index] = {
        ...state.uploadingImageInfo[action.payload.index],
        ...action.payload.value,
      };
    },
    removeOne: (state, action) => {
      let index = action.payload.index;
      state.uploadingImageInfo.splice(index, 1);
    },
  },
});

export const { setLoadImageCount, setUploadingImageInfo, removeOne } =
  imageSlice.actions;

export default imageSlice.reducer;
