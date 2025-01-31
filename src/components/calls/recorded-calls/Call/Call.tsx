import { setCurrent } from "@/store/UI";
import Call, { CompanyId, CustomerId } from "@/types/Calls";
import ActiveCall from "@/types/recorded-call";
import { getBasicIcon } from "@/utils/AssetsHelper";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Lead from "@/types/Leads";
import axios from "axios";

const example = {
  _id: "6457d6b590467877fd40291c",
  companyId: {
    _id: "6457d6b590467877fd402915",
    company_name: "Zen Corp.",
    company_website_url: "www.faxquote.com",
    company_icon: "",
    company_location: "New Delhi",
    company_product_category: "Product C",
    company_description:
      "XYZ Corp is a marketing and advertising agency providing creative solutions to help businesses increase brand awareness, generate leads, and drive sales.",
    createdAt: "2023-05-07T16:49:57.100Z",
    updatedAt: "2023-05-07T16:49:57.100Z",
    __v: 0,
  },
  customerId: {
    _id: "6457d6b590467877fd402918",
    name: "Ishita Patel",
    contact: "(208) 555-0112",
    email: "ishitapatel@example.com",
    parentId: "6411718c074708bce819b8c1",
    designation: "Sales Manager",
    companyId: "6457d6b590467877fd402915",
    createdAt: "2023-05-07T16:49:57.183Z",
    updatedAt: "2023-05-07T16:49:57.183Z",
    __v: 0,
  },
  potential_deal_size: "50001",
  win_probability: "80%",
  created_by: "Sales",
  customer_name: "Ishita Patel",
  inquiry: "Trial Enquiry",
  existing_budget: "30001",
  leadStatus: "Close",
  leadStage: "Lost",
  lead_title: "Product discussion with Zen Corp.",
  lead_description: "Interested to know about Product A.",
  notes: [
    {
      title: "Product feature A",
      content: "Interested to know about Product A.",
      _id: "6457d6b590467877fd40291d",
      createdAt: "2023-05-10T11:06:35.095Z",
      updatedAt: "2023-05-10T11:06:35.095Z",
    },
  ],
  source: "Phone",
  leadId: "14023",
  owners: [
    {
      _id: "645662800c64d03119111371",
      name: "Anika Sharma",
      email: "anika.sharma@gmail.com",
      password: "$2a$08$keNizUi5NrepC16mgviYKuyGU9R022MfaOFoCUJlkGOziAl1ecx2K",
      phone: "1234567892",
      roles: ["63fdcc5251dadb27a426df6c"],
      token: "",
      createdAt: "2023-05-06T14:21:52.401Z",
      updatedAt: "2023-05-06T14:21:52.477Z",
      __v: 1,
      designation: "Sales Executive",
    },
    {
      _id: "6457d28ac7275bff6e607e88",
      name: "Sanya Reddy",
      email: "sanya.reddy@gmail.com",
      password: "$2a$08$jIydspUt73TuVJlHzr3fe.rLCWGQrV2cHT3xDSW6PLBMhuIdZ3xmO",
      phone: "9876543213",
      roles: ["63fdcc5251dadb27a426df6c"],
      token: "",
      createdAt: "2023-05-07T16:32:10.246Z",
      updatedAt: "2023-05-07T16:32:10.345Z",
      __v: 1,
      designation: "Sales Rep",
    },
  ],
  __v: 0,
  createdAt: "2023-04-03T00:00:00.000Z",
  updatedAt: "2023-04-03T00:00:00.000Z",
};

const CallBox = ({ width, bool }: any) => {
  const [check, setCheck] = useState(false);
  React.useEffect(() => {
    if (check) {
      if (bool) {
        ref.current.checked = true;
      } else {
        ref.current.checked = false;
      }
    }
    setCheck(true);
  }, [bool]);
  const ref: any = useRef();
  return (
    <div
      className={`flex items-center justify-center h-[20px] shrink-0 `}
      style={{ width: width, flexShrink: "unset" }}
    >
      <input type="checkbox" ref={ref} className="checkbox" />
    </div>
  );
};

