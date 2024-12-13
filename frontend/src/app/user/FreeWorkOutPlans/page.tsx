"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bg from '../../../../public/Weightgain/pexels-photo-2780762.webp'
export default function Home() {
  const router = useRouter();

  const [selectedDay, setSelectedDay] = useState("Monday");
  const [goal, setGoal] = useState("Weight Gain");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const goals = ["Weight Gain", "Weight Lose"];

  interface Workout {
    name: string;
    image: string;
    reps: string;
    time: string;
  }

  const weightGainWorkouts: Workout[] = [
    { name: 'Push Ups', image: '/Weightgain/pexels-ivan-samkov-4162494.jpg', reps: '12 reps x 3 Sets', time: '10 mins' },
    { name: 'Dumbbell Press', image: '/Weightgain/istockphoto-171553815-612x612.jpg', reps: '12 reps x 3 Sets', time: '10 mins' },
    { name: 'Bench Press', image: '/Weightgain/pexels-photo-4853662.jpg', reps: '10 reps x 4 Sets', time: '15 mins' },
    { name: 'Cable Press', image: '/Weightgain/pexels-photo-5327505.jpg', reps: '15 reps x 3 Sets', time: '12 mins' },
    { name: 'Inclined Press', image: '/Weightgain/pexels-photo-4047156.jpg', reps: '12 reps x 3 Sets', time: '10 mins' },
    { name: 'Deadlifts', image: '/Weightgain/pexels-photo-1552103.webp', reps: '8 reps x 4 Sets', time: '15 mins' },
    { name: 'Barbell Squats', image: '/Weightgain/pexels-photo-1552249.webp', reps: '10 reps x 4 Sets', time: '15 mins' },   
    { name: 'Pull-Ups', image: '/Weightgain/pexels-photo-9644821.webp', reps: '12 reps x 3 Sets', time: '8 mins' },
    { name: 'Leg Press', image: '/Weightgain/pexels-photo.webp', reps: '15 reps x 3 Sets', time: '10 mins' },
    { name: 'Overhead Press', image: '/Weightgain/pexels-photo-1552249.webp', reps: '10 reps x 3 Sets', time: '12 mins' },
    { name: 'Bicep Curls', image: '/Weightgain/pexels-photo-4720772.webp', reps: '12 reps x 3 Sets', time: '10 mins' },
    { name: 'Tricep Dips', image: '/Weightgain/pexels-photo-4803892.jpg', reps: '15 reps x 3 Sets', time: '8 mins' },
  ];

  const weightLoseWorkouts: Workout[] = [
    { name: 'Jumping Jacks', image: '/assets/workouts/jumping-jacks.jpg', reps: '20 reps x 4 Sets', time: '10 mins' },
    { name: 'High Knees', image: '/assets/workouts/high-knees.jpg', reps: '30 secs x 4 Sets', time: '10 mins' },
    { name: 'Burpees', image: '/assets/workouts/burpees.jpg', reps: '12 reps x 3 Sets', time: '8 mins' },
    { name: 'Mountain Climbers', image: '/assets/workouts/mountain-climbers.jpg', reps: '15 reps x 3 Sets', time: '10 mins' },
    { name: 'Plank', image: '/assets/workouts/plank.jpg', reps: 'Hold 1 min x 3 Sets', time: '10 mins' },
    { name: 'Lunges', image: '/assets/workouts/lunges.jpg', reps: '12 reps x 3 Sets', time: '10 mins' },
    { name: 'Cycling', image: '/assets/workouts/cycling.jpg', reps: '10 mins', time: '10 mins' },
    { name: 'Rowing', image: '/assets/workouts/rowing.jpg', reps: '8 mins', time: '8 mins' },
    { name: 'Jump Rope', image: '/assets/workouts/jump-rope.jpg', reps: '100 skips x 3 Sets', time: '12 mins' },
    { name: 'Sprint Intervals', image: '/assets/workouts/sprint-intervals.jpg', reps: '30 secs x 4 Sets', time: '10 mins' },
    { name: 'Box Jumps', image: '/assets/workouts/box-jumps.jpg', reps: '10 reps x 3 Sets', time: '8 mins' },
    { name: 'Shadow Boxing', image: '/assets/workouts/shadow-boxing.jpg', reps: '1 min x 4 Sets', time: '12 mins' },
  ];

  const [currentWorkouts, setCurrentWorkouts] = useState<Workout[]>([]);
  const [weeklyWorkouts, setWeeklyWorkouts] = useState<Record<string, Workout[]>>({});

  const shuffleWorkouts = (workouts: Workout[]) => {
    const shuffled = [...workouts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 6);
  };

  useEffect(() => {
    const allWorkouts = goal === "Weight Gain" ? weightGainWorkouts : weightLoseWorkouts;

    const workoutPlan: Record<string, Workout[]> = {};
    days.forEach((day) => {
      workoutPlan[day] = day === "Sunday" ? [] : shuffleWorkouts(allWorkouts);
    });

    setWeeklyWorkouts(workoutPlan);
  }, [goal]);

  useEffect(() => {
    if (weeklyWorkouts[selectedDay]) {
      setCurrentWorkouts(weeklyWorkouts[selectedDay]);
    }
  }, [selectedDay, weeklyWorkouts]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white flex flex-col items-center">
      <button
        onClick={() => router.back()}
        className="self-start ml-3 mt-4 px-4 py-2 bg-cyan-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
      >
        Back
      </button>

      <header className="flex text-center py-6">
        <h1 className="text-7xl font-extrabold text-cyan-400 drop-shadow-md">
          Gym Workout Planner
        </h1>
      </header>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="bg-gray-700 text-white p-3 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-400"
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="bg-gray-700 text-white p-3 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-400"
        >
          {goals.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto px-6">
        {currentWorkouts.length > 0 ? (
          currentWorkouts.map((workout, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-800 p-5 rounded-lg shadow-lg">
              <Image  
                src={bg}
                alt={workout.name}
                width={300}
                height={200}
                className="rounded-lg bg-white shadow-md"
              />
              <h3 className="text-xl font-medium mt-4 text-blue-300">{workout.name}</h3>
              <p className="text-gray-400">{workout.reps}</p>
              <p className="text-gray-500">Time to complete: {workout.time}</p>
            </div>
          ))
        ) : (
          <p className="text-lg font-medium text-gray-400">No workouts for today!</p>
        )}
      </div>
      <h1 className="mt-20 text-2xl text-gray-500">: Step to follow : </h1>
      <p className="w-auto text-gray-500 text-sm mr-10 ml-10">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, rerum aspernatur sequi recusandae quasi expedita, quidem non a omnis odio praesentium, reprehenderit itaque doloribus quam. Expedita animi in rerum corrupti quis accusantium consequatur ab non tenetur praesentium vitae, doloribus id voluptas quo repellat quibusdam repudiandae aperiam sed natus nisi sunt doloremque culpa? Aliquam odit enim rerum quas consequatur sit quisquam, autem, sapiente aliquid illum quo unde suscipit. Laboriosam rerum sit aliquid perspiciatis, voluptatum ipsum quod dolorem adipisci debitis eos sequi consequuntur vitae numquam fuga ex nostrum quaerat inventore voluptas consectetur! Iure velit voluptas harum totam rem nostrum eum nihil incidunt asperiores fugiat eius dolorem ratione ducimus commodi expedita recusandae eligendi porro temporibus assumenda, et quis aperiam minus deserunt. Laboriosam nostrum architecto perspiciatis suscipit error at id vel veniam iste velit ex, dolorem culpa commodi sed eius quidem repellendus consequatur, laudantium maiores. Delectus quas maiores fugiat libero officiis natus aliquid ipsum sed? Asperiores, accusantium culpa excepturi nemo soluta debitis adipisci laboriosam quas ducimus. Dignissimos reprehenderit at autem ratione voluptatum provident nam voluptate error animi quisquam quis, eius facere atque sed aliquam dolorum necessitatibus nesciunt perferendis amet magni porro quos fuga sunt. Autem dolorem quae quod obcaecati, ea labore cupiditate beatae quos, officia et molestias, provident eum quia quo consectetur quas repellat exercitationem? Quas consequatur maxime atque qui ratione quia, cupiditate dolore animi excepturi alias eaque quo ex, incidunt eligendi natus iste et ipsa in suscipit fugiat sed sapiente eius? Vel natus, optio sapiente est repellendus, aut asperiores, quo suscipit officiis excepturi sit quod. Quae voluptatum officiis beatae laborum explicabo. Voluptatum, deserunt. Doloremque incidunt, eum sequi, fugit deleniti consequatur distinctio laborum enim tempore necessitatibus iure deserunt ducimus temporibus nisi aut facere. Neque voluptates quam, libero deserunt perspiciatis aliquid porro ullam laboriosam. Eos qui, neque quasi amet sunt voluptatem expedita laudantium sed animi.</p>
    </div>
  );
}
