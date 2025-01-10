"use client";

import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSearchParams, useRouter } from "next/navigation";
import { SaveChatCoach } from "@/service/chatApi";

const RoomPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize the router
  const roomId = searchParams.get("roomId") || "Your Name";
  const coachName = searchParams.get("coachName") || "Your Name";
  const coachId = searchParams.get("coachId") || "";
  const userId = searchParams.get("userId") || "";
  const meetingRef = useRef<HTMLDivElement>(null);

  // Generate the share link before navigation
  const shareLink = `${window.location.origin}${window.location.pathname}?roomId=${roomId}`;

  // Function to send the share link
  async function sentMsg(shareLink: string) {
    try {
      await SaveChatCoach({
        content: shareLink,
        senderId: coachId,
        coachId: userId,
      });
    } catch (error) {
      console.log("Error sending message:", error);
    }
  }

  // Function to handle navigation on exit
  function handleExit() {
    if (window.opener) {
      window.close();
    } else {
      // Navigate to the home page as a fallback if tab cannot be closed
      console.warn("Unable to close the tab. Redirecting to /user/home instead.");
      router.push("/user/home");
    }
  }

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
            url: shareLink,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
        onLeaveRoom: handleExit, // Trigger navigation when exiting
      });
    }

    sentMsg(shareLink);
  }, [roomId, shareLink]);

  return (
    <div>
      {/* This div will serve as the container for the ZegoUIKit */}
      <div ref={meetingRef} style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default RoomPage;
