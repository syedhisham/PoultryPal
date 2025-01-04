import React, { useEffect, useState } from "react";
import { AxiosRequest } from "../../../AxiosRequest/AxiosRequest";
import {
  Button,
  Input,
  // Select,
  // Option,
  Textarea,
  Card,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux/tokenSlice";
import toast from "react-hot-toast";
import { selectRole } from "../../../redux/roleSlice";
import { useNavigate } from "react-router-dom";

const CreateSchedule = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [weekRecords, setWeekRecords] = useState([
    {
      date: "",
      shiftStart: "",
      shiftEnd: "",
      tasks: [{ description: "", duration: 0 }],
    },
  ]);
  const storedToken = localStorage.getItem("token");
  const token = useSelector(selectToken) || storedToken;
  const role = useSelector(selectRole);
  const isAdmin = role === "Admin";
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/home");
  };

  if (!isAdmin) {
    return (
      <div className="flex text-center items-center justify-center min-h-screen bg-[#f0ebe4] font-poppins">
        <Card className="p-8 items-center shadow-lg rounded-lg bg-white">
          <Typography variant="h4" className="mb-6 text-black">
            Insufficient Privileges
          </Typography>
          <Typography variant="body1" className="text-gray-600 mb-4">
            You do not have the required permissions to access this page. Please
            contact the administrator if you believe this is an error.
          </Typography>
          <Button
            variant="contained" // Consider using 'contained' instead of 'filled'
            onClick={handleHome}
            className="max-w-md bg-black shadow-none hover:shadow-black hover:shadow-md"
          >
            Go To Home
          </Button>
        </Card>
      </div>
    );
  }

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await AxiosRequest.get(
          "/api/employee/getAllEmployees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Handle employee selection
  const handleEmployeeSelect = (event) => {
    const selectedValue = event.target.value; // Safely access value
    setSelectedEmployee(selectedValue);
    console.log("Selected Employee ID:", selectedValue); // Debug output
  };

  // Handle week record changes
  const handleWeekRecordChange = (index, field, value) => {
    const updatedRecords = [...weekRecords];

    // Handle date input
    if (field === "date") {
      updatedRecords[index].date = new Date(value); // Convert the date string to a Date object
    } else {
      // Handle time inputs (shiftStart and shiftEnd)
      const currentDate = new Date(updatedRecords[index].date); // Get the date for the current record

      // Split the time value to set hours and minutes
      const [hours, minutes] = value.split(":");
      const timeValue = new Date(currentDate.setHours(hours, minutes, 0)); // Set hours and minutes

      if (field === "shiftStart") {
        updatedRecords[index].shiftStart = timeValue;

        // Ensure shiftEnd cannot be before shiftStart
        if (
          updatedRecords[index].shiftEnd &&
          updatedRecords[index].shiftEnd < updatedRecords[index].shiftStart
        ) {
          updatedRecords[index].shiftEnd = null; // Reset shiftEnd if it is before shiftStart
        }
      } else if (field === "shiftEnd") {
        updatedRecords[index].shiftEnd = timeValue;

        // Ensure shiftEnd cannot be before shiftStart
        if (updatedRecords[index].shiftEnd < updatedRecords[index].shiftStart) {
          updatedRecords[index].shiftEnd = null; // Reset shiftEnd if it is before shiftStart
        }
      }
    }

    setWeekRecords(updatedRecords); // Update the state with new records
  };

  // Handle task input changes
  const handleTaskChange = (dayIndex, taskIndex, field, value) => {
    const updatedRecords = [...weekRecords];
    updatedRecords[dayIndex].tasks[taskIndex][field] = value;
    setWeekRecords(updatedRecords);
  };

  // Add new day record
  const addNewDayRecord = () => {
    setWeekRecords([
      ...weekRecords,
      {
        date: "",
        shiftStart: "",
        shiftEnd: "",
        tasks: [{ description: "", duration: 0 }],
      },
    ]);
  };

  // Remove day record
  const removeDayRecord = (index) => {
    const updatedRecords = weekRecords.filter((_, i) => i !== index);
    setWeekRecords(updatedRecords);
  };

  // Add new task for a day
  const addNewTask = (dayIndex) => {
    const updatedRecords = [...weekRecords];
    updatedRecords[dayIndex].tasks.push({ description: "", duration: 0 });
    setWeekRecords(updatedRecords);
  };

  // Remove task from a day
  const removeTask = (dayIndex, taskIndex) => {
    const updatedRecords = [...weekRecords];
    updatedRecords[dayIndex].tasks = updatedRecords[dayIndex].tasks.filter(
      (_, i) => i !== taskIndex
    );
    setWeekRecords(updatedRecords);
  };

  // Submit schedule
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmployee) {
      return toast.error("Please select an employee.");
    }

    try {
      const response = await AxiosRequest.post(
        "/api/schedule/createSchedule",
        {
          employee: selectedEmployee,
          weekRecords,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWeekRecords([
        {
          date: "",
          shiftStart: "",
          shiftEnd: "",
          tasks: [{ description: "", duration: 0 }],
        },
      ]);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating schedule:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-[#f0ebe4] font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 max-w-2xl w-full"
      >
        <Card className="p-8 md:-ml-12 lg:-ml-12 max-w-3xl md:w-[70rem] lg:w-[70rem] xl:w-[70rem]  space-y-4 shadow-lg rounded-lg bg-white">
          <Typography variant="h4" className="mb-6 text-black">
            Create Weekly Schedule
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="employee-select-label" sx={{ color: "black" }}>
              Select Employee
            </InputLabel>
            <Select
              labelId="employee-select-label"
              value={selectedEmployee}
              onChange={handleEmployeeSelect}
              label="Select Employee"
              required
              sx={{
                bgcolor: "white",
                borderRadius: "4px",
                "& .MuiSelect-select": {
                  padding: "10px", // Adjust padding if needed
                },
                "&:focus": {
                  borderColor: "teal", // Change focus border color
                  boxShadow: "0 0 0 2px rgba(0, 128, 128, 0.5)", // Adjust focus ring
                },
              }}
            >
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={String(employee._id)}>
                  {`${employee.firstName} ${employee.lastName}`} -{" "}
                  {employee.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Week Records Form */}
          {weekRecords.map((record, index) => (
            <div
              key={index}
              className="p-4 border mb-6 rounded-lg bg-gray-50 shadow-inner"
            >
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="text-black">
                  Day {index + 1}
                </Typography>
                <Button
                  onClick={() => removeDayRecord(index)}
                  variant="outlined"
                  color="red"
                  size="sm"
                >
                  Remove Day
                </Button>
              </div>
              <div className="flex mb-4">
                <Input
                  type="date"
                  label="Date"
                  color="black"
                  value={
                    record.date ? record.date.toISOString().slice(0, 10) : ""
                  } // Format date to YYYY-MM-DD
                  onChange={(e) =>
                    handleWeekRecordChange(index, "date", e.target.value)
                  }
                  className="focus:!ring-0"
                  required
                />
              </div>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <Input
                  type="time"
                  label="Shift Start"
                  value={
                    record.shiftStart
                      ? record.shiftStart.toTimeString().slice(0, 5)
                      : ""
                  } // Format time to HH:MM
                  onChange={(e) =>
                    handleWeekRecordChange(index, "shiftStart", e.target.value)
                  }
                  className="focus:!ring-0"
                  required
                />
                <Input
                  type="time"
                  label="Shift End"
                  value={
                    record.shiftEnd
                      ? record.shiftEnd.toTimeString().slice(0, 5)
                      : ""
                  } // Format time to HH:MM
                  onChange={(e) =>
                    handleWeekRecordChange(index, "shiftEnd", e.target.value)
                  }
                  className="focus:!ring-0"
                  required
                  min={
                    record.shiftStart
                      ? record.shiftStart.toTimeString().slice(0, 5)
                      : ""
                  } // Ensure min value is formatted correctly
                />
              </div>

              {/* Task List for the Day */}
              {record.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="mb-2 rounded-md bg-white">
                  <div className="mb-2 mt-2">
                    <Textarea
                      label="Task Description"
                      value={task.description}
                      onChange={(e) =>
                        handleTaskChange(
                          index,
                          taskIndex,
                          "description",
                          e.target.value
                        )
                      }
                      className="focus:!ring-0 "
                      required
                    />
                  </div>
                  {/* <Input
                                        type="number"
                                        label="Task Duration (minutes)"
                                        value={task.duration}
                                        onChange={(e) => handleTaskChange(index, taskIndex, 'duration', e.target.value)}
                                        className="focus:!ring-0 mb-2"
                                        required
                                    /> */}
                  <div className="flex items-center justify-center space-x-4  flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <div>
                      <Input
                        type="number"
                        label="Hours"
                        value={Math.floor(task.duration / 60) || 0} // Calculate hours
                        onChange={(e) => {
                          const hours = Math.max(0, Number(e.target.value)); // Ensure hours is not negative
                          const currentMinutes = task.duration % 60;

                          // If setting hours to 1, we allow minutes to be 0
                          if (hours === 1 && currentMinutes > 0) {
                            // Update total duration
                            handleTaskChange(
                              index,
                              taskIndex,
                              "duration",
                              hours * 60 + currentMinutes
                            );
                          } else {
                            // Update total duration without changing minutes
                            handleTaskChange(
                              index,
                              taskIndex,
                              "duration",
                              hours * 60 + currentMinutes
                            );
                          }
                        }}
                        className="focus:!ring-0"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="number"
                        label="Minutes"
                        value={task.duration % 60} // Calculate remaining minutes
                        onChange={(e) => {
                          const minutes = Math.max(0, Number(e.target.value)); // Ensure minutes is not negative

                          // Ensure that minutes can only be 0 if hours is 1
                          const currentHours = Math.floor(task.duration / 60);
                          if (minutes === 0 && currentHours < 1) {
                            // Prevent setting minutes to 0 if hours is less than 1
                            return;
                          }

                          // Update total duration
                          handleTaskChange(
                            index,
                            taskIndex,
                            "duration",
                            currentHours * 60 + minutes
                          );
                        }}
                        className="focus:!ring-0"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => removeTask(index, taskIndex)}
                    variant="outlined"
                    color="red"
                    size="sm"
                    className="mt-4"
                  >
                    Remove Task
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => addNewTask(index)}
                variant="outlined"
                color="blue"
                className="mt-4 mb-2"
              >
                Add New Task
              </Button>
            </div>
          ))}

          <Button
            onClick={addNewDayRecord}
            color="teal"
            className="mb-4 w-full"
          >
            Add New Day Record
          </Button>

          {/* Submit Button */}
          <Button onClick={handleSubmit} color="green" className="w-full">
            Create Schedule
          </Button>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateSchedule;
