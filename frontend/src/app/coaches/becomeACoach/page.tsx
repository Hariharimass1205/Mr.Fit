"use client"
import Image from "next/image";
import img from '../../../../public/assets/backGround/vecteezy_youtube-logo-png-youtube-logo-transparent-png-youtube-icon_23986480.png'
import topBg from '../../../../public/assets/backGround/pexels-olly-3838926.jpg';
import { useRouter } from 'next/navigation';
import { useState } from "react";


export default function Home() {
  const [quizVisible,setQuizVisible] = useState(false)
    const router = useRouter()

 const handleVisiblity =()=>{
   setQuizVisible(true)
   window.open("https://www.youtube.com/watch?v=HKPrBRvLPBo", "_blank");
 }

    return (
      <>
       <nav className="bg-black text-white flex justify-between items-center p-4">
      <div className="text-2xl font-bold">
        <h1>Mr.Fit</h1>
      </div>
    </nav>
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Coaching Video Section */}
      <section className="flex flex-col items-center  text-center py-12 bg-cover bg-center" style={{ backgroundImage: `url(${topBg.src})` }}>
        
        <div className=" rounded-md p-4 shadow-lg w-96">
          <Image
            src={img}
            alt="YouTube Video"
            width={400}
            height={225}
            className="rounded-md cursor-pointer p-16"
          />
<button className="mt-2 text-red-lg p-5 pr-10 pl-10 font-extrabold bg-[#FF0000] rounded-xl">
  <a onClick={handleVisiblity}>Play</a>
</button>

        </div>
      </section>


      {/* Trail Questions Section */}
      <section className="py-12 px-6 md:px-16 bg-gray-800">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl  text-white-300 md:text-6xl  mb-10">
          PLEASE WATCH THIS COACHING VIDEO
        </h1>
        <h3 className="text-xl  text-white-300 md:text-2xl  font-bold mb-2">
          Guide Lines to Follow   :-
        </h3>
          <p className="text-gray-300 text-sm   mb-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, aperiam sapiente! Excepturi at ex nisi voluptas, eos vitae laborum magnam ut odit repellendus commodi perspiciatis reprehenderit? Totam possimus, aut adipisci mollitia repellat illum eos magnam quisquam dolor pariatur asperiores provident ipsam eligendi ducimus sit odio accusantium molestiae voluptatum molestias exercitationem! Similique porro sequi ipsa voluptatum unde incidunt sint optio dicta maiores perferendis possimus harum libero, nulla iusto doloremque. Tenetur minima repudiandae dignissimos mollitia voluptatem laboriosam qui corporis? Temporibus magnam aliquid facere, iure consequuntur quia fuga quam. Dolorum aliquam temporibus quia placeat enim ea nisi qui corrupti perferendis vitae, quae optio iure quisquam alias molestias, facere voluptatibus? Reiciendis amet beatae, omnis nemo et odit nostrum molestias optio sit, eos nisi perferendis? Officia obcaecati explicabo culpa provident modi eius totam sed iusto necessitatibus voluptatum libero quibusdam, voluptatem cupiditate eligendi eaque quidem et quis suscipit veritatis, optio dolorem quia incidunt facere id. Minima nam magni nobis eum repellendus iure nostrum culpa! Reprehenderit nulla, sequi et eius placeat quae possimus ducimus minus facilis aspernatur autem laboriosam voluptatum. Necessitatibus nemo reprehenderit adipisci quos. Qui molestiae laudantium ullam doloribus neque voluptate culpa labore deserunt quis totam porro id molestias quae, tempora quia ducimus iste commodi praesentium!

            <br></br>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos quis unde earum explicabo molestiae? Maiores praesentium iusto ullam ut, neque commodi id mollitia provident soluta accusamus doloribus nesciunt asperiores, sed eos sint quis saepe ipsum dolorem tempore accusantium velit eum? Corrupti natus repellendus totam adipisci doloribus iusto molestiae odit, repudiandae labore, cumque est fuga vero a esse magnam sapiente aut molestias, corporis reprehenderit accusantium dolor beatae libero minus? Perferendis eum velit mollitia aperiam maiores fugiat quasi accusamus, saepe accusantium aut tempora molestias cumque eveniet amet! Deleniti, vitae sequi delectus at nobis voluptatibus, laudantium reprehenderit aliquam id ipsam quia nam? Voluptate consequuntur ut omnis nihil vitae atque ullam magnam et iste porro. Ad optio impedit quisquam culpa amet nulla illum libero velit itaque accusantium quae, fugiat ipsum soluta, qui corrupti ex sed dicta voluptas perspiciatis harum eum incidunt voluptates iste maxime! Nesciunt, quia! Ipsum molestias nisi natus, vel cumque sequi perferendis quia ea nostrum illum? Molestias libero perferendis optio, temporibus sequi et nam, nulla iure tenetur explicabo, assumenda deserunt? Natus laudantium non magnam dolores nihil soluta, iste perferendis, ducimus animi recusandae necessitatibus similique maiores neque doloribus molestias ullam! Rerum nemo quas voluptatum autem iste quaerat obcaecati incidunt laboriosam, tempora perspiciatis, ratione commodi et soluta quidem nam adipisci eos quod sunt dolores maxime. Deserunt esse quos placeat, repellendus vitae maxime nulla eius animi odio maiores error ratione veritatis voluptatibus dolorem consequatur delectus quisquam. Temporibus corrupti, quis neque ipsum fuga at veniam reiciendis illo repudiandae autem dolore, similique doloribus tempore minus aliquam repellendus dicta. Atque consequatur dolore architecto id maxime eveniet quos, voluptate consectetur laboriosam omnis ab minima quibusdam, dignissimos asperiores modi consequuntur unde assumenda aperiam. Pariatur natus iusto rem, cum voluptate inventore vitae ab omnis laboriosam odit fugiat optio architecto reiciendis exercitationem quisquam quos minus deleniti voluptatem porro. Ipsum voluptatibus odit maiores.
          </p>
          <div className="flex justify-center items-center">
            {quizVisible?
        <button onClick={()=>router.replace('/coaches/quiz')} className=" bg-green-300 w-48 rounded-md  m-5 p-5  font-bold">Start Quizz..</button>
        :<button onClick={()=>router.replace('/user/home')} className=" bg-green-300 w-48 rounded-md  m-5 p-5  font-bold">Back Home</button>}
      </div>
        </div>
      </section>
      
    </div>
    </>
  );
}
