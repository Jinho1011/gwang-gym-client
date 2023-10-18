import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [activeTab, setActiveTab] = useState("courses");

  useEffect(() => {
    // courses 데이터 가져오기
    axios.get("http://15.164.211.210:8080/courses").then((response) => {
      setCourses(response.data.data);
    });

    // reservations 데이터 가져오기
    axios.get("http://15.164.211.210:8080/reservations").then((response) => {
      setReservations(response.data.data.ListPublicReservationSport.row);
    });

    // equipments 데이터 가져오기
    axios.get("http://15.164.211.210:8080/equipments").then((response) => {
      setEquipments(response.data.data);
    });
  }, []);
  return (
    <div className="App">
      <div className="tabs">
        <button
          className={activeTab === "courses" ? "active" : ""}
          onClick={() => setActiveTab("courses")}
        >
          Courses
        </button>
        <button
          className={activeTab === "reservations" ? "active" : ""}
          onClick={() => setActiveTab("reservations")}
        >
          Reservations
        </button>
        <button
          className={activeTab === "equipments" ? "active" : ""}
          onClick={() => setActiveTab("equipments")}
        >
          Equipments
        </button>
      </div>

      {activeTab === "courses" && (
        <ul>
          {courses.map((course: any, index: number) => (
            <li key={index}>
              {course.장소명} - {course.강좌명}
            </li>
          ))}
        </ul>
      )}

      {activeTab === "reservations" && (
        <ul>
          {reservations.map((reservation: any, index: number) => (
            <li key={index}>
              {reservation.PLACENM} - {reservation.SVCNM}
            </li>
          ))}
        </ul>
      )}

      {activeTab === "equipments" && (
        <ul>
          {equipments.map((equipment: any, index: number) => (
            <li key={index}>
              {equipment.실외운동기구설치주소} - {equipment.설치기구종류}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
