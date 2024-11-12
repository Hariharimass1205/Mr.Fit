"use client"
import Image from "next/image";
import img from '../../../../public/assets/images.jpg'
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter()
    return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Coaching Video Section */}
      <section className="flex flex-col items-center text-center py-12 bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          PLEASE WATCH THIS COACHING VIDEO
        </h1>
        <div className=" rounded-md p-4 shadow-lg w-96">
          <Image
            src={img}
            alt="YouTube Video"
            width={400}
            height={225}
            className="rounded-md cursor-pointer"
          />
          <button className="mt-2 text-blue-lg"><a href="https://www.youtube.com/watch?v=HKPrBRvLPBo">Click to Watch</a></button>
        </div>
      </section>


      {/* Trail Questions Section */}
      <section className="py-12 px-6 md:px-16 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl  font-semibold mb-8">Guild Lines</h2>
          <p className="text-gray-300 text-sm mb-6">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique, aperiam sapiente! Excepturi at ex nisi voluptas, eos vitae laborum magnam ut odit repellendus commodi perspiciatis reprehenderit? Totam possimus, aut adipisci mollitia repellat illum eos magnam quisquam dolor pariatur asperiores provident ipsam eligendi ducimus sit odio accusantium molestiae voluptatum molestias exercitationem! Similique porro sequi ipsa voluptatum unde incidunt sint optio dicta maiores perferendis possimus harum libero, nulla iusto doloremque. Tenetur minima repudiandae dignissimos mollitia voluptatem laboriosam qui corporis? Temporibus magnam aliquid facere, iure consequuntur quia fuga quam. Dolorum aliquam temporibus quia placeat enim ea nisi qui corrupti perferendis vitae, quae optio iure quisquam alias molestias, facere voluptatibus? Reiciendis amet beatae, omnis nemo et odit nostrum molestias optio sit, eos nisi perferendis? Officia obcaecati explicabo culpa provident modi eius totam sed iusto necessitatibus voluptatum libero quibusdam, voluptatem cupiditate eligendi eaque quidem et quis suscipit veritatis, optio dolorem quia incidunt facere id. Minima nam magni nobis eum repellendus iure nostrum culpa! Reprehenderit nulla, sequi et eius placeat quae possimus ducimus minus facilis aspernatur autem laboriosam voluptatum. Necessitatibus nemo reprehenderit adipisci quos. Qui molestiae laudantium ullam doloribus neque voluptate culpa labore deserunt quis totam porro id molestias quae, tempora quia ducimus iste commodi praesentium!
          </p>
          <div className="flex justify-center items-center">
        <button onClick={()=>router.push('/coaches/quiz')} className=" bg-green-300 w-48 rounded-md  m-5 p-5  font-bold">Start Quizz..</button>
      </div>
        </div>
      </section>
      
    </div>
  );
}
