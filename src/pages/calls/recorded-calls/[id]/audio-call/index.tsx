import React, { useState } from "react";
import Navigation from "@/components/app/Navigation";
import AudioProfileContainer from "@/components/Profile/AudioProfileContainer";
import dummy from "@/shared/dummy";
import Audio from "@/components/activeCalls/audio";
import axios from "axios";
import { useSelector } from "react-redux";
import Backdrop from "@/components/View/Backdrop/Center";
import FullCall from "@/components/View/full-call";
import CallSnippet from "@/components/View/call-snippet";
//Manya will make this page

const CallProfile = ({ data }: any) => {
  const titles = ["CALL INFO", "COMMENTS", "NOTES", "COACHING"];

  const [fullCall, setFullCall] = useState(false);
  const [snippet, setSnippet] = useState(false);
  const [bool, setBool] = useState(true);

  const state = useSelector((state: any) => state.ui);

  const showFull = () => {
    setFullCall(true);
  };
  const showSnippet = () => {
    setSnippet(true);
  };
  const cancelSnippet = () => {
    setBool(false);
    setTimeout(() => {
      setSnippet(false);
      setBool(true);
    }, 500);
  };
  const cancelFull = () => {
    setBool(false);
    setTimeout(() => {
      setFullCall(false);
      setBool(true);
    }, 500);
  };

  const addCall = (e: any, e1: any) => {
    if (e1 === 0) {
      showFull();
    } else if (e1 === 1) {
      showSnippet();
    }
  };

  return (
    <div className="w-[100%] min-h-[90vh] pl-[40px] pr-[40px]">
      {fullCall && (
        <Backdrop bool={bool} width={"60%"} pad={"50px 0"}>
          <FullCall cancel={cancelFull} data={data.result} />
        </Backdrop>
      )}
      {snippet && (
        <Backdrop bool={bool} width={"60%"} pad={"50px 0"}>
          <CallSnippet cancel={cancelSnippet} />
        </Backdrop>
      )}
      <Navigation
        title="Calls>Recorded Calls>Discussion on PX features"
        buttons={[
          {
            text: "Share",
            dropdown: true,
            id: 1,
            icon: "Share",
            light: false,
            click: addCall,
            list: [
              { title: "Full Call", Icon: "Phone" },
              { title: "Call Snippet", Icon: "Mail" },
            ],
          },
        ]}
      />
      <div className="w-[100%] flex gap-[25px] mb-[100px] ">
        <div className="w-[50%] min-h-[50vh] bg-white rounded-xl">
          <Audio data={data.result} />
        </div>
        <AudioProfileContainer
          data={data}
          width={"50%"}
          titles={titles}
          check={true}
          current={0}
          info={dummy.audioCallDetails}
        />
      </div>
      {/* write your code here for profile page manya! */}
    </div>
  );
};

export default CallProfile;

export async function getServerSideProps({ query, params }: any) {
  const response = await axios.get(
    `https://testsalescrm.nextsolutions.in/api/calling/find-by-id?id=${params.id}`
  );

  return {
    props: {
      // TODO: Can do better error handling here by passing another property error in the component
      data: response.data || {},
    }, // will be passed to the page component as props
  };
}
