import React, { useState } from 'react';
import axios from 'axios'
import { API_PATH } from '../data/apipath';
import Navbar from '../pages/Navbar';

const AddMechanicForm = () => {
    const [mechanicname,setMechanicname] = useState('')
    const [mechanicmobile,setMechanicMobile] = useState('')
    const [mechanicexpertise,setMechanicExpertise] = useState("General")
    const [yearsofexp,setYearsExp] = useState('1')

    const handlesubmit = async(e)=>{
        e.preventDefault()
        const formData = {
            mechanicname,
            mechanicmobile,
            mechanicexpertise,
            yearsofexp
        }


        try{
            const response = await axios.post(`${API_PATH}/mech/addmech`,formData,{
                headers:{
                    'Content-Type':"application/json"
                }
            })
            if(response.status===200){
                console.log("mechanic added successfully")
                alert("mechanic added successfully")
                window.location.reload()
            }
            else{
                console.log("mechanic adding failed")
                alert("mechanic adding failed")
            }
        }
        catch(error){
            console.log("error saving mechanic",error)
            alert("error saving mechanic")
        }
    }

  return (
    <>
    <Navbar/>
    <div className="form-container">
      <h2 className="form-title">Add Mechanic</h2>
      <form onSubmit={handlesubmit} className="mechanic-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={mechanicname} onChange={(e)=>setMechanicname(e.target.value)} placeholder="Enter mechanic name" className="form-input" />
        </div>

        <div className="form-group">
          <label>Mobile:</label>
          <input type="text" value={mechanicmobile} onChange={(e)=>setMechanicMobile(e.target.value)} placeholder="Enter mechanic mobile" className="form-input" />
        </div>

        <div className="form-group">
          <label>Expertise:</label>
          <select className='form-select' value={mechanicexpertise} onChange={(e)=>setMechanicExpertise(e.target.value)}>
       <option value="general">General</option>
       <option value="bike_chain_repair">Bike Chain Repair</option>
       <option value="bike_brake_replacement">Bike Brake Replacement</option>
       <option value="bike_engine_tuning">Bike Engine Tuning</option>
       <option value="bike_tire_puncture_repair">Bike Tire Puncture Repair</option>
       <option value="bike_fuel_system_cleaning">Bike Fuel System Cleaning</option>
       <option value="bike_suspension_repair">Bike Suspension Repair</option>
       <option value="bike_battery_replacement">Bike Battery Replacement</option>
       <option value="bike_headlight_replacement">Bike Headlight Replacement</option>
       <option value="bike_clutch_plate_replacement">Bike Clutch Plate Replacement</option>
       <option value="bike_exhaust_system_repair">Bike Exhaust System Repair</option>
       
       <option value="car_engine_diagnostics">Car Engine Diagnostics</option>
       <option value="car_battery_replacement">Car Battery Replacement</option>
       <option value="car_brake_system_repair">Car Brake System Repair</option>
       <option value="car_suspension_repair">Car Suspension Repair</option>
       <option value="car_ac_repair">Car AC Repair</option>
       <option value="car_transmission_repair">Car Transmission Repair</option>
       <option value="car_fuel_injection_service">Car Fuel Injection Service</option>
       <option value="car_radiator_flushing">Car Radiator Flushing</option>
       <option value="car_exhaust_system_repair">Car Exhaust System Repair</option>
       <option value="car_oil_change">Car Oil Change</option>
       <option value="car_wheel_alignment">Car Wheel Alignment</option>
       <option value="car_window_motor_replacement">Car Window Motor Replacement</option>
       <option value="car_starter_motor_repair">Car Starter Motor Repair</option>
       <option value="car_power_steering_repair">Car Power Steering Repair</option>
       <option value="car_dashboard_electrical_fixing">Car Dashboard Electrical Fixing</option>
       
       
       <option value="auto_engine_tuning">Auto Engine Tuning</option>
       <option value="auto_brake_adjustment">Auto Brake Adjustment</option>
       <option value="auto_suspension_repair">Auto Suspension Repair</option>
       <option value="auto_tire_replacement">Auto Tire Replacement</option>
       <option value="auto_fuel_system_check">Auto Fuel System Check</option>
       <option value="auto_transmission_repair">Auto Transmission Repair</option>
       <option value="auto_ignition_system_fix">Auto Ignition System Fix</option>
       <option value="auto_battery_replacement">Auto Battery Replacement</option>
       <option value="auto_headlight_and_taillight_replacement">Auto Headlight & Taillight Replacement</option>
       
       
       <option value="vehicle_oil_change">Oil Change</option>
       <option value="vehicle_tire_rotation">Tire Rotation</option>
       <option value="vehicle_diagnostic_check">Diagnostic Check</option>
       <option value="vehicle_spark_plug_replacement">Spark Plug Replacement</option>
       <option value="vehicle_cooling_system_flush">Cooling System Flush</option>
       <option value="vehicle_timing_belt_replacement">Timing Belt Replacement</option>
       <option value="vehicle_air_filter_replacement">Air Filter Replacement</option>
       <option value="vehicle_bearing_and_joint_repair">Bearing & Joint Repair</option>
       <option value="vehicle_hydraulic_system_fix">Hydraulic System Fix</option>
       <option value="vehicle_electrical_wiring_repair">Electrical Wiring Repair</option>
       <option value="vehicle_steering_alignment">Steering Alignment</option>
       <option value="vehicle_dashboard_repair">Dashboard Repair</option>
       <option value="vehicle_body_painting_and_denting">Body Painting & Denting</option>
       </select>
 
        </div>

        <div className="form-group">
          <label>Years of Experience:</label>
          <select value={yearsofexp} className="form-select" onChange={(e)=>setYearsExp(e.target.value)}>
            {[...Array(15)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} Years
              </option>
            ))}
          </select>
        </div>

        <button type='submit' className="submit-btn">Add Mechanic</button>
      </form>
    </div>
    </>
  );
};

export default AddMechanicForm;
