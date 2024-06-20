/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import Button from "../../extras/Button";
import { ExInput } from "../../extras/Input";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../../redux/slice/dialogueSlice";

import { createBanners, updateBanner } from "../../../redux/slice/bannerSlice";

import { getAllServices } from "../../../redux/slice/serviceSlice";
import { getAllCategory } from "../../../redux/slice/categorySlice";
const BannerDialog = () => {
  const dispatch = useDispatch();
  const { dialogueData } = useSelector((state) => state.dialogue);
  
  const { category } = useSelector((state) => state.category);
  const [image, setImage] = useState([]);
  const [type, setType] = useState();
  const [imagePath, setImagePath] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [url, setUrl] = useState("");
  const [error, setError] = useState({
    image: "",
    type: "",
    categoryId: "",
    url: "",
  });


  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImagePath(URL.createObjectURL(e.target.files[0]));
    setError("");
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const handleSubmit = () => {
    
    if (
      !image ||
      !imagePath ||
      !type ||
      (type == 0 && !categoryId) ||
      (type == 1 && !url)
    ) {
      console.log('Error Conditions:', {
        image,
        imagePath,
        type,
        categoryId,
        url,
      });
      let error = {};
      if (!image) error.image = "Image is required";
      if (!type) error.type = "Type is required";
      if (type == 0 && !categoryId) error.categoryId = "CategoryId is Required";
      if (type == 1 && !url) error.url = "URL is Required";

      return setError({ ...error });
    }

    {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("type", type);
      if (type == 0) {
        formData.append("categoryId", categoryId);
      } else {
        formData.append("url", url);
      }
      if (dialogueData) {
        const payload = { formData, id: dialogueData?._id };
        dispatch(updateBanner(payload)).unwrap();
      } else {
        dispatch(createBanners(formData)).unwrap();
      }
    }
    dispatch(closeDialog());
  };

  const types = [
    { value: 0, name: "Category" },
    { value: 1, name: "URL" },
  ];

  return (
    <div className="dialog">
      <div class="w-100">
        <div class="row justify-content-center">
          <div class="col-xl-4 col-md-6 col-11">
            <div class="mainDiaogBox">
              <div class="row justify-content-between align-items-center formHead">
                <div className="col-8">
                  <h2 className="text-theme m0">Banner Dialog</h2>
                </div>
                <div className="col-4">
                  <div
                    className="closeButton"
                    onClick={() => {
                      dispatch(closeDialog());
                    }}
                  >
                    <i className="ri-close-line"></i>
                  </div>
                </div>
              </div>
              <div className="row align-items-start formBody">
                <div className="col-6">
                  <ExInput
                    label={`Image`}
                    id={`image`}
                    type={`file`}
                    onChange={(e) => handleImage(e)}
                    errorMessage={error && error?.image}
                    accept={"image/*"}
                  />
                  <img
                    src={imagePath ? imagePath : null}
                    alt=""
                    draggable="false"
                    className={`${
                      (!imagePath || imagePath === "") && "d-none"
                    } `}
                    data-class={`showImage`}
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>

                <div className="col-md-6 inputData">
                  <div class="inputData">
                    <label className="  " htmlFor="category">
                      Type
                    </label>
                    <select
                      name="category"
                      className="rounded-2 fw-bold"
                      id="category"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        console.log('Selected Type:', e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...error,
                            type: "Type is Required !",
                          });
                        } else {
                          setError({
                            ...error,
                            type: "",
                          });
                        }
                      }}
                    >
                      <option value="" disabled selected>
                        --Select Type--
                      </option>
                      {types?.map((data) => {
                        return (
                          <option value={data?.value}>{data?.name}</option>
                        );
                      })}
                    </select>
                    {error?.categoryId && (
                      <p className="errorMessage text-start">
                        {error && error?.categoryId}
                      </p>
                    )}
                  </div>
                </div>
                {type == 0 && (
                  <div className="col-md-6 inputData">
                    <div class="inputData">
                      <label className="  " htmlFor="category">
                        Category
                      </label>
                      <select
                        name="category"
                        className="rounded-2 fw-bold"
                        id="category"
                        value={categoryId}
                        onChange={(e) => {
                          setCategoryId(e.target.value);
                          if (type == 0 && !e.target.value) {
                            return setError({
                              ...error,
                              categoryId: "categoryId is Required !",
                            });
                          } else {
                            setError({
                              ...error,
                              categoryId: "",
                            });
                          }
                        }}
                      >
                        <option value="" disabled selected>
                          --Select Category--
                        </option>
                        {category?.map((data) => {
                          return <option value={data._id}>{data?.name}</option>;
                        })}
                      </select>
                      {error?.url && (
                        <p className="errorMessage text-start">
                          {error && error?.url}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {type == 1 && (
                  <div className="col-12 col-md-6">
                    <ExInput
                      type={`text`}
                      id={`URL`}
                      name={`URL`}
                      value={url}
                      label={`URL`}
                      placeholder={`URL`}
                      errorMessage={error.commission && error.commission}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...error,
                            url: `url is Required`,
                          });
                        } else {
                          return setError({
                            ...error,
                            url: "",
                          });
                        }
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="row  formFooter">
                <div className="col-12 text-end m0">
                  <Button
                    className={`bg-gray text-light`}
                    text={`Cancel`}
                    type={`button`}
                    onClick={() => dispatch(closeDialog())}
                  />
                  <Button
                    type={`submit`}
                    className={` text-white m10-left`}
                    style={{ backgroundColor: "#1ebc1e" }}
                    text={`Submit`}
                    onClick={(e) => handleSubmit(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerDialog;
