import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveQuizScore } from '@/service/coachApi';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer} from 'react-toastify';

type QuizgreetingProps = {
  score: string;
};

interface User {
  userName: string;
  quizScore:number
}

const Quizgreeting: React.FC<QuizgreetingProps> = ({ score }) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [quizScore,setQuizScore] = useState(0)

  // Parse the score into a number
  const numericScore = Number(score);

  // Fetch user data from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const storedUser = JSON.parse(user) as User;
        setUserName(storedUser.userName);
        setQuizScore(storedUser.quizScore);
      } catch (error) {
        console.log('Error parsing user data:', error);
      }
    }
  }, []);

  // Handle the "Request a Call" button click
  const handleRequestCall = async () => {
    try {
      const response = await saveQuizScore(score, localStorage.getItem('user'));
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.result));
        toast.success('Request successful',{onClose:()=>router.replace('/user/home')})
        ;
      }
    } catch (error) {
      console.log('Error requesting call:', error);
    }
  };

  return (
    <>
    <ToastContainer/>
    <div
      className="min-h-screen flex flex-col justify-center items-center text-black bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/backGround/pexels-zakaria-2827392.jpg')" }}
    >
      
      {numericScore >= 10 ? (
        <h1 className="text-4xl font-bold text-center px-8 w-5/6 mt-20 mb-20">
          Mr. {userName}, you have scored: {quizScore?quizScore:score}. That&apos;s appreciable... At the
          bottom of the page, you can find a button called Request a call."
          Click to receive a call for admin approval.
        </h1>
      ) : (
        <h1 className="text-4xl font-bold text-center px-8 w-5/6 mt-20 mb-20">
          Mr. {userName}, you have scored: {quizScore?quizScore:score}. That's not up to our
          expectation...Please prepare well by next time, and you have only a
          few opportunities to attend this registration.
        </h1>
      )}

      <p className="text-black-300 text-sm px-10 py-5">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium itaque possimus veritatis amet magni dolorum tempore reiciendis a quis sequi! Asperiores, ea harum, ratione at laudantium cumque vero quod eos odit ipsa amet enim officiis eligendi perspiciatis! Earum nisi optio laborum impedit nulla eos corporis, distinctio facilis quod nostrum aliquam perspiciatis enim illo eveniet blanditiis vitae animi sequi? Porro molestias nemo aspernatur ex impedit officia accusamus, voluptatum ab rem libero modi suscipit laborum itaque cum provident, ipsum cupiditate numquam eligendi dolorum quasi id aliquid iste! Molestias adipisci voluptatum, tempora ad quidem repellendus minus aperiam magni in esse itaque cum suscipit perspiciatis dolor assumenda magnam inventore, quae explicabo temporibus maxime odio consequatur ea harum quas! Esse possimus incidunt maxime suscipit enim ex fugit amet corrupti velit impedit? Hic, rerum excepturi atque voluptatem soluta ipsam sunt nulla veniam eos, odio tempora? Quis exercitationem porro, neque fugiat aliquid explicabo illo eum magnam ex inventore error, laboriosam facilis dolore possimus saepe quam eveniet officiis? Ea laborum consequatur rerum voluptatum vero maiores aut, pariatur debitis aspernatur reprehenderit provident eveniet perspiciatis in, consectetur nostrum. Commodi dicta asperiores molestias blanditiis totam, nulla ipsa beatae dolorem iste. Voluptas vero voluptate consequuntur reprehenderit! Quisquam doloribus aut maiores quo reprehenderit numquam fugit illo qui, fuga unde expedita quam, similique impedit soluta mollitia molestias ea rerum sit repellat, facere non maxime. Blanditiis accusamus perspiciatis et sunt alias ducimus? Iure animi, recusandae ipsa voluptate modi id repellendus, atque doloribus labore quibusdam eligendi similique officia alias earum aliquam consequuntur quidem? Veritatis quas nisi vero aliquid. Optio maiores nulla esse incidunt magni quia facere odit sunt id odio aspernatur, iure nostrum obcaecati doloremque totam exercitationem, provident tempora expedita! Cupiditate, tenetur illum iste sit officia, pariatur voluptates voluptatum expedita repudiandae eos minus! Eligendi eaque nemo architecto id repudiandae nisi minus saepe pariatur repellendus mollitia modi odio laudantium eveniet dolorum, quibusdam eius optio. Id dicta excepturi aperiam voluptatem autem possimus fugiat in repellendus unde nulla ipsa fugit similique repellat inventore explicabo, dignissimos quisquam atque hic nam molestiae quae dolores iste. Veniam quas temporibus, officiis inventore dolores repudiandae qui recusandae itaque esse quisquam a hic delectus eaque non illum asperiores sapiente accusantium deleniti voluptas? Aspernatur dolore laudantium illum eos placeat asperiores, ea quibusdam inventore eaque sint iure vel laboriosam. Laboriosam inventore natus praesentium assumenda doloribus, consectetur corrupti cum reiciendis ipsum numquam, optio ad dolorum deserunt odit culpa exercitationem dolorem maxime minus fuga iure ipsa error alias placeat.
      </p>

      {numericScore >= 10 ? (
        <div className="flex justify-center items-center">
          <button
            onClick={handleRequestCall}
            className="bg-cyan-500 text-white text-2xl px-6 py-3 rounded-lg hover:bg-blue-600 transition mb-10"
          >
            Request a call
          </button>
        </div>
      ) : (
        <button
          onClick={() => router.push('/')}
          className="bg-cyan-500 text-white text-2xl px-6 py-3 rounded-lg hover:bg-white-600 transition mb-10 mt-10"
        >
          Back To Home
        </button>
      )}
    </div>
    </>
  );
};

export default Quizgreeting;
