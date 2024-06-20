/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */

import { openDialog } from "../../redux/slice/dialogueSlice";
import { getPayout } from "../../redux/slice/payoutSlice";
import {  warning } from "../utils/Alert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../extras/Title";
import Button from "../extras/Button";
import Table from "../extras/Table";
import Pagination from "../extras/Pagination";

import {
  Salonpayment,
  getSalary,
  getSalonEarning,
  payment,
} from "../../redux/slice/salarySlice";
import BonusPenaltyDialog from "./BonusPenaltyDialog";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Analytics from "../extras/Analytics";

const SalonEarning = () => {
  const { salary, total } = useSelector((state) => state.salary);
  const [data, setData] = useState([]);

  const { dialogue, dialogueType } = useSelector((state) => state.dialogue);

  const { setting } = useSelector((state) => state.setting);

  const startOfMonth = moment().startOf("month").toDate();
  const endOfMonth = moment().endOf("month").toDate();
  const dDate = moment(startOfMonth).format("YYYY-MM-DD");
  const d2Date = moment(endOfMonth).format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(dDate);
  const [endDate, setEndDate] = useState(d2Date);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [type, setType] = useState("ALL");
  const navigate = useNavigate();
  const thisMonth = new Date();
  thisMonth.setDate(1);
  const [selectedDate, setSelectedDate] = useState(thisMonth);
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      start: page,
      limit: rowsPerPage,
      startDate: startDate,
      endDate: endDate,
    };
    dispatch(getSalonEarning(payload));
  }, [page, rowsPerPage, startDate, endDate]);

  useEffect(() => {
    setData(salary);
  }, [salary]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event, 10));
    setPage(0);
  };

  function openHistory(id) {
    navigate("/salonPanel/expert/income", {
      state: {
        id,
      },
    });
  }

  const mapData = [
    {
      Header: "No",
      Cell: ({ index }) => (
        <span>{page * rowsPerPage + parseInt(index) + 1}</span>
      ),
    },

    {
      Header: "Total Bookings",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.bookingId?.length == 0 ? 0 : row?.bookingId?.length}
        </span>
      ),
    },
    {
      Header: "Salon Commission (%)",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.salonCommissionPercent == 0 ? 0 : row?.salonCommissionPercent}
        </span>
      ),
    },

    {
      Header: `Salon Earning `,
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.salonEarning == 0
            ? 0 + " " + setting?.currencySymbol
            : row?.salonEarning + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: `Total Earning `,
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.finalAmount + " " + setting?.currencySymbol}
        </span>
      ),
    },

    {
      Header: `Bonus/Penalty `,
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.bonus + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: `Final Amount`,
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.finalAmount + " " + setting?.currencySymbol}
        </span>
      ),
    },
    {
      Header: "Payment Date",
      Cell: ({ row }) => (
        <span className="text-capitalize">
          {row?.paymentDate ? row?.paymentDate : "Pending"}
        </span>
      ),
    },
    {
      Header: "Info",
      Cell: ({ row }) => (
        <span>
          <button
            className="py-1"
            style={{ backgroundColor: "#CDE7FF", borderRadius: "8px" }}
            onClick={() => handleInfoSettlement(row)}
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
        </span>
      ),
    },
  ];

  const handleInfoSettlement = (row) => {
    navigate("/salonPanel/settlementInfo", {
      state: {
        row,
      },
    });
  };

  const handlePayment = (row) => {
    const ids = row?.originalIds ? row?.originalIds?.join(",") : "";
    const payload = {
      expertId: row.expertId._id,
      month: row.month,
      data: {
        amount: row?.totalExpertEarning + row?.bonus?.bonus_penalty,
        bonus_penalty: row?.bonus?.bonus_penalty,
        serviceAmount: row?.totalExpertEarning,
        month: row?.month,
        expertId: row?.expertId?._id,
        paymentMethod: row?.expertId?.paymentType,
        note: row?.bonus?.note,
        settlementId: ids,
        bookings: row?.totalExpertEarning == 0 ? 0 : row?.count,
      },
    };
    dispatch(Salonpayment(payload));
  };

  const types = [
    { name: "Pending", value: "unpaid" },
    { name: "Paid", value: "paid" },
  ];

  return (
    <div className="mainCategory">
      {dialogue && dialogueType === "bonus" && <BonusPenaltyDialog />}
      <Title name="Salon Earnings" />
      <div className="d-flex">
        <div className="m20-bottom inputData col-lg-2 col-md-4 me-3">
          <label>Select Date</label>
          <Analytics
            analyticsStartDate={startDate}
            analyticsStartEnd={endDate}
            analyticsStartDateSet={setStartDate}
            analyticsStartEndSet={setEndDate}
            allAllow={false}
          />
        </div>
      </div>
      <div>
        <Table
          data={data}
          mapData={mapData}
          serverPerPage={rowsPerPage}
          // PerPage={rowsPerPage}
          Page={page}
          // type={"server"}
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
    </div>
  );
};

export default SalonEarning;
