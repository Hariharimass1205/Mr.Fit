"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [goal, setGoal] = useState("Weight Gain");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const goals = ["Weight Gain", "Weight Lose"];

  interface Workout {
    name: string;
    image: string;
    reps: string;
    time: string;
  }

  const weightGainWorkouts: Workout[] = [
    { name: 'Push Ups', image: '../../../../public/Weight gain/pexels-ivan-samkov-4162494.jpg', reps: '12 reps x 3 Sets', time: '10 mins' },
    { name: 'Dumbbell Press', image: '../../../../public/Weight gain/istockphoto-171553815-612x612.jpg', reps: '12 reps x 3 Sets', time: '10 mins' },
    { name: 'Bench Press', image: '../../../../public/Weight gain/pexels-photo-4853662.jpg', reps: '10 reps x 4 Sets', time: '15 mins' },
    { name: 'Cable Press', image: '../../../../public/Weight gain/pexels-photo-5327505.jpg', reps: '15 reps x 3 Sets', time: '12 mins' },
    { name: 'Inclined Press', image: '../../../../public/Weight gain/pexels-photo-4047156.jpg', reps: '12 reps x 3 Sets', time: '10 mins' },
    { name: 'Deadlifts', image: '../../../../public/Weight gain/pexels-photo-1552103.webp', reps: '8 reps x 4 Sets', time: '15 mins' },
    { name: 'Barbell Squats', image: '../../../../public/Weight gain/pexels-photo-1552249.webp', reps: '10 reps x 4 Sets', time: '15 mins' },
    { name: 'Pull-Ups', image: '../../../../public/Weight gain/pexels-photo-9644821.webp', reps: '12 reps x 3 Sets', time: '8 mins' },
    { name: 'Leg Press', image: '../../../../public/Weight gain/pexels-photo.webp', reps: '15 reps x 3 Sets', time: '10 mins' },
    { name: 'Overhead Press', image: '../../../../public/Weight gain/pexels-photo-1552249.webp', reps: '10 reps x 3 Sets', time: '12 mins' },
    { name: 'Bicep Curls', image: '../../../../public/Weight gain/pexels-photo-4720772.webp', reps: '12 reps x 3 Sets', time: '10 mins' },
    { name: 'Tricep Dips', image: '../../../../public/Weight gain/pexels-photo-4803892.jpg', reps: '15 reps x 3 Sets', time: '8 mins' },
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <header className=" flex text-center py-12">
        <h1 className="text-4xl font-semibold text-blue-400">
          Best Workout for Your Transformation
        </h1>
      </header>
{/* <img>{weightGainWorkouts}</img> */}
      {/* Dropdowns */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
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
          className="bg-gray-800 text-white p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          {goals.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Workout Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto px-4">
        {currentWorkouts.length > 0 ? (
          currentWorkouts.map((workout, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg">
              <img
                src={workout.image}
                alt={workout.name}
                width={300}
                height={200}
                className="rounded-lg"
              />
              <h3 className="text-xl font-medium mt-4">{workout.name}</h3>
              <p>{workout.reps}</p>
              <p>Time to complete: {workout.time}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Rest day! No workouts scheduled.</p>
        )}
      </div>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>Note: Transform your body with consistency and dedication.</p>
      </footer>
    </div>
  );
}
