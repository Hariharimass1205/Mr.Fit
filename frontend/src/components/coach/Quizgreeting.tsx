import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { saveQuizScore } from '@/service/coachApi';
type QuizgreetingProps = {
  score: string;
};
interface User {
  userName: string;
}
const Quizgreeting: React.FC<QuizgreetingProps> = ({ score }) => {
    const router = useRouter()
  let a = Number(score)
  let user = localStorage.getItem("user");
  let userName = "";
  if (user) {
    try {
      let storedUser = JSON.parse(user) as User;
      userName = storedUser.userName;
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }
 const handleRequestCall =async ()=> {
    try {
        let response = await saveQuizScore(score,user)
       if(response.data.success){
        alert("done")
       }
    } catch (error) {
        console.log(error)
    }
 }
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/backGround/pexels-zakaria-2827392.jpg')" }}
    >
        {a>=12?
      <h1 className="text-4xl font-bold text-center px-8 w-5/6 mt-20 mb-20">
        Mr. {userName}, you have scored: {score}. That's appreciable... At the bottom of the page, you can find a button called "Request a call." Click to receive a call for admin approval.
      </h1>:
       <h1 className="text-4xl font-bold text-center px-8 w-5/6 mt-20 mb-20">
       Mr. {userName}, you have scored: {score}. That's not up to our expection...Please prepare well by next time and you have only few opportunities to attend this registration
     </h1>
        }

      <p className="text-black-300 text-sm px-10 py-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium itaque possimus veritatis amet magni dolorum tempore reiciendis a quis sequi! Asperiores, ea harum, ratione at laudantium cumque vero quod eos odit ipsa amet enim officiis eligendi perspiciatis! Earum nisi optio laborum impedit nulla eos corporis, distinctio facilis quod nostrum aliquam perspiciatis enim illo eveniet blanditiis vitae animi sequi? Porro molestias nemo aspernatur ex impedit officia accusamus, voluptatum ab rem libero modi suscipit laborum itaque cum provident, ipsum cupiditate numquam eligendi dolorum quasi id aliquid iste! Molestias adipisci voluptatum, tempora ad quidem repellendus minus aperiam magni in esse itaque cum suscipit perspiciatis dolor assumenda magnam inventore, quae explicabo temporibus maxime odio consequatur ea harum quas! Esse possimus incidunt maxime suscipit enim ex fugit amet corrupti velit impedit? Hic, rerum excepturi atque voluptatem soluta ipsam sunt nulla veniam eos, odio tempora? Quis exercitationem porro, neque fugiat aliquid explicabo illo eum magnam ex inventore error, laboriosam facilis dolore possimus saepe quam eveniet officiis? Ea laborum consequatur rerum voluptatum vero maiores aut, pariatur debitis aspernatur reprehenderit provident eveniet perspiciatis in, consectetur nostrum. Commodi dicta asperiores molestias blanditiis totam, nulla ipsa beatae dolorem iste. Voluptas vero voluptate consequuntur reprehenderit! Quisquam doloribus aut maiores quo reprehenderit numquam fugit illo qui, fuga unde expedita quam, similique impedit soluta mollitia molestias ea rerum sit repellat, facere non maxime. Blanditiis accusamus perspiciatis et sunt alias ducimus? Iure animi, recusandae ipsa voluptate modi id repellendus, atque doloribus labore quibusdam eligendi similique officia alias earum aliquam consequuntur quidem? Veritatis quas nisi vero aliquid. Optio maiores nulla esse incidunt magni quia facere odit sunt id odio aspernatur, iure nostrum obcaecati doloremque totam exercitationem, provident tempora expedita! Cupiditate, tenetur illum iste sit officia, pariatur voluptates voluptatum expedita repudiandae eos minus! Eligendi eaque nemo architecto id repudiandae nisi minus saepe pariatur repellendus mollitia modi odio laudantium eveniet dolorum, quibusdam eius optio. Id dicta excepturi aperiam voluptatem autem possimus fugiat in repellendus unde nulla ipsa fugit similique repellat inventore explicabo, dignissimos quisquam atque hic nam molestiae quae dolores iste. Veniam quas temporibus, officiis inventore dolores repudiandae qui recusandae itaque esse quisquam a hic delectus eaque non illum asperiores sapiente accusantium deleniti voluptas? Aspernatur dolore laudantium illum eos placeat asperiores, ea quibusdam inventore eaque sint iure vel laboriosam. Laboriosam inventore natus praesentium assumenda doloribus, consectetur corrupti cum reiciendis ipsum numquam, optio ad dolorum deserunt odit culpa exercitationem dolorem maxime minus fuga iure ipsa error alias placeat.
      </p>
      {a>=12?
      <div className="flex justify-center items-center">
        <button onClick={handleRequestCall} className="bg-cyan-500 text-white text-2xl px-6 py-3 rounded-lg hover:bg-blue-600 transition mb-10">
          Request a call
        </button>
        </div>:
        <button onClick={()=>router.push('/user/home')} className="bg-cyan-500 text-white text-2xl px-6 py-3 rounded-lg hover:bg-white-600 transition mb-10 mt-10">
        Back To Home 
      </button>
          }
      </div>
  );
};
export default Quizgreeting;
