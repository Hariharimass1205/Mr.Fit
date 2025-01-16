
import PayUApiCalls from "../../../../utils/apiCalls/payUApiCalls"
import { redirect } from "next/navigation";
export async function POST(req: any) {
  const {searchParams} = req.nextUrl;
  const recieveddata = searchParams.get("packageDuration")
  const slotTime = searchParams.get("slotTime")
  let packageDure = null


  if(recieveddata){
    try {
      packageDure = JSON.parse(decodeURIComponent(recieveddata))
    } catch (error) {
      console.log(error)
    }
  }

  const formData = await req.formData();
  const data: { [key: string]: any } = {};
  formData.forEach((value: any, key: string) => {
    data[key] = value;
  });
data.slotTime = slotTime
let PayUOrderId
  try {
    data.package = packageDure
     PayUOrderId = await PayUApiCalls.saveData(data);
  } catch (error: any) {
    console.log(error);
  }
  const userName = data.firstname;
  const packagess = data.package;
  const packageAmount = data.amount;
  const payload = {
    userName,
    packagess,
    packageAmount,
  };
  const queryParams = new URLSearchParams({
    data: encodeURIComponent(JSON.stringify(payload)), // Serialize the object
  });
  
  redirect(`/user/successPage?${queryParams.toString()}`);
}
