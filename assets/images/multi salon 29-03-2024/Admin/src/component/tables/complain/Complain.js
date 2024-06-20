/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import Button from "../../extras/Button";
import Table from "../../extras/Table";
import Pagination from "../../extras/Pagination";
import ToggleSwitch from "../../extras/ToggleSwitch";
import { openDialog } from "../../../redux/slice/dialogueSlice";
import Title from "../../extras/Title";
import {
  getAllCategory,
  categoryDelete,
  categoryStatus,
} from "../../../redux/slice/categorySlice";
import {  warning } from "../../utils/Alert";
import {
  getComplains,
  solveComplain,
} from "../../../redux/slice/complainSlice";
import noImage from "../../../assets/images/noImage.png";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Analytics from "../../extras/Analytics";
import ComplainDialog from "./ComplainDialog";

const Complain = () => {
  const { complain, total } = useSelector((state) => state.complain);
  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [type, setType] = useState(2);
  const [person, setPerson] = useState(1);
  
  const payload = {
    start: page,
    limit: rowsPerPage,
    type,
    person,
  };

  useEffect(() => {
    dispatch(getComplains(payload));
  }, [page, rowsPerPage, type, person]);

  useEffect(() => {
    setData(complain);
  }, [complain]);

  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };

  function openImage(imageUrl) {
    // Open the image in a new tab or window
    window.open(imageUrl, "_blank");
  }

  const userTable = [
    {
      Header: "No",
      Cell: ({ index }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      ),
    },
    {
      Header: "Image",
      Cell: ({ row }) => (
        <div className="userProfile">
          <img
            src={row?.image ? row?.image : row?.image == "" ? noImage : noImage}
            alt="image"
            className="cursor-pointer"
            style={{ height: "70px", width: "70px", overflow: "hidden" }}
            onClick={() => openImage(row?.image)}
            height={`100%`}
          />
        </div>
      ),
    },
    {
      Header: "BookingId",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold">
          {row?.bookingId ? row?.bookingId : "-"}
        </span>
      ),
    },
    {
      Header: "User Name",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold">
          {row?.userId?.fname
            ? row?.userId.fname + " " + row?.userId.lname
            : "Salon User"}
        </span>
      ),
    },
    {
      Header: "Details",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold">{row?.details}</span>
      ),
    },
    {
      Header: "Date",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.date ? row?.date?.split(",")[0] : "-"}
        </span>
      ),
    },
    {
      Header: "Time",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.date ? row?.date?.split(",")[1] : "-"}
        </span>
      ),
    },
    {
      Header: "Status",
      Cell: ({ row }) => (
        <span>
          {row?.type == 0 && (
            <button
              className=" not-allowed text-white p10-x p4-y fs-12 br-5"
              style={{ backgroundColor: "#ff7512" }}
            >
              Pending
            </button>
          )}
          {row?.type == 1 && (
            <button className="bg-danger not-allowed text-white p10-x p4-y fs-12 br-5">
              Solved
            </button>
          )}
        </span>
      ),
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <span>
          <button
            className="py-1 me-2"
            style={{ backgroundColor: "#CDE7FF", borderRadius: "8px" }}
            onClick={() =>
              dispatch(openDialog({ type: "complain", data: row }))
            }
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9996 3C7.47746 3 3 7.47746 3 12.9996C3 18.5217 7.47746 23 12.9996 23C18.5217 23 23 18.5217 23 12.9996C23 7.47746 18.5217 3 12.9996 3ZM15.0813 18.498C14.5666 18.7012 14.1568 18.8552 13.8495 18.9619C13.5048 19.0745 13.1437 19.1286 12.7812 19.1219C12.1581 19.1219 11.673 18.9695 11.3276 18.6656C10.9822 18.3617 10.8104 17.9765 10.8104 17.5084C10.8104 17.3263 10.8231 17.1401 10.8485 16.9505C10.8799 16.7345 10.9214 16.52 10.9729 16.3079L11.6171 14.0324C11.6739 13.814 11.723 13.6066 11.7619 13.4135C11.8008 13.2188 11.8195 13.0402 11.8195 12.8777C11.8195 12.5881 11.7594 12.385 11.64 12.2707C11.5189 12.1564 11.2912 12.1005 10.9517 12.1005C10.7858 12.1005 10.6148 12.1251 10.4396 12.1767C10.266 12.2301 10.1153 12.2783 9.99175 12.3257L10.1619 11.6248C10.5835 11.4529 10.9873 11.3056 11.3725 11.1837C11.7247 11.0659 12.0932 11.0036 12.4646 10.9992C13.0834 10.9992 13.5608 11.1498 13.8969 11.4478C14.2313 11.7467 14.3998 12.1352 14.3998 12.6127C14.3998 12.7117 14.3879 12.8861 14.3651 13.135C14.3452 13.3676 14.3021 13.5976 14.2364 13.8216L13.5956 16.0904C13.5381 16.2956 13.4909 16.5035 13.4542 16.7134C13.4193 16.8881 13.3986 17.0654 13.3924 17.2434C13.3924 17.5448 13.4593 17.7505 13.5947 17.8597C13.7285 17.9689 13.963 18.0239 14.2948 18.0239C14.4514 18.0239 14.6267 17.996 14.8248 17.9418C15.0212 17.8876 15.1634 17.8394 15.2531 17.7979L15.0813 18.498ZM14.9678 9.2891C14.6764 9.56388 14.2889 9.71343 13.8885 9.70561C13.4686 9.70561 13.1062 9.56677 12.8049 9.2891C12.6615 9.16303 12.5471 9.00757 12.4692 8.8333C12.3913 8.65902 12.3519 8.47002 12.3537 8.27915C12.3537 7.8855 12.506 7.54688 12.8049 7.26667C13.0969 6.9897 13.4861 6.83859 13.8885 6.84593C14.3092 6.84593 14.6698 6.98561 14.9678 7.26667C15.2667 7.54688 15.4165 7.8855 15.4165 8.27915C15.4165 8.6745 15.2667 9.01143 14.9678 9.2891Z"
                fill="#0C7FE9"
              />
            </svg>
          </button>
          {row?.type == 0 && (
            <button
              className="bg-danger text-light p10-x p4-y fs-12 br-5"
              onClick={() => solveComplains(row?._id)}
            >
              Solve
            </button>
          )}
        </span>
      ),
    },
  ];

  const expertTable = [
    {
      Header: "No",
      Cell: ({ index }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      ),
    },
    {
      Header: "Image",
      Cell: ({ row }) => (
        <div className="userProfile">
          <img
            src={row?.image ? row?.image : row?.image == "" ? noImage : noImage}
            style={{ height: "70px", width: "70px", overflow: "hidden" }}
            alt="image"
            className="cursor-pointer"
            onClick={() => openImage(row?.image)}
            height={`100%`}
          />
        </div>
      ),
    },
    {
      Header: "BookingId",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold">
          {row?.bookingId ? row?.bookingId : "-"}
        </span>
      ),
    },
    {
      Header: "Expert Name",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold">
          {row?.expertId
            ? row?.expertId.fname + " " + row?.expertId.lname
            : "-"}
        </span>
      ),
    },
    {
      Header: "Details",
      Cell: ({ row }) => (
        <span className="text-capitalize fw-bold">{row?.details}</span>
      ),
    },
    {
      Header: "Date",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.date ? row?.date?.split(",")[0] : "-"}
        </span>
      ),
    },
    {
      Header: "Time",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.date ? row?.date?.split(",")[1] : "-"}
        </span>
      ),
    },
    {
      Header: "Status",
      Cell: ({ row }) => (
        <span>
          {row?.type == 0 && (
            <button
              className=" text-white p10-x p4-y fs-12 br-5"
              style={{ backgroundColor: "#ff7512" }}
            >
              Pending
            </button>
          )}
          {row?.type == 1 && (
            <button className="bg-danger text-white p10-x p4-y fs-12 br-5">
              Solved
            </button>
          )}
        </span>
      ),
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <span>
          <button
            className="py-1 me-2"
            style={{ backgroundColor: "#CDE7FF", borderRadius: "8px" }}
            onClick={() =>
              dispatch(openDialog({ type: "complain", data: row }))
            }
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9996 3C7.47746 3 3 7.47746 3 12.9996C3 18.5217 7.47746 23 12.9996 23C18.5217 23 23 18.5217 23 12.9996C23 7.47746 18.5217 3 12.9996 3ZM15.0813 18.498C14.5666 18.7012 14.1568 18.8552 13.8495 18.9619C13.5048 19.0745 13.1437 19.1286 12.7812 19.1219C12.1581 19.1219 11.673 18.9695 11.3276 18.6656C10.9822 18.3617 10.8104 17.9765 10.8104 17.5084C10.8104 17.3263 10.8231 17.1401 10.8485 16.9505C10.8799 16.7345 10.9214 16.52 10.9729 16.3079L11.6171 14.0324C11.6739 13.814 11.723 13.6066 11.7619 13.4135C11.8008 13.2188 11.8195 13.0402 11.8195 12.8777C11.8195 12.5881 11.7594 12.385 11.64 12.2707C11.5189 12.1564 11.2912 12.1005 10.9517 12.1005C10.7858 12.1005 10.6148 12.1251 10.4396 12.1767C10.266 12.2301 10.1153 12.2783 9.99175 12.3257L10.1619 11.6248C10.5835 11.4529 10.9873 11.3056 11.3725 11.1837C11.7247 11.0659 12.0932 11.0036 12.4646 10.9992C13.0834 10.9992 13.5608 11.1498 13.8969 11.4478C14.2313 11.7467 14.3998 12.1352 14.3998 12.6127C14.3998 12.7117 14.3879 12.8861 14.3651 13.135C14.3452 13.3676 14.3021 13.5976 14.2364 13.8216L13.5956 16.0904C13.5381 16.2956 13.4909 16.5035 13.4542 16.7134C13.4193 16.8881 13.3986 17.0654 13.3924 17.2434C13.3924 17.5448 13.4593 17.7505 13.5947 17.8597C13.7285 17.9689 13.963 18.0239 14.2948 18.0239C14.4514 18.0239 14.6267 17.996 14.8248 17.9418C15.0212 17.8876 15.1634 17.8394 15.2531 17.7979L15.0813 18.498ZM14.9678 9.2891C14.6764 9.56388 14.2889 9.71343 13.8885 9.70561C13.4686 9.70561 13.1062 9.56677 12.8049 9.2891C12.6615 9.16303 12.5471 9.00757 12.4692 8.8333C12.3913 8.65902 12.3519 8.47002 12.3537 8.27915C12.3537 7.8855 12.506 7.54688 12.8049 7.26667C13.0969 6.9897 13.4861 6.83859 13.8885 6.84593C14.3092 6.84593 14.6698 6.98561 14.9678 7.26667C15.2667 7.54688 15.4165 7.8855 15.4165 8.27915C15.4165 8.6745 15.2667 9.01143 14.9678 9.2891Z"
                fill="#0C7FE9"
              />
            </svg>
          </button>
          {row?.type == 0 && (
            <button
              className="bg-danger text-light p10-x p4-y fs-12 br-5"
              onClick={() => solveComplains(row?._id)}
            >
              Solve
            </button>
          )}
        </span>
      ),
    },
  ];

  const complainType = [
    { name: "PENDING", value: 0 },
    { name: "SOLVED", value: 1 },
  ];

  const solveComplains = async (id) => {
    
    await dispatch(solveComplain(id));
    window.location.reload();
  };

  return (
    <div className="mainCategory">
      <Title name={"Complain"} />

      <div className="row mb-2">
        <div className="d-flex col-10 mt-auto mb-0">
          <div
            className="my-2"
            style={{
              width: "329px",
              border: "1px solid #1c2b20",
              padding: "4px",
              borderRadius: "40px",
            }}
          >
            <button
              type="button"
              className={`${person === 1 ? "activeBtn" : "disabledBtn"}`}
              onClick={() => setPerson(1)}
            >
              User Complain
            </button>
            <button
              type="button"
              className={`${
                person === 0 ? "activeBtn" : "disabledBtn"
              } ms-1`}
              onClick={() => setPerson(0)}

            >
              Expert Complain
            </button>
          </div>
        
        </div>
        <div className="col-2">
          <div className="inputData">
            <label className="styleForTitle" htmlFor="bookingType">
              Complain Type
            </label>
            <select
              name="bookingType"
              className="rounded-2 fw-bold"
              id="bookingType"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value={2} selected>
                ALL
              </option>
              {complainType?.map((data) => {
                return <option value={data?.value}>{data?.name}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <div>
        <Table
          data={data}
          mapData={person == 0 ? expertTable : userTable}
          PerPage={rowsPerPage}
          Page={page}
          type={"server"}
        />
        <Pagination
          type={"server"}
          serverPage={page}
          setServerPage={setPage}
          serverPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          totalData={total}
        />
      </div>
      {dialogue && dialogueType === "complain" && (
        <ComplainDialog setData={setData} data={data} />
      )}
    </div>
  );
};

export default Complain;
