"use client";
import { fetchCoachData, updateDiet } from "../../../service/coachApi";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// Define a type for the student
interface Student {
  _id: string;
  userName: string;
  phone: string;
  district: string;
  enrolledDuration: string;
  enrolledDurationExpire: string;
  enrolledDate: string;
  slotTaken: string;
  Diet: {
    Meal1: string;
    Meal2: string;
    Meal3: string;
    Goal: {
      Water: number | null;
      Calories: number | null;
      Steps: number | null;
      Protein: number | null;
      Carbohydrates: number | null;
      Fats: number | null;
      Fiber: number | null;
      SleepTime: number | null;
    };
  };
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [dietEdit, setDietEdit] = useState({ Meal1: "", Meal2: "", Meal3: "" });
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [coachId, setCoachId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCoachDatafn = async () => {
      try {
        const response = await fetchCoachData();
        setCoachId(response.coach._id);
        setStudents(response.coach.Students);
        setFilteredStudents(response.coach.Students);
      } catch {
        console.log("Error at student list");
      }
    };
    fetchCoachDatafn();
  }, []);

  const handleEditClick = (student: Student) => {
    setEditingStudentId(student._id);
    setDietEdit(student.Diet || { Meal1: "", Meal2: "", Meal3: "" });
  };

  const handleSave = async (studentId: string) => {
    const res = await updateDiet(studentId, dietEdit);
    if (res) {
      toast.success("Successfully Diet Edited");
    }
    setEditingStudentId(null);
  };

  const handleCancel = () => {
    setEditingStudentId(null);
    setDietEdit({ Meal1: "", Meal2: "", Meal3: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDietEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleViewClick = (student: Student) => {
    setViewingStudent(student);
  };

  const handleBack = () => {
    router.back();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = students.filter(
      (student) =>
        student.userName.toLowerCase().includes(value) ||
        student.phone.includes(value) ||
        student.district.toLowerCase().includes(value)
    );
    setFilteredStudents(filtered);
  };

  return (
    <div className="p-8 relative">
      <ToastContainer />

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>

      <h1 className="text-6xl text-cyan-400 font-bold mb-10 text-center">Student List</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name, phone"
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Students List Table */}
      <div className="overflow-x-auto bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-gray-700 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3">Expire</th>
              <th className="px-6 py-3">Enrolled</th>
              <th className="px-6 py-3">Slot</th>
              <th className="px-6 py-3">Actions</th>
              <th className="px-6 py-3">Chat</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student._id} className="hover:bg-gray-700">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{student.userName}</td>
                <td className="px-6 py-4">{student.phone}</td>
                <td className="px-6 py-4">{student.enrolledDurationExpire == "Expired" ? <p className="text-red-600">Expired</p> :student.enrolledDuration}</td>
                <td className="px-6 py-4">{student.enrolledDurationExpire == "Expired" ? <p className="text-red-600">Expired</p> :student.enrolledDurationExpire}</td>
                <td className="px-6 py-4">{student.enrolledDurationExpire == "Expired" ? <p className="text-red-600">Expired</p> :student.enrolledDate}</td>
                <td className="px-6 py-4">{student.enrolledDurationExpire == "Expired" ? <p className="text-red-600">Expired</p> :student.slotTaken}</td>
                {student.enrolledDurationExpire == "Expired" ? "":
                <td className="px-6 py-4 flex space-x-2">
                <button
                  onClick={() => handleEditClick(student)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Edit Diet
                </button>
                <button
                  onClick={() => handleViewClick(student)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  View Goals
                </button>
              </td>}
                 <td className="px-6 py-4">
                 <button
                   onClick={() =>
                     router.push(
                       `/coaches/chatPage?user=${student._id}&coachId=${coachId}&userName=${student.userName}`
                     )
                   }
                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                 >
                   Chat
                 </button>
               </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Viewing Student Goals Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-700 p-6 rounded-lg w-96 max-w-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Goals for {viewingStudent.userName}
            </h3>
            <div className="space-y-4">
              {Object.keys(viewingStudent.Diet.Goal).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <p className="text-white">
                    {viewingStudent.Diet.Goal[key as keyof typeof viewingStudent.Diet.Goal] != null
                      ? String(viewingStudent.Diet.Goal[key as keyof typeof viewingStudent.Diet.Goal])
                      : "Not added"}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewingStudent(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diet Editing Modal */}
      {editingStudentId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-700 p-6 rounded-lg w-96 max-w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Edit Diet</h3>
            <div className="space-y-4">
              {["Meal1", "Meal2", "Meal3"].map((meal) => (
                <div key={meal}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">{meal}</label>
                  <textarea
                    name={meal}
                    value={dietEdit[meal as keyof typeof dietEdit] || ""}
                    onChange={handleInputChange}
                    className="block w-full bg-gray-800 text-white px-3 py-2 rounded"
                    placeholder={`Enter ${meal}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(editingStudentId)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
