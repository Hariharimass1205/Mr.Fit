
import PayUApiCalls from "../../../../utils/apiCalls/payUApiCalls"
import { redirect } from "next/navigation";
export async function POST(req: any) {
  const contentType = req.headers.get("content-type") || "";
  const formData = await req.formData();
  const data: { [key: string]: any } = {};
  formData.forEach((value: any, key: string) => {
    data[key] = value;
  });
let PayUOrderId
  try {
     PayUOrderId = await PayUApiCalls.saveData(data);
  } catch (error: any) {
    console.log(error);
  }
 redirect(`/user/successPage`);

}