const CallItem = ({
  width,
  text,
  left,
  align,
  textLeft,
  link,
  click,
  route,
  color,
  bold,
  img,
  onClick,
}: any) => {
  const router = useRouter();

  return (
    <div
      className={`flex items-center  h-[20px] shrink-0`}
      style={{ width: width, marginLeft: left }}
    >
      {img && (
        <Image
          src={img}
          alt=""
          width={20}
          onClick={() => {
            if (onClick) {
              onClick();
            }
            if (click) {
              router.replace(route);
            }
          }}
          height={20}
          className="w-[20px] mr-[5px] ml-[10px] cursor-pointer"
        />
      )}
      {link ? (
        <a
          className="text-[#8A9099] text-[13px]  tracking-wide "
          style={{
            textAlign: align && "center",
            marginLeft: textLeft && `${textLeft}px`,
          }}
        >
          {text ? text : "-"}
        </a>
      ) : (
        <p
          className="text-[#8A9099] overflow-hidden text-[13px] tracking-wide cursor-pointer"
          style={{
            textAlign: align && "center",
            marginLeft: textLeft && `${textLeft}px`,
            fontWeight: bold ? bold : 500,
            color: color ? color : "#8A9099",
          }}
          onClick={() => {
            if (onClick) {
              onClick();
            }
            if (click) {
              router.replace(route);
            }
          }}
        >
          {text ? text : "-"}
        </p>
      )}
    </div>
  );
};

const CallItemMultiple = ({
  width,
  upperText,
  bottomText,
  left,
  bold,
  align,
  click,
  route,
}: any) => {
  const { push } = useRouter();
  return (
    <div
      className={`flex justify-between flex-col h-[34px] shrink-0 cursor-pointer`}
      style={{ width: width, marginLeft: left }}
      onClick={() => {
        if (click) {
          push(route);
        }
      }}
    >
      <p
        className={`text-[12px] tracking-wide font-medium ${bold ? "text-[#3F434A]" : "text-[#8A9099]"
          }`}
        style={{
          textAlign: align && "center",
        }}
      >
        {upperText ? upperText : "-"}
      </p>
      <p
        className="text-[#8A9099] font-medium text-[12px] flex tracking-wide "
        style={{
          textAlign: align && "center",
        }}
      >
        {bottomText ? bottomText : "-"}
      </p>
    </div>
  );
};

// const QuickActions = ({ width, left }: any) => {
//   return (
//     <div
//       className={`flex  h-[18px] item-center shrink-0`}
//       style={{ width: width, marginLeft: left }}
//     >
//       <img
//         src={getBasicIcon("Phone")}
//         alt=""
//         className="mr-[4px] cursor-pointer"
//       />
//       <img
//         src={getBasicIcon("Mail")}
//         alt=""
//         className="mr-[4px] cursor-pointer"
//       />
//       <img
//         src={getBasicIcon("Calendar")}
//         alt=""
//         className="mr-[4px] cursor-pointer"
//       />
//       <img
//         src={getBasicIcon("Tasks")}
//         alt=""
//         className="mr-[4px] cursor-pointer"
//       />
//       <img
//         src={getBasicIcon("Chat")}
//         alt=""
//         className="mr-[4px] cursor-pointer"
//       />
//     </div>
//   );
// };

const ExpandingIcon = ({ change }: any) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-[50px] flex items-center justify-center cursor-pointer">
      {!show ? (
        <Image
          onClick={() => {
            change(!show);
            setShow(!show);
          }}
          src={"/plus-circle.svg"}
          alt=""
          width={15}
          height={15}
        />
      ) : (
        <Image
          onClick={() => {
            change(!show);
            setShow(!show);
          }}
          src={"/minus-circle.svg"}
          alt=""
          width={15}
          height={15}
        />
      )}
    </div>
  );
};

const CallHolder = () => {
  return (
    <div className="w-[25px]  h-[25px] flex shrink-0 drop-shadow-md  absolute items-center cursor-pointer justify-center  top-[-10px] right-[-10px] ">
      <Image
        src={getBasicIcon("CallPlay")}
        style={{
          zIndex: 10,
        }}
        alt=""
        width={25}
        height={25}
      />
    </div>
  );
};

const CallPlayer = () => {
  return (
    <div className="w-[400px] h-[100px] mt-[20px] ml-[70px]">
      <p className="text-[15px] font-medium tracking-wide text-[#000]">
        Call Player
      </p>
      <div className="w-[100%]  h-[4px] mt-[10px] flex bg-[#fff] relative rounded-[3px]">
        <div className="h-[100%] w-[40%] bg-renal-blue rounded-l-[3px] relative">
          <CallHolder />
        </div>
        <div className="absolute text-[#8A9099] top-[10px] right-[3px] text-[11px] tracking-wide font-medium ">
          15:53/30:00
        </div>
      </div>
      <div className="w-[100%] mt-[15px] flex justify-center items-center">
        <Image
          src={getBasicIcon("playRev")}
          style={{
            zIndex: 10,
          }}
          alt=""
          width={13}
          height={13}
          className="mr-[9px] cursor-pointer"
        />
        <Image
          src={getBasicIcon("playBtn")}
          style={{
            zIndex: 10,
          }}
          className="translate-y-[1px] cursor-pointer"
          alt=""
          width={40}
          height={40}
        />
        <Image
          src={getBasicIcon("playFor")}
          style={{
            zIndex: 10,
          }}
          className="ml-[8px] cursor-pointer"
          alt=""
          width={13}
          height={13}
        />
      </div>
    </div>
  );
};

