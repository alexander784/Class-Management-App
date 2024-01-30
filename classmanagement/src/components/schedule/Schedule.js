import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './schedule.css';
import { useUser } from '../../UserContext';



const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState('');
  const [updatedSubject, setUpdatedSubject] = useState('');
  const { currentUser } = useUser();
  

  useEffect(() => {
    console.log('Fetching schedules...');
    axios.get('http://localhost:5555/schedule')
      .then(response => {
        console.log('Schedules fetched successfully:', response.data);
        setSchedules(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching schedules:', error);
      });
  }, [schedules, setSelectedScheduleId, setUpdatedSubject]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const groupedSchedules = schedules.reduce((acc, schedule) => {
    acc[schedule.starttime] = acc[schedule.starttime] || {};
    acc[schedule.starttime][schedule.day] = schedule;
    return acc;
  }, {});

  const handleUpdateSchedule = () => {
    console.log(`Updating schedule with ID ${selectedScheduleId}...`);
    axios.patch(`http://localhost:5555/schedule/${selectedScheduleId}`, { subject: updatedSubject })
      .then(response => {
        console.log('Schedule updated successfully:', response.data);
        setSchedules(prevSchedules => {
          const updatedSchedules = prevSchedules.map(schedule => 
            schedule.id === selectedScheduleId ? response.data : schedule
          );
          return updatedSchedules;
        });
        setSelectedScheduleId('');
        setUpdatedSubject('');
      })
      .catch(error => {
        console.error('Error updating schedule:', error);
      });
  };

  const handleDeleteSchedule = () => {
    console.log(`Deleting schedule with ID ${selectedScheduleId}...`);
    axios.delete(`http://localhost:5555/schedule/${selectedScheduleId}`)
      .then(response => {
        console.log('Schedule deleted successfully:', response.data);
        setSchedules(prevSchedules => 
          prevSchedules.map(schedule => 
            schedule.id === selectedScheduleId ? { ...schedule, subject: '', id: '' } : schedule
          )
        );
        setSelectedScheduleId('');
        setUpdatedSubject('');
      })
      .catch(error => {
        console.error('Error deleting schedule:', error);
      });
  };

  const sortedSchedules = [...schedules].sort((a, b) => a.id - b.id);

  return (
    <>
    {currentUser.is_instructor && <div className="controls-container">
    
        <label className="label">Select Schedule ID:</label>
        <select
          value={selectedScheduleId}
          onChange={e => setSelectedScheduleId(e.target.value)}
          className="select-box"
        >
          <option value="">Select</option>
          {sortedSchedules.map(schedule => (
            <option key={schedule.id} value={schedule.id}>{schedule.id}</option>
          ))}
        </select>
        <br />
        <label className="label">Updated Subject:</label>
        <input
          type="text"
          value={updatedSubject}
          onChange={e => setUpdatedSubject(e.target.value)}
          className="input-box"
        />
        <br />
        <div className='button-container'>
        <button onClick={handleUpdateSchedule} className="button">Update Schedule</button>
        <button onClick={handleDeleteSchedule} className="deletebutton">Delete Schedule</button>
        </div>
      </div>}
    
    <div className="schedule-container">
      <div className='timetable-container'>
      <h1 className="timetable-header">Timetable</h1>      
      <table border="1" className="timetable-table">
        <thead>
          <tr>
            <th>Time Slot</th>
            {days.map((day, dayIndex) => (
              <th key={dayIndex}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedSchedules).map(([timeSlot, daySchedules]) => (
            <tr key={timeSlot}>
              <td>{`${timeSlot}-${daySchedules?.[Object.keys(daySchedules)[0]].endtime}`}</td>
              {days.map((day, dayIndex) => (
                <td
                  key={dayIndex}
                  className={selectedScheduleId === daySchedules?.[day]?.id ? 'selected-slot' : ''}
                >
                  {daySchedules?.[day] ? (
                    <div>
                      <strong>{daySchedules[day].subject}</strong>
                      <p>Schedule ID: {daySchedules[day].id}</p>
                    </div>
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </>
  );
}

export default Schedule;