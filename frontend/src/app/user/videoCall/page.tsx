"use client";  // Make sure it's lowercase

import { useEffect, useRef, useState } from "react";
import { SaveChatCoach } from "../../../service/chatApi";
import { useRouter } from "next/navigation";  // Correct import here
import { useSearchParams } from "next/navigation";  // Correct import here

const RoomPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize the router
  const roomId = searchParams.get("roomId") || "Your Name";
  const coachName = searchParams.get("coachName") || "Your Name";
  const coachId = searchParams.get("coachId") || "";
  const userId = searchParams.get("userId") || "";
  const meetingRef = useRef<HTMLDivElement>(null);

  // State to track if the component is mounted (client-side)
  const [isClient, setIsClient] = useState(false);
  const [shareLink, setShareLink] = useState<string>("");

  useEffect(() => {
    // This ensures we are only running this code on the client side
    setIsClient(true);
    if (typeof window !== "undefined") {
      const generatedLink = `${window.location.origin}${window.location.pathname}?roomId=${roomId}`;
      setShareLink(generatedLink); // Set the share link in the state
    }
  }, [roomId]);

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
    if (typeof window !== "undefined" && window.opener) {
      window.close();
    } else {
      // Navigate to the home page as a fallback if tab cannot be closed
      router.push("/user/home");
    }
  }

  useEffect(() => {
    if (isClient && shareLink && meetingRef.current) {
      import('@zegocloud/zego-uikit-prebuilt').then(({ ZegoUIKitPrebuilt }) => {
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

        sentMsg(shareLink); // Send the share link message
      }).catch((error) => {
        console.log("Error loading ZegoUIKitPrebuilt:", error);
      });
    }
  }, [isClient, roomId, coachName, shareLink, coachId, userId]);

  // Render null or loading state until the component is fully mounted
  if (!isClient) {
    return null; // Optionally, add a loading spinner
  }

  return (
    <div>
      {/* This div will serve as the container for the ZegoUIKit */}
      <div ref={meetingRef} style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default RoomPage;
