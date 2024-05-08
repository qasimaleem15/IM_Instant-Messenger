import { generateToken04 } from "./zegoServerAssistant"; // generate token to authenticate with zegoCloud

export async function GET(req: Request) { //exported asynchronous function named GET that takes a Request
	// object as its argument. This function is designed to handle HTTP GET requests.
  const url = new URL(req.url);
  const userID = url.searchParams.get("userID")!;

  const appID = +process.env.NEXT_PUBLIC_ZEGO_ID!;
  const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;

  const effectiveTimeInSeconds = 3600;

  const payload = ""; //empty string for additional data, if needed in the token; currently not used.

  const token = generateToken04(
    appID,
    userID,
    serverSecret,
    effectiveTimeInSeconds,
    payload
  );

  return Response.json({ token, appID });
}
