import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { GlobalContext } from "../../Context";
import axios from "axios";
import Person2SharpIcon from "@mui/icons-material/Person2Sharp";
import "./setting.css";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const currencies = [
  {
    label: "Afghan Afghani",
    value: "AFA",
  },
  {
    label: "Albanian Lek",
    value: "ALL",
  },
  {
    label: "Algerian Dinar",
    value: "DZD",
  },
  {
    label: "Angolan Kwanza",
    value: "AOA",
  },
  {
    label: "Argentine Peso",
    value: "ARS",
  },
  {
    label: "Armenian Dram",
    value: "AMD",
  },
  {
    label: "Aruban Florin",
    value: "AWG",
  },
  {
    label: "Australian Dollar",
    value: "AUD",
  },
  {
    label: "Azerbaijani Manat",
    value: "AZN",
  },
  {
    label: "Bahamian Dollar",
    value: "BSD",
  },
  {
    label: "Bahraini Dinar",
    value: "BHD",
  },
  {
    label: "Bangladeshi Taka",
    value: "BDT",
  },
  {
    label: "Barbadian Dollar",
    value: "BBD",
  },
  {
    label: "Belarusian Ruble",
    value: "BYR",
  },
  {
    label: "Belgian Franc",
    value: "BEF",
  },
  {
    label: "Belize Dollar",
    value: "BZD",
  },
  {
    label: "Bermudan Dollar",
    value: "BMD",
  },
  {
    label: "Bhutanese Ngultrum",
    value: "BTN",
  },
  {
    label: "Bitcoin",
    value: "BTC",
  },
  {
    label: "Bolivian Boliviano",
    value: "BOB",
  },
  {
    label: "Bosnia-Herzegovina Convertible Mark",
    value: "BAM",
  },
  {
    label: "Botswanan Pula",
    value: "BWP",
  },
  {
    label: "Brazilian Real",
    value: "BRL",
  },
  {
    label: "British Pound Sterling",
    value: "GBP",
  },
  {
    label: "Brunei Dollar",
    value: "BND",
  },
  {
    label: "Bulgarian Lev",
    value: "BGN",
  },
  {
    label: "Burundian Franc",
    value: "BIF",
  },
  {
    label: "Cambodian Riel",
    value: "KHR",
  },
  {
    label: "Canadian Dollar",
    value: "CAD",
  },
  {
    label: "Cape Verdean Escudo",
    value: "CVE",
  },
  {
    label: "Cayman Islands Dollar",
    value: "KYD",
  },
  {
    label: "CFA Franc BCEAO",
    value: "XOF",
  },
  {
    label: "CFA Franc BEAC",
    value: "XAF",
  },
  {
    label: "CFP Franc",
    value: "XPF",
  },
  {
    label: "Chilean Peso",
    value: "CLP",
  },
  {
    label: "Chinese Yuan",
    value: "CNY",
  },
  {
    label: "Colombian Peso",
    value: "COP",
  },
  {
    label: "Comorian Franc",
    value: "KMF",
  },
  {
    label: "Congolese Franc",
    value: "CDF",
  },
  {
    label: "Costa Rican ColÃ³n",
    value: "CRC",
  },
  {
    label: "Croatian Kuna",
    value: "HRK",
  },
  {
    label: "Cuban Convertible Peso",
    value: "CUC",
  },
  {
    label: "Czech Republic Koruna",
    value: "CZK",
  },
  {
    label: "Danish Krone",
    value: "DKK",
  },
  {
    label: "Djiboutian Franc",
    value: "DJF",
  },
  {
    label: "Dominican Peso",
    value: "DOP",
  },
  {
    label: "East Caribbean Dollar",
    value: "XCD",
  },
  {
    label: "Egyptian Pound",
    value: "EGP",
  },
  {
    label: "Eritrean Nakfa",
    value: "ERN",
  },
  {
    label: "Estonian Kroon",
    value: "EEK",
  },
  {
    label: "Ethiopian Birr",
    value: "ETB",
  },
  {
    label: "Euro",
    value: "EUR",
  },
  {
    label: "Falkland Islands Pound",
    value: "FKP",
  },
  {
    label: "Fijian Dollar",
    value: "FJD",
  },
  {
    label: "Gambian Dalasi",
    value: "GMD",
  },
  {
    label: "Georgian Lari",
    value: "GEL",
  },
  {
    label: "German Mark",
    value: "DEM",
  },
  {
    label: "Ghanaian Cedi",
    value: "GHS",
  },
  {
    label: "Gibraltar Pound",
    value: "GIP",
  },
  {
    label: "Greek Drachma",
    value: "GRD",
  },
  {
    label: "Guatemalan Quetzal",
    value: "GTQ",
  },
  {
    label: "Guinean Franc",
    value: "GNF",
  },
  {
    label: "Guyanaese Dollar",
    value: "GYD",
  },
  {
    label: "Haitian Gourde",
    value: "HTG",
  },
  {
    label: "Honduran Lempira",
    value: "HNL",
  },
  {
    label: "Hong Kong Dollar",
    value: "HKD",
  },
  {
    label: "Hungarian Forint",
    value: "HUF",
  },
  {
    label: "Icelandic KrÃ³na",
    value: "ISK",
  },
  {
    label: "Indian Rupee",
    value: "INR",
  },
  {
    label: "Indonesian Rupiah",
    value: "IDR",
  },
  {
    label: "Iranian Rial",
    value: "IRR",
  },
  {
    label: "Iraqi Dinar",
    value: "IQD",
  },
  {
    label: "Israeli New Sheqel",
    value: "ILS",
  },
  {
    label: "Italian Lira",
    value: "ITL",
  },
  {
    label: "Jamaican Dollar",
    value: "JMD",
  },
  {
    label: "Japanese Yen",
    value: "JPY",
  },
  {
    label: "Jordanian Dinar",
    value: "JOD",
  },
  {
    label: "Kazakhstani Tenge",
    value: "KZT",
  },
  {
    label: "Kenyan Shilling",
    value: "KES",
  },
  {
    label: "Kuwaiti Dinar",
    value: "KWD",
  },
  {
    label: "Kyrgystani Som",
    value: "KGS",
  },
  {
    label: "Laotian Kip",
    value: "LAK",
  },
  {
    label: "Latvian Lats",
    value: "LVL",
  },
  {
    label: "Lebanese Pound",
    value: "LBP",
  },
  {
    label: "Lesotho Loti",
    value: "LSL",
  },
  {
    label: "Liberian Dollar",
    value: "LRD",
  },
  {
    label: "Libyan Dinar",
    value: "LYD",
  },
  {
    label: "Lithuanian Litas",
    value: "LTL",
  },
  {
    label: "Macanese Pataca",
    value: "MOP",
  },
  {
    label: "Macedonian Denar",
    value: "MKD",
  },
  {
    label: "Malagasy Ariary",
    value: "MGA",
  },
  {
    label: "Malawian Kwacha",
    value: "MWK",
  },
  {
    label: "Malaysian Ringgit",
    value: "MYR",
  },
  {
    label: "Maldivian Rufiyaa",
    value: "MVR",
  },
  {
    label: "Mauritanian Ouguiya",
    value: "MRO",
  },
  {
    label: "Mauritian Rupee",
    value: "MUR",
  },
  {
    label: "Mexican Peso",
    value: "MXN",
  },
  {
    label: "Moldovan Leu",
    value: "MDL",
  },
  {
    label: "Mongolian Tugrik",
    value: "MNT",
  },
  {
    label: "Moroccan Dirham",
    value: "MAD",
  },
  {
    label: "Mozambican Metical",
    value: "MZM",
  },
  {
    label: "Myanmar Kyat",
    value: "MMK",
  },
  {
    label: "Namibian Dollar",
    value: "NAD",
  },
  {
    label: "Nepalese Rupee",
    value: "NPR",
  },
  {
    label: "Netherlands Antillean Guilder",
    value: "ANG",
  },
  {
    label: "New Taiwan Dollar",
    value: "TWD",
  },
  {
    label: "New Zealand Dollar",
    value: "NZD",
  },
  {
    label: "Nicaraguan CÃ³rdoba",
    value: "NIO",
  },
  {
    label: "Nigerian Naira",
    value: "NGN",
  },
  {
    label: "North Korean Won",
    value: "KPW",
  },
  {
    label: "Norwegian Krone",
    value: "NOK",
  },
  {
    label: "Omani Rial",
    value: "OMR",
  },
  {
    label: "Pakistani Rupee",
    value: "PKR",
  },
  {
    label: "Panamanian Balboa",
    value: "PAB",
  },
  {
    label: "Papua New Guinean Kina",
    value: "PGK",
  },
  {
    label: "Paraguayan Guarani",
    value: "PYG",
  },
  {
    label: "Peruvian Nuevo Sol",
    value: "PEN",
  },
  {
    label: "Philippine Peso",
    value: "PHP",
  },
  {
    label: "Polish Zloty",
    value: "PLN",
  },
  {
    label: "Qatari Rial",
    value: "QAR",
  },
  {
    label: "Romanian Leu",
    value: "RON",
  },
  {
    label: "Russian Ruble",
    value: "RUB",
  },
  {
    label: "Rwandan Franc",
    value: "RWF",
  },
  {
    label: "Salvadoran ColÃ³n",
    value: "SVC",
  },
  {
    label: "Samoan Tala",
    value: "WST",
  },
  {
    label: "Saudi Riyal",
    value: "SAR",
  },
  {
    label: "Serbian Dinar",
    value: "RSD",
  },
  {
    label: "Seychellois Rupee",
    value: "SCR",
  },
  {
    label: "Sierra Leonean Leone",
    value: "SLL",
  },
  {
    label: "Singapore Dollar",
    value: "SGD",
  },
  {
    label: "Slovak Koruna",
    value: "SKK",
  },
  {
    label: "Solomon Islands Dollar",
    value: "SBD",
  },
  {
    label: "Somali Shilling",
    value: "SOS",
  },
  {
    label: "South African Rand",
    value: "ZAR",
  },
  {
    label: "South Korean Won",
    value: "KRW",
  },
  {
    label: "Special Drawing Rights",
    value: "XDR",
  },
  {
    label: "Sri Lankan Rupee",
    value: "LKR",
  },
  {
    label: "St. Helena Pound",
    value: "SHP",
  },
  {
    label: "Sudanese Pound",
    value: "SDG",
  },
  {
    label: "Surinamese Dollar",
    value: "SRD",
  },
  {
    label: "Swazi Lilangeni",
    value: "SZL",
  },
  {
    label: "Swedish Krona",
    value: "SEK",
  },
  {
    label: "Swiss Franc",
    value: "CHF",
  },
  {
    label: "Syrian Pound",
    value: "SYP",
  },
  {
    label: "São Tomé and Príncipe Dobra",
    value: "STD",
  },
  {
    label: "Tajikistani Somoni",
    value: "TJS",
  },
  {
    label: "Tanzanian Shilling",
    value: "TZS",
  },
  {
    label: "Thai Baht",
    value: "THB",
  },
  {
    label: "Tongan Pa'anga",
    value: "TOP",
  },
  {
    label: "Trinidad & Tobago Dollar",
    value: "TTD",
  },
  {
    label: "Tunisian Dinar",
    value: "TND",
  },
  {
    label: "Turkish Lira",
    value: "TRY",
  },
  {
    label: "Turkmenistani Manat",
    value: "TMT",
  },
  {
    label: "Ugandan Shilling",
    value: "UGX",
  },
  {
    label: "Ukrainian Hryvnia",
    value: "UAH",
  },
  {
    label: "United Arab Emirates Dirham",
    value: "AED",
  },
  {
    label: "Uruguayan Peso",
    value: "UYU",
  },
  {
    label: "US Dollar",
    value: "USD",
  },
  {
    label: "Uzbekistan Som",
    value: "UZS",
  },
  {
    label: "Vanuatu Vatu",
    value: "VUV",
  },
  {
    label: "Venezuelan BolÃvar",
    value: "VEF",
  },
  {
    label: "Vietnamese Dong",
    value: "VND",
  },
  {
    label: "Yemeni Rial",
    value: "YER",
  },
  {
    label: "Zambian Kwacha",
    value: "ZMK",
  },
];

