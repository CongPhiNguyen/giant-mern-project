import { createSlice } from "@reduxjs/toolkit";
import { v1 as uuidv1 } from "uuid";

const imageSlice = createSlice({
  name: "imageSlice",
  initialState: {
    uploadingImageInfo: [],
    currentOwnImages: [],
    processingImagesInfo: [],
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
    setCurrentOwnImages: (state, action) => {
      state.currentOwnImages = action.payload;
    },
    deleteAnImage: (state, action) => {
      state.currentOwnImages = state.currentOwnImages.filter((value) => {
        return value._id !== action.payload;
      });
    },
    changeAnImage: (state, action) => {
      state.currentOwnImages = state.currentOwnImages.map((imageInfo) => {
        if (imageInfo._id === action.payload.id) {
          return {
            ...imageInfo,
            ...action.payload.value,
          };
        } else return imageInfo;
      });
    },
    setProcessingImages: (state, action) => {
      state.processingImagesInfo = action.payload;
    },
  },
});

export const {
  setLoadImageCount,
  setUploadingImageInfo,
  removeOne,
  setCurrentOwnImages,
  deleteAnImage,
  changeAnImage,
  setProcessingImages,
} = imageSlice.actions;

export default imageSlice.reducer;
