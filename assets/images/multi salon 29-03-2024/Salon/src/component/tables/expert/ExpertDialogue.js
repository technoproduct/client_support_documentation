/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "../../extras/Button";
import Input, { Image, ExInput } from "../../extras/Input";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../../redux/slice/dialogueSlice";
import { expertAdd, expertUpdate } from "../../../redux/slice/expertSlice";
import { addExpert, updateExpert } from "../../../redux/api";
import Multiselect from "multiselect-react-dropdown";
import {
  getAllServices,
  getParticularSalonService,
} from "../../../redux/slice/serviceSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../../extras/Title";

export const ExpertDialogue = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { particularService } = useSelector((state) => state.service);
  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getParticularSalonService());
  }, [dispatch]);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState();
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [email, setEmail] = useState("");
  const [mongoId, setMongoId] = useState();
  const [commission, setCommission] = useState(null);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [IFSCCode, setIFSCCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [password, setPassword] = useState("");
  const [allService, setAllService] = useState([]);

  useEffect(() => {
    if (state) {
      setFname(state?.row?.fname);
      setLname(state?.row?.lname);
      setAge(state?.row?.age);
      setGender(state?.row?.gender);
      setMobile(state?.row?.mobile);
      setEmail(state?.row?.email);
      setImagePath(state?.row?.image);
      setMongoId(state?.row?._id);
      setCommission(state?.row?.commission);
      setBankName(state?.row?.bankDetails?.bankName);
      setAccountNumber(state?.row?.bankDetails?.accountNumber);
      setIFSCCode(state?.row?.bankDetails?.IFSCCode);
      setBranchName(state?.row?.bankDetails?.branchName);
      setUpiId(state?.row?.upiId);
      setPassword(state?.row?.password);
    }
  }, [state]);

  const [error, setError] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    image: "",
    gender: "",
    age: "",
    commission: "",
    allService: "",
    bankName: "",
    accountNumber: "",
    IFSCCode: "",
    branchName: "",
    upiId: "",
    password: "",
  });

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const handleSubmit = async (e) => {
    if (
      !lname ||
      !fname ||
      !age ||
      !mobile ||
      !gender ||
      !email ||
      !image ||
      !commission ||
      !bankName ||
      !accountNumber ||
      !branchName ||
      !IFSCCode ||
      !upiId ||
      !password ||
      !allService?.length
    ) {
      let error = {};

      if (!lname) error.lname = "Last name is required";
      if (!email) error.email = "Email is required";
      if (!fname) error.fname = "First name is required";
      if (!image?.length === 0 || !imagePath)
        error.image = "Image is required!";
      if (!age) error.age = "age is required";
      if (!mobile) error.mobile = "Mobile number is required";
      if (mobile?.length < 6 || mobile?.length > 13)
        error.mobile = "Mobile number must be 6 to 13 digits";
      if (age < 18 || age > 100) error.age = "Invalid Age";
      if (commission < 0 || commission > 99)
        error.commission = "Invalid Commission";
      if (!bankName) error.bankName = "bankName is required";
      if (!commission) error.commission = "Commission is required";
      if (!accountNumber) error.accountNumber = "accountNumber is required";
      if (!branchName) error.branchName = "branchName is required";
      if (!IFSCCode) error.IFSCCode = "IFSC Code is required";
      if (!upiId) error.upiId = "upiId is required";
      if (!password) error.password = "password is required";
      if (!allService?.length)
        error.allService = "At least one service must be selected";
      return setError({ ...error });
    } else if (!isEmailValid) {
      const error = { email: "Email address is invalid" };
      return setError({ ...error });
    } else {
      const formData = new FormData();
      formData.append("salonId", admin?._id);
      formData.append("image", image);
      formData.append("lname", lname);
      formData.append("fname", fname);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("commission", commission);
      formData.append("IFSCCode", IFSCCode);
      formData.append("accountNumber", accountNumber);
      formData.append("branchName", branchName);
      formData.append("upiId", upiId);
      formData.append("password", password);
      formData.append("bankName", bankName);
      const serviceIds = allService?.map((service) => service.id)?.join(",");
      formData.append("serviceId", serviceIds);

      if (mongoId) {
        const payload = { formData, expertId: mongoId };
        dispatch(expertUpdate(payload));
        navigate(-1);
      } else {
        dispatch(expertAdd(formData));
        navigate(-1);
      }
      dispatch(closeDialog());
    }
  };

  useEffect(() => {
    const addData = state?.row?.serviceData?.map((item) => {
      const { _id, ...rest } = item;
      return { id: _id, ...rest };
    });
    setAllService(addData);
  }, [state]);

  const serviceList = particularService?.map((list) => ({
    name: list?.id?.name,
    id: list?.id?._id,
  }));

  const selectedServiceNames = state
    ? state?.row?.serviceData?.map((selectedId) => {
        const matchingService = particularService?.find(
          (service) => service?.id?._id === selectedId?._id
        );
        return { id: matchingService?.id?._id, name: matchingService?.id?.name };
      })
    : [];

  function onSelect(selectedList, selectedItem) {
    const updatedServices =
      allService !== undefined ? [...allService, selectedItem] : [selectedItem];
    setAllService(updatedServices);
  }

  function onRemove(selectedList, removedItem) {
    const updatedServices = selectedList?.filter(
      (item) => item.id !== removedItem.id
    );
    setAllService(updatedServices);
  }

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    setImagePath(URL.createObjectURL(e.target.files[0]));
    setError((prevErrors) => ({
      ...prevErrors,
      image: "",
    }));
  };

  return (
    <div className="p-3">
      <Title name={`Add Expert`} />
      <div className="card">
        <div className="card-body">
          <div class="">
            <div className="row align-items-start formBody">
              <div className="row my-2">
                <div className="col-12">
                  <div className="inputData text  flex-row justify-content-start text-start">
                    <label for="fname" class="false text-capitalize">
                      Select Services
                    </label>
                  </div>
                  <Multiselect
                    options={serviceList}
                    selectedValues={
                      selectedServiceNames ? selectedServiceNames : []
                    }
                    onSelect={onSelect}
                    onRemove={onRemove}
                    displayValue="name"
                    className="cursor-pointer"
                  />
                </div>
                {error.allService && (
                  <p className="errorMessage">{error?.allService}</p>
                )}
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`text`}
                  id={`fname`}
                  name={`fname`}
                  value={fname}
                  label={`First name`}
                  placeholder={`First name`}
                  errorMessage={error.fname && error.fname}
                  onChange={(e) => {
                    setFname(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        fname: `First Name Is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        fname: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`text`}
                  value={lname}
                  id={`lname`}
                  name={`lname`}
                  label={`Last Name`}
                  placeholder={`Last Name`}
                  errorMessage={error.lname && error.lname}
                  onChange={(e) => {
                    setLname(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        lname: `Last Name Is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        lname: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`number`}
                  value={mobile}
                  id={`mono`}
                  name={`mobile`}
                  label={`Mobile Number`}
                  minLength={6}
                  maxLength={13}
                  placeholder={`Mobile Number`}
                  errorMessage={error.mobile && error.mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        mobile: `Mobile Number Is Required`,
                      });
                    } else if (
                      e.target.value.length < 6 ||
                      e.target.value.length > 13
                    ) {
                      return setError({
                        ...error,
                        mobile: "Mobile number must be 6 to 13 digits",
                      });
                    } else {
                      return setError({
                        ...error,
                        mobile: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`text`}
                  id={`email`}
                  name={`email`}
                  label={`Email`}
                  value={email}
                  placeholder={`Email`}
                  errorMessage={error.email && error.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        email: `Email is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        email: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`number`}
                  id={`age`}
                  name={`age`}
                  value={age}
                  label={`Age`}
                  placeholder={`Age`}
                  minLength={2}
                  maxLength={2}
                  errorMessage={error.age && error.age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        age: `age is Required`,
                      });
                    } else if (
                      e.target.value.length < 2 ||
                      e.target.value.length > 3
                    ) {
                      return setError({
                        ...error,
                        age: "Invalid Age",
                      });
                    } else {
                      return setError({
                        ...error,
                        age: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`number`}
                  id={`commission`}
                  name={`commission`}
                  value={commission}
                  label={`Admin Commission (%)`}
                  placeholder={`Admin Commission`}
                  errorMessage={error.commission && error.commission}
                  onChange={(e) => {
                    setCommission(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        commission: `Commission is Required`,
                      });
                    } else if (e.target.value > 99 || e.target.value < 0) {
                      return setError({
                        ...error,
                        commission: "Invalid Commission",
                      });
                    } else {
                      return setError({
                        ...error,
                        commission: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`string`}
                  id={`bankName`}
                  name={`bankName`}
                  value={bankName}
                  label={`Bank Name`}
                  placeholder={`Bank Name`}
                  errorMessage={error.bankName && error.bankName}
                  onChange={(e) => {
                    setBankName(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        bankName: `bankName is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        bankName: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`string`}
                  id={`accountNumber`}
                  name={`accountNumber`}
                  value={accountNumber}
                  label={`Account Number`}
                  placeholder={`Account Number`}
                  errorMessage={error.accountNumber && error.accountNumber}
                  onChange={(e) => {
                    setAccountNumber(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        accountNumber: `account Number is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        accountNumber: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`string`}
                  id={`branchName`}
                  name={`branchName`}
                  value={branchName}
                  label={`Branch Name)`}
                  placeholder={`Branch Name`}
                  errorMessage={error.branchName && error.branchName}
                  onChange={(e) => {
                    setBranchName(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        branchName: `branch Name is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        branchName: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`string`}
                  id={`IFSCCode`}
                  name={`IFSCCode`}
                  value={IFSCCode}
                  label={`IFSC Code`}
                  placeholder={`IFSC Code`}
                  errorMessage={error.IFSCCode && error.IFSCCode}
                  onChange={(e) => {
                    setIFSCCode(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        IFSCCode: `IFSC Code is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        IFSCCode: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`string`}
                  id={`upiId`}
                  name={`upiId`}
                  value={upiId}
                  label={`Upi Id`}
                  placeholder={`Upi Id`}
                  errorMessage={error.upiId && error.upiId}
                  onChange={(e) => {
                    setUpiId(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        upiId: `upiId is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        upiId: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <ExInput
                  type={`password`}
                  id={`password`}
                  name={`password`}
                  value={password}
                  label={`Password`}
                  placeholder={`Password`}
                  errorMessage={error.password && error.password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        password: `Password is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        password: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="d-flex justify-content-between col-12 col-md-6 mt-md-5 mt-sm-0">
                <span className="fs-16 fw-600"> Gender: </span>
                <div className="col-4 ms-2">
                  <ExInput
                    type={`radio`}
                    id={`male`}
                    label={`Male`}
                    name={`gender`}
                    value={`male`}
                    checked={(gender === "male" || gender === "Male") && true}
                    onChange={(e) => {
                      setGender(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          gender: `Gender Is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          gender: "",
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-4">
                  <ExInput
                    type={`radio`}
                    id={`female`}
                    label={`Female`}
                    name={`gender`}
                    value={`female`}
                    checked={
                      (gender === "female" || gender === "Female") && true
                    }
                    onChange={(e) => {
                      setGender(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...error,
                          gender: `Gender Is Required`,
                        });
                      } else {
                        return setError({
                          ...error,
                          gender: "",
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="col-6">
                <ExInput
                  label={`Image`}
                  id={`image`}
                  type={`file`}
                  onChange={(e) => handleImage(e)}
                  errorMessage={error.image && error.image}
                  accept={"image/*"}
                />
                <img
                  src={imagePath !== "" ? imagePath : null}
                  alt=""
                  draggable="false"
                  className={`${(!imagePath || imagePath === "") && "d-none"} `}
                  data-class={`showImage`}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            </div>

            <div className="row  formFooter">
              <div className="col-12 text-end m0">
                <Button
                  className={`bg-gray text-light`}
                  text={`Cancel`}
                  type={`button`}
                  onClick={() => navigate(-1)}
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
  );
};