const timeies = [
  {
    offset: "GMT-12:00",
    name: "Etc/GMT-12",
  },
  {
    offset: "GMT-11:00",
    name: "Etc/GMT-11",
  },
  {
    offset: "GMT-11:00",
    name: "Pacific/Midway",
  },
  {
    offset: "GMT-10:00",
    name: "America/Adak",
  },
  {
    offset: "GMT-09:00",
    name: "America/Anchorage",
  },
  {
    offset: "GMT-09:00",
    name: "Pacific/Gambier",
  },
  {
    offset: "GMT-08:00",
    name: "America/Dawson_Creek",
  },
  {
    offset: "GMT-08:00",
    name: "America/Ensenada",
  },
  {
    offset: "GMT-08:00",
    name: "America/Los_Angeles",
  },
  {
    offset: "GMT-07:00",
    name: "America/Chihuahua",
  },
  {
    offset: "GMT-07:00",
    name: "America/Denver",
  },
  {
    offset: "GMT-06:00",
    name: "America/Belize",
  },
  {
    offset: "GMT-06:00",
    name: "America/Cancun",
  },
  {
    offset: "GMT-06:00",
    name: "America/Chicago",
  },
  {
    offset: "GMT-06:00",
    name: "Chile/EasterIsland",
  },
  {
    offset: "GMT-05:00",
    name: "America/Bogota",
  },
  {
    offset: "GMT-05:00",
    name: "America/Havana",
  },
  {
    offset: "GMT-05:00",
    name: "America/New_York",
  },
  {
    offset: "GMT-04:30",
    name: "America/Caracas",
  },
  {
    offset: "GMT-04:00",
    name: "America/Campo_Grande",
  },
  {
    offset: "GMT-04:00",
    name: "America/Glace_Bay",
  },
  {
    offset: "GMT-04:00",
    name: "America/Goose_Bay",
  },
  {
    offset: "GMT-04:00",
    name: "America/Santiago",
  },
  {
    offset: "GMT-04:00",
    name: "America/La_Paz",
  },
  {
    offset: "GMT-03:00",
    name: "America/Argentina/Buenos_Aires",
  },
  {
    offset: "GMT-03:00",
    name: "America/Montevideo",
  },
  {
    offset: "GMT-03:00",
    name: "America/Araguaina",
  },
  {
    offset: "GMT-03:00",
    name: "America/Godthab",
  },
  {
    offset: "GMT-03:00",
    name: "America/Miquelon",
  },
  {
    offset: "GMT-03:00",
    name: "America/Sao_Paulo",
  },
  {
    offset: "GMT-03:30",
    name: "America/St_Johns",
  },
  {
    offset: "GMT-02:00",
    name: "America/Noronha",
  },
  {
    offset: "GMT-01:00",
    name: "Atlantic/Cape_Verde",
  },
  {
    offset: "GMT",
    name: "Europe/Belfast",
  },
  {
    offset: "GMT",
    name: "Africa/Abidjan",
  },
  {
    offset: "GMT",
    name: "Europe/Dublin",
  },
  {
    offset: "GMT",
    name: "Europe/Lisbon",
  },
  {
    offset: "GMT",
    name: "Europe/London",
  },
  {
    offset: "UTC",
    name: "UTC",
  },
  {
    offset: "GMT+01:00",
    name: "Africa/Algiers",
  },
  {
    offset: "GMT+01:00",
    name: "Africa/Windhoek",
  },
  {
    offset: "GMT+01:00",
    name: "Atlantic/Azores",
  },
  {
    offset: "GMT+01:00",
    name: "Atlantic/Stanley",
  },
  {
    offset: "GMT+01:00",
    name: "Europe/Amsterdam",
  },
  {
    offset: "GMT+01:00",
    name: "Europe/Belgrade",
  },
  {
    offset: "GMT+01:00",
    name: "Europe/Brussels",
  },
  {
    offset: "GMT+02:00",
    name: "Africa/Cairo",
  },
  {
    offset: "GMT+02:00",
    name: "Africa/Blantyre",
  },
  {
    offset: "GMT+02:00",
    name: "Asia/Beirut",
  },
  {
    offset: "GMT+02:00",
    name: "Asia/Damascus",
  },
  {
    offset: "GMT+02:00",
    name: "Asia/Gaza",
  },
  {
    offset: "GMT+02:00",
    name: "Asia/Jerusalem",
  },
  {
    offset: "GMT+03:00",
    name: "Africa/Addis_Ababa",
  },
  {
    offset: "GMT+03:00",
    name: "Asia/Riyadh89",
  },
  {
    offset: "GMT+03:00",
    name: "Europe/Minsk",
  },
  {
    offset: "GMT+03:30",
    name: "Asia/Tehran",
  },
  {
    offset: "GMT+04:00",
    name: "Asia/Dubai",
  },
  {
    offset: "GMT+04:00",
    name: "Asia/Yerevan",
  },
  {
    offset: "GMT+04:00",
    name: "Europe/Moscow",
  },
  {
    offset: "GMT+04:30",
    name: "Asia/Kabul",
  },
  {
    offset: "GMT+05:00",
    name: "Asia/Tashkent",
  },
  {
    offset: "GMT+05:30",
    name: "Asia/Kolkata",
  },
  {
    offset: "GMT+05:45",
    name: "Asia/Katmandu",
  },
  {
    offset: "GMT+06:00",
    name: "Asia/Dhaka",
  },
  {
    offset: "GMT+06:00",
    name: "Asia/Yekaterinburg",
  },
  {
    offset: "GMT+06:30",
    name: "Asia/Rangoon",
  },
  {
    offset: "GMT+07:00",
    name: "Asia/Bangkok",
  },
  {
    offset: "GMT+07:00",
    name: "Asia/Novosibirsk",
  },
  {
    offset: "GMT+08:00",
    name: "Etc/GMT+8",
  },
  {
    offset: "GMT+08:00",
    name: "Asia/Hong_Kong",
  },
  {
    offset: "GMT+08:00",
    name: "Asia/Krasnoyarsk",
  },
  {
    offset: "GMT+08:00",
    name: "Australia/Perth",
  },
  {
    offset: "GMT+08:45",
    name: "Australia/Eucla",
  },
  {
    offset: "GMT+09:00",
    name: "Asia/Irkutsk",
  },
  {
    offset: "GMT+09:00",
    name: "Asia/Seoul",
  },
  {
    offset: "GMT+09:00",
    name: "Asia/Tokyo",
  },
  {
    offset: "GMT+09:30",
    name: "Australia/Adelaide",
  },
  {
    offset: "GMT+09:30",
    name: "Australia/Darwin",
  },
  {
    offset: "GMT+09:30",
    name: "Pacific/Marquesas",
  },
  {
    offset: "GMT+10:00",
    name: "Etc/GMT+10",
  },
  {
    offset: "GMT+10:00",
    name: "Australia/Brisbane",
  },
  {
    offset: "GMT+10:00",
    name: "Australia/Hobart",
  },
  {
    offset: "GMT+10:00",
    name: "Asia/Yakutsk",
  },
  {
    offset: "GMT+10:30",
    name: "Australia/Lord_Howe",
  },
  {
    offset: "GMT+11:00",
    name: "Asia/Vladivostok",
  },
  {
    offset: "GMT+11:30",
    name: "Pacific/Norfolk",
  },
  {
    offset: "GMT+12:00",
    name: "Etc/GMT+12",
  },
  {
    offset: "GMT+12:00",
    name: "Asia/Anadyr",
  },
  {
    offset: "GMT+12:00",
    name: "Asia/Magadan",
  },
  {
    offset: "GMT+12:00",
    name: "Pacific/Auckland",
  },
  {
    offset: "GMT+12:45",
    name: "Pacific/Chatham",
  },
  {
    offset: "GMT+13:00",
    name: "Pacific/Tongatapu",
  },
  {
    offset: "GMT+14:00",
    name: "Pacific/Kiritimati",
  },
];

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Irfan Library Management Website ❤️
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Setting = () => {
  let { state, dispatch } = useContext(GlobalContext);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [uid, setuid] = useState(state.user.data._id);
  const [seetings, setseetings] = useState({});

  useEffect(() => {
    const getSetting = async () => {
      try {
        let response = await axios({
          url: `${state.baseUrl}/settings/${state?.user?._id}`,
          method: "get",
          withCredentials: true,
        });
        if (response.status === 200) {
          setseetings(response?.data);
        } else {
          console.log("error in api call");
        }
      } catch (e) {
        console.log("Error in api", e);
      }
    };
    getSetting();
  }, []);

  const formik = useFormik({
    initialValues: {
      libraryName: seetings?.libraryName ? seetings?.libraryName : "",
      address: seetings?.address ? seetings?.address : "",
      contactNo: seetings?.contactNo ? seetings?.contactNo : "",
      emailaddress: seetings?.emailaddress ? seetings?.emailaddress : "",
      currency: seetings?.currency ? seetings?.currency : "",
      timezone: seetings?.timezone ? seetings?.timezone : "",
      bookReturnDayLimit: seetings?.bookReturnDayLimit
        ? seetings?.bookReturnDayLimit
        : "",
      bookLateReturnOneDayFine: seetings?.bookLateReturnOneDayFine
        ? seetings?.bookLateReturnOneDayFine
        : "",
      perUserBookIssueLimit: seetings?.perUserBookIssueLimit
        ? seetings?.perUserBookIssueLimit
        : "",
    },
    validationSchema: yup.object({
      libraryName: yup
        .string("Enter your libraryName")
        .required("libraryName is required"),
      address: yup.string("Enter your address").required("address is required"),
      contactNo: yup.string("Enter your number").required("number is required"),
      emailaddress: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
      bookReturnDayLimit: yup
        .string("Enter your BookReturnDayLimit")
        .required("BookReturnDayLimit is required"),
      bookLateReturnOneDayFine: yup
        .string("Enter your BookLateReturnOneDayFine")
        .required("BookLateReturnOneDayFine is required"),
      perUserBookIssueLimit: yup
        .string("Enter your PerUserBookIssueLimit")
        .required("PerUserBookIssueLimit is required"),
    }),

    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (seetings === null) {
        axios({
          method: "post",
          url: `${state.baseUrl}/setting`,
          data: {
            libraryName: values?.libraryName,
            address: values?.address,
            contactNo: values?.contactNo,
            emailaddress: values.emailaddress,
            bookReturnDayLimit: values?.bookReturnDayLimit,
            bookLateReturnOneDayFine: values?.bookLateReturnOneDayFine,
            perUserBookIssueLimit: values?.perUserBookIssueLimit,
            currency: values?.currency,
            timezone: values?.timezone,
            uid,
          },
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
          .then((res) => {
            toast.success("Create Librarry", {
              position: toast.POSITION.TOP_CENTER,
            });
            setToggleRefresh(!toggleRefresh);
          })
          .catch((err) => {
            toast.error("Create Librarry Error", {
              position: toast.POSITION.TOP_CENTER,
            });
            console.log("ERROR", err);
          });
      } else {
        try {
          const update = await axios.put(
            `${state.baseUrl}/settings/${seetings?._id}`,
            {
              libraryName: values?.libraryName,
              address: values?.address,
              contactNo: values?.contactNo,
              emailaddress: values?.emailaddress,
              bookReturnDayLimit: values?.bookReturnDayLimit,
              bookLateReturnOneDayFine: values?.bookLateReturnOneDayFine,
              perUserBookIssueLimit: values?.perUserBookIssueLimit,
              currency: values?.currency,
              timezone: values?.timezone,
            }
          );
          toast.success("Updated Librarry", {
            position: toast.POSITION.TOP_CENTER,
          });
          resetForm();
        } catch (e) {
          toast.error("Updated Error", {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log("Error in api call: ", e);
          setToggleRefresh(!toggleRefresh);
        }
      }
    },
  });
  return (
    <div>
      {state?.user === null ? (
        <div> Loading... </div>
      ) : (
        <div className="SettingMain">
          <div className="profileDiv">
            <div className="userHead">
              <h2> Setting</h2>
            </div>

            <div className="setting-haed">
              <h5>
                <a href="#"> Dashboard</a> <span>/ Setting</span>
              </h5>
            </div>
            <div className="main-setting">
              <h5 className="edit-setting-hadding">
                {" "}
                <Person2SharpIcon /> Library Setting
              </h5>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
              >
                <div className="settingInput">
                  <h5>Library Name</h5>
                  <input
                    className="settingField"
                    type="text"
                    name="libraryName"
                    value={formik.values.libraryName}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.libraryName && formik.errors.libraryName ? (
                  <div className="errorMessage">
                    {formik.errors.libraryName}
                  </div>
                ) : null}
                <div className="settingInput">
                  <h5>Address</h5>
                  <input
                    className="settingField"
                    type="text"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.address && formik.errors.address ? (
                  <div className="errorMessage">{formik.errors.address}</div>
                ) : null}
                <div className="cont-email">
                  <div className="settingInput">
                    <h5>Contact Number </h5>
                    <input
                      className="settingField2"
                      type="number"
                      name="contactNo"
                      value={formik.values.contactNo}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.touched.contactNo && formik.errors.contactNo ? (
                    <div className="errorMessage">
                      {formik.errors.contactNo}
                    </div>
                  ) : null}
                  <div className="settingInput">
                    <h5>Email Address </h5>
                    <input
                      className="settingField2"
                      type="email"
                      name="emailaddress"
                      value={formik.values.emailaddress}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.touched.emailaddress && formik.errors.emailaddress ? (
                    <div className="errorMessage">
                      {formik.errors.emailaddress}
                    </div>
                  ) : null}
                </div>
                <div className="cont-email">
                  <div className="settingInput">
                    <h5>Book Return Day Limit</h5>
                    <input
                      className="settingField2"
                      type="number"
                      name="bookReturnDayLimit"
                      value={formik.values.bookReturnDayLimit}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.touched.bookReturnDayLimit &&
                  formik.errors.bookReturnDayLimit ? (
                    <div className="errorMessage">
                      {formik.errors.bookReturnDayLimit}
                    </div>
                  ) : null}
                  <div className="settingInput">
                    <h5>Book Late Return One Day Fine </h5>
                    <input
                      className="settingField2"
                      type="number"
                      name="bookLateReturnOneDayFine"
                      value={formik.values.bookLateReturnOneDayFine}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.touched.bookLateReturnOneDayFine &&
                  formik.errors.bookLateReturnOneDayFine ? (
                    <div className="errorMessage">
                      {formik.errors.bookLateReturnOneDayFine}
                    </div>
                  ) : null}
                </div>

                <div className="cont-email">
                  <div className="settingInput">
                    <h5>Currency</h5>
                    <select
                      name="currency"
                      className="settingField2"
                      onChange={formik.handleChange}
                    >
                      {currencies.map((curr) => (
                        <option value={curr["value"]}>{curr["label"]}</option>
                      ))}
                    </select>
                  </div>

                  <div className="settingInput">
                    <h5>Timezone </h5>
                    <select
                      name="timezone"
                      className="settingField2"
                      onChange={formik.handleChange}
                    >
                      {timeies.map((tim) => (
                        <option value={tim["name"]}>{tim["offset"]}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="settingInput">
                  <h5>Per User Book Issue Limit </h5>
                  <input
                    className="settingFieldlast"
                    type="number"
                    name="perUserBookIssueLimit"
                    value={formik.values.perUserBookIssueLimit}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.perUserBookIssueLimit &&
                formik.errors.perUserBookIssueLimit ? (
                  <div className="errorMessage">
                    {formik.errors.perUserBookIssueLimit}
                  </div>
                ) : null}
                <div className="profilebtnDiv">
                  <button type="submit" className="profileUpdate">
                    {seetings === null ? "Create library" : "Update library"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </div>
      )}
    </div>
  );
};

export default Setting;
