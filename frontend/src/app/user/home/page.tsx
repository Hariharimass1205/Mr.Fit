import Image from 'next/image';
import Navbar from '@/components/user/navbar';
import Footer from '@/components/user/footer';
import topBg from '../../../../public/assets/backGround/neeww.jpg';
import box1 from '../../../../public/assets/sustainable_habits_124af7fc55.webp';
import box3 from '../../../../public/assets/tailor_made_plans_326e72bd7f.webp';
import box2 from '../../../../public/assets/Biostrap-Labs.webp';
import bottombg from '../../../../public/assets/backGround/fittr_community_judgement_free_c2ff664eb3.webp';

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
        {/* Hero Section */}
        <section className="relative text-center bg-cover bg-center h-[80vh] flex flex-col justify-center text-white">
          <Image
            src={topBg}
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            quality={80}
            className="z-[-1]"
          />
          <div className="z-10">
            <h1 className="text-5xl md:text-8xl font-bold">
              <div>Helping people live their</div>
              <div className="mt-6 text-cyan-300 text-6xl md:text-9xl">BEST LIVES</div>
            </h1>
            <p className="mt-60 text-lg md:text-xl max-w-70">
              Ready to take the first step towards a healthier you? Mr.Fit is here to help with tailored plans, sustainable habits, and consistent monitoring to keep you on track!
            </p>
          </div>
        </section>

        {/* "How Mr.Fit helps you" Section */}
        <section className="text-center py-16 bg-teal-100">
          <h2 className="text-6xl text-black font-semibold pb-10">How Mr.Fit helps you...</h2>
          <button className="mt-6 bg-cyan-400 w-48 rounded-2xl text-white py-2  px-6  hover:bg-cyan-700 transition">
            Start Training
          </button>

          {/* Benefits */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Large Top Box */}
            <div className="w-full md:w-1/3 lg:w-1/4 m-5">
              <Image src={box1}  alt="Tailored Plans" width={300} height={200} className="rounded" />
              <h3 className=" text-gray-900 font-semibold text-3xl mt-4">Tailored Plans</h3>
              <p className="mt-2 text-gray-600">
                At Mr.Fit, we understand your goals and current fitness levels. Our experts create a plan that works for YOU.
              </p>
            </div>

            {/* Smaller Boxes */}
            <div className="w-full md:w-1/3 lg:w-1/4 m-5">
              <Image src={box3} alt="Building Sustainable Habits" width={300} height={200} className="rounded" />
              <h3 className=" text-gray-900 font-semibold text-3xl mt-4">Building Sustainable Habits</h3>
              <p className="mt-2 text-gray-600">
                Our team focuses on sustainable habits that you can keep long-term, ensuring a lifestyle change that lasts.
              </p>
            </div>

            <div className="w-full md:w-1/3 lg:w-1/4 m-5">
              <Image src={box2} alt="Monitoring and Accountability" width={300} height={200} className="rounded" />
              <h3 className=" text-gray-900 font-semibold text-3xl mt-4">Monitoring and Accountability</h3>
              <p className="mt-2 text-gray-600">
                With regular check-ins, our team ensures that you stay on track and reach your goals.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="text-center py-16 bg-teal-200 relative">
          <h2 className="text-6xl text-black font-semibold mb-8">A judgement-free space for everyone...</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div
              className="w-full h-[100vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${bottombg.src})` }}
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
