import { useEffect, useState } from 'react';
import { randomID } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function VideoUIKit() {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const { user } = useClerk();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure the user object has the necessary info before proceeding
    if (user && user.id && (user.fullName || user.emailAddresses.length > 0)) {
      setIsReady(true);
    } else {
      console.error('User information is not complete');
      // Here you could redirect to a login page or show a warning
    }
  }, [user]);

  let myMeeting = (element: HTMLDivElement) => {
    const initMeeting = async () => {
      if (!isReady) return; // Do not proceed if user info is not ready

      const res = await fetch(`/api/zegocloud/?userID=${user?.id}`);
      const { token, appID } = await res.json();
      const username = user?.fullName || user?.emailAddresses[0].emailAddress.split("@")[0];

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        appID,
        token,
        roomID,
        user?.id!,
        username
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Personal link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // Modify as needed
        },
      });
    };

    if (isReady) {
      initMeeting();
    }
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
  