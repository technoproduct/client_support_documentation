import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance, apiInstanceFetch } from "../../component/api/axiosApi";
import { Success } from "../../component/api/toastServices";

const initialState = {
  banner: [],
  isSkeleton: false,
  isLoading: false,
};

export const getBanners = createAsyncThunk("admin/banner/getAll", async () => {
  return apiInstanceFetch.get("admin/banner/getAll");
});

export const createBanners = createAsyncThunk(
  "admin/banner/create",
  async (data) => {
    return apiInstance.post(`admin/banner/create`, data);
  }
);

export const updateBanner = createAsyncThunk(
  "admin/banner/editBanner",
  async (id) => {
    return apiInstance.patch(
      `admin/banner/editBanner?id=${id?.id}`,
      id.formData
    );
  }
);

export const deleteBanner = createAsyncThunk(
  "admin/banner/delete",
  async (id) => {
    return apiInstanceFetch.delete(`admin/banner/delete?bannerId=${id}`);
  }
);

export const isActive = createAsyncThunk(
  "admin/banner/isActive",
  async (id) => {
    return apiInstanceFetch.put(`admin/banner/isActive?bannerId=${id}`);
  }
);

const bannerSlice = createSlice({
  name: "bannerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanners.pending, (state, action) => {
      state.isSkeleton = true;
    });

    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.banner = action.payload.data;
      state.isSkeleton = false;
    });

    builder.addCase(getBanners.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    builder.addCase(createBanners.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(createBanners.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.banner.unshift(action.payload.banner);

        Success("Banner Add Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(createBanners.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateBanner.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updateBanner.fulfilled, (state, action) => {
      if (action.payload.status) {
        const bannerIndex = state.banner.findIndex(
          (banner) => banner._id === action.payload.banner._id
        );
        if (bannerIndex !== -1) {
          state.banner[bannerIndex] = {
            ...state.banner[bannerIndex],
            ...action.payload.banner,
          };
        }
      }
      state.isLoading = false;
      Success("Category Update Successfully");
    });

    builder.addCase(updateBanner.rejected, (state, action) => {
      state.isLoading = false;
    });

    // Category Status

    builder.addCase(isActive.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(isActive.fulfilled, (state, action) => {
      if (action.payload.status) {
        const updatedBanner = action.payload.banner;
        const bannerIndex = state.banner.findIndex(
          (banner) => banner?._id === updatedBanner?._id
        );
        if (bannerIndex !== -1) {
          state.banner[bannerIndex].isActive = updatedBanner.isActive;
        }
        Success("Banner Status Update Successfully");
      }
      state.isLoading = false;
    });
    builder.addCase(isActive.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteBanner.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBanner.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.banner = state.banner.filter(
          (banner) => banner._id !== action.meta.arg
        );
        Success("Banner Delete Successfully");
      }
      state.isLoading = false;
    });
    builder.addCase(deleteBanner.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});
export default bannerSlice.reducer;