const ExpandableRow = ({
  CallDesc,
  callMatrics,
  engagingQuestions,
  height,
}: any) => {
  return (
    <div
      className="w-[100%] h-[100%] flex px-[110px] py-[10px] duration-300"
      style={{ height: height }}
    >
      <div className="w-[300px]">
        <p className="text-[16px] text-[#000] font-medium">Call Description</p>
        <p className="text-[#8A9099] font-medium mt-[5px] text-[14px] tracking-wide">
          {CallDesc}
        </p>
      </div>
      <div className="w-[180px] ml-[50px]">
        <p className="text-[16px] text-[#000] font-medium">Call Metrics</p>
        {callMatrics.map((item: any, i: any) => {
          return (
            <div className="flex justify-between items-center mt-[3px]" key={i}>
              <p className="text-[#000] font-medium mt-[2px] text-[13px] tracking-wide">
                {item.title}
              </p>
              <p
                key={i}
                className="text-[#8A9099] font-medium mt-[2px] text-[13px] tracking-wide"
              >
                {item.data}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex h-[20px]  justify-between items-center w-[200px] mt-[40px] ml-[60px]">
        <p className="text-[#000] font-medium mt-[2px] text-[13px] tracking-wide">
          Engaging Questions
        </p>
        <p className="text-[#8A9099] font-medium mt-[2px] text-[13px] tracking-wide">
          {engagingQuestions}
        </p>
      </div>
      <CallPlayer />
    </div>
  );
};

const ParticipantsHover = ({
  last,
  bounding,
  data,
}: {
  last: any;
  bounding: any;
  data: Lead;
}) => {
  return (
    <div
      className="bg-[#E8E9EB] max-w-[240px] flex flex-col items-center pb-[40px] rounded-[15px] fixed py-[13px] px-[15px]  right-[10px] drop-shadow-sm"
      style={{
        zIndex: 10000000000000,
        // top: !last ? "30px" : "",
        // right: "10px",
        // bottom: last ? "30px" : "",
        top: last ? bounding.top - 50 : bounding.top + 30,
        left: bounding.left + 120,
      }}
    >
      <p className="text-[#000] w-[100%] text-[15px] font-medium">
        Call Participants
      </p>
      {data.owners.map((item, i) => {
        return (
          <p
            key={i}
            className={`${i === 0 ? "text-renal-blue mt-[19px]" : "text-[#000]"
              } text-[13px] ml-[2px]  w-[100%] font-medium`}
          >
            {item.name} {"("}
            {item.designation}
            {")"}
          </p>
        );
      })}
    </div>
  );
};

const CallContainer = ({ id, CallData, last, selectAll }: CallProps) => {
  const { pathname, push } = useRouter();
  const [detailShow, setDetailShow] = useState(false);

  const [w, setW] = useState(0);
  const wRef: any = useRef();

  React.useEffect(() => {
    if (wRef.current) {
      setW(wRef.current.offsetWidth);
    }
  });

  const [hover, setHover] = useState(false);
  const [bounding, setBounding] = useState({ top: 0, left: 0 });
  const ref: any = useRef();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(true);
  const [LeadData, setLeadData] = useState<Lead>(example);
  const GetLeadData = () => {
    if (CallData.leadId?._id) {
      axios
        .get(
          `https://testsalescrm.nextsolutions.in/api/leads/find-by-id?id=${CallData.leadId._id}`
        )
        .then((e: any) => {
          console.log(e);
          setChecked(false);
          setLeadData(e.data.result);
        });
    }
  };

  console.log(LeadData);

  React.useEffect(() => {
    if (checked) {
      GetLeadData();
    }
  });

  function convertTimestampToTime(timestamp: string) {
    const dateTime = new Date(timestamp);
    const hours = dateTime.getUTCHours().toString().padStart(2, "0");
    const minutes = dateTime.getUTCMinutes().toString().padStart(2, "0");
    const seconds = dateTime.getUTCSeconds().toString().padStart(2, "0");
    const timeStr = hours + ":" + minutes + ":" + seconds;
    return timeStr;
  }

  function convertTimestampToDate(timestamp: string) {
    const dateTime = new Date(timestamp);
    const options: any = { year: "numeric", month: "long", day: "numeric" };
    const dateStr = dateTime.toLocaleDateString("en-US", options);
    return dateStr;
  }

  function calculateTimeDifference(startTime: any, endTime: any) {
    if (startTime && endTime) {
      const startDateTime: any = new Date(startTime);
      const endDateTime: any = new Date(endTime);

      const timeDifference = Math.abs(endDateTime - startDateTime);
      const minutes = Math.floor(timeDifference / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      return `${minutes}:${seconds}`;
    } else {
      return "-";
    }
  }

  return (
    <>
      <div className="flex">
        <div
          className=" pl-[10px] h-[50px] flex items-center grow border-[#ccc] border-b-[1px] "
          ref={wRef}
        >
          <CallBox width={30} bool={selectAll} />
          <ExpandingIcon
            change={(e: any) => {
              setDetailShow(e);
            }}
          />
          <CallItem
            width={200}
            left={20}
            // text={"345345354335"}
            text={CallData._id}
            color={"#000"}
            click={true}
            route={`${pathname}/${id}/audio-call`}
          />
          <CallItem
            width={130}
            left={20}
            color={"#000"}
            // text={"Discussion on PX features"}
            text={CallData?.call_title}
            click={true}
          // route={`${pathname}/${id}/audio-call`}
          />
          <CallItem
            width={200}
            left={10}
            text={CallData.leadId?._id}
            click={true}
            route={`/sales/open/${CallData._id}/lead-profile`}
            color={"#000"}
          />
          <CallItem
            width={120}
            left={10}
            text={LeadData.customerId.name}
            color={"#000"}
          />
          <div
            className={`flex justify-between flex-col h-[34px] shrink-0 cursor-pointer`}
            style={{ width: 200, marginLeft: 20 }}
            ref={ref}
            onMouseOver={() => {
              const box = ref.current.getBoundingClientRect();
              setBounding({ left: box.x, top: box.y });
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
          >
            <p
              className={`text-[13px] mt-[8px] tracking-wide font-medium ${true ? "text-[#3F434A]" : "text-[#8A9099]"
                }`}
            >
              {LeadData.owners?.map((item, i) => {
                return (
                  <span className={i === 0 ? "text-renal-blue" : ""} key={i}>
                    {i < 2 && item.name} ,
                  </span>
                );
              })}
            </p>
          </div>
          <CallItem width={100} left={20} text={"John C"} />
          <CallItemMultiple
            width={130}
            left={20}
            upperText={convertTimestampToDate(CallData.DateCreated)}
            bottomText={"on " + convertTimestampToTime(CallData.DateCreated)}
          />
          <CallItem
            width={120}
            left={10}
            text={calculateTimeDifference(CallData.StartTime, CallData.EndTime)}
          />
          <CallItem width={110} left={20} text={"-"} />
          <CallItem
            width={110}
            left={20}
            img={"/msg.svg"}
            onClick={() => {
              dispatch(setCurrent(1));
            }}
            click={true}
            route={`${pathname}/${id}/video-call`}
            text={`${CallData.comments.length}`}
          />
          <CallItem width={110} left={20} text={"Read Summary"} />
        </div>
      </div>
      <div
        className="duration-300 bg-[#f7f7f7]"
        style={{
          width: w,
          height: detailShow ? 150 : 0,
          clipPath: detailShow
            ? "inset(0px 0px 0 1px)"
            : "inset(0px 0px 150px 1px)",
        }}
      >
        <ExpandableRow
          height={detailShow ? 150 : 0}
          CallDesc={
            "ABC Corp. is a IT company serving industry such as Finance and Edtech. Company has 10+ existing clients and also works with individual people."
          }
          callMatrics={[
            {
              title: "Talk/Listen Ratio ",
              data: "26%",
            },
            {
              title: "Longest Monologue",
              data: "03:53",
            },
            {
              title: "Filler words per minute",
              data: "7",
            },
          ]}
          engagingQuestions={3}
        />
      </div>
      {hover && (
        <ParticipantsHover bounding={bounding} data={LeadData} last={last} />
      )}
    </>
  );
};

export default CallContainer;

interface CallProps {
  id: String;
  CallData: ActiveCall;
  last: any;
  selectAll: any;
}
