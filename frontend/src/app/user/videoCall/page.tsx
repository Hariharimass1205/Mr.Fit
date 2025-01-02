"use client";

import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSearchParams } from "next/navigation";

const RoomPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId") || "Your Name";
  const coachName = searchParams.get("coachName") || "Your Name";
  const meetingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (meetingRef.current) {
      const appId = 693151417;
      const serverSecret = "66df38c08b99ce891eb296a08e93e8a0";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        Date.now().toString(),
        coachName
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: meetingRef.current,
        sharedLinks: [
          {
            name: "Copy Link",
            url:
              window.location.origin +
              window.location.pathname +
              "?roomId=" +
              roomId,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
      });
    }
  }, [roomId]);

  return (
    <div>
      {/* This div will serve as the container for the ZegoUIKit */}
      <div ref={meetingRef} style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default RoomPage;
