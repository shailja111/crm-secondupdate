import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

import { CircularProgress } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import { IoSearchSharp } from "react-icons/io5";
import { MdFilterListAlt } from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MyContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaListUl } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import {

  faPlus,
} from "@fortawesome/free-solid-svg-icons"; // Import the icon
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchLeads, fetchLeadStatuses } from "../../redux/leadsSlice";
import Calendar from "react-calendar";
import AddStage from "./AddStage/AddStage";

function Leads() {

  const dispatch = useDispatch();
  const { leads = [], loading, error, leadStatuses } = useSelector((state) => state.leads);
  const { handleAddLeadShow, handleFilterShow } = useContext(MyContext);
  const [durationOption, setDurationOption] = useState("");
  const [isCustomRange, setIsCustomRange] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [searchText, setSearchText] = useState('')
  const [isAddStageModalOpen, setAddStageModal] = useState(false);

  const [filteredLeads, setFilteredLeads] = useState({});

  const [filteredData, setFilteredData] = useState([]);
  const [leadStages, setLeadStages] = useState([]);

 

  const addLeadStage = (newStage) => {
    setLeadStages([...leadStages, newStage]);
    setFilteredLeads((prevState) => ({
        ...prevState,
        [newStage]: [], // Initialize empty leads for the new stage
    }));
};
  const handleAddStageOpen = () => {
    setAddStageModal(true);
  }

  const handleAddStageClose = () => {
    setAddStageModal(false);
  }


  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchLeadStatuses());
  }, [dispatch]);


useEffect(() => {
  if (leads.length) {
    let data = [...leads];

    // Apply date filtering if startDate and endDate are provided
    if (startDate && endDate) {
      data = data.filter((lead) => {
        const leadDate = new Date(lead.CreatedTime);
        return leadDate >= startDate && leadDate <= endDate;
      });
    }

    // Apply search filtering if searchText is provided
    if (searchText.trim()) {
      data = data.filter((lead) =>
        Object.values(lead).join(" ").toLowerCase().includes(searchText.toLowerCase())
      );
    }

    
    data.sort((a, b) => new Date(b.CreatedTime) - new Date(a.CreatedTime));

    setFilteredData(data);

    
    const groupedLeads = leadStatuses.reduce((acc, status) => {
      acc[status.StatusName] = data.filter((lead) => String(lead.LeadsStatus) === String(status.Id));
      return acc;
    }, {});
    
    setFilteredLeads(groupedLeads);
    console.log("groupedLeads", groupedLeads)
  }
}, [leads, startDate, endDate, searchText, leadStatuses]);
 // Add searchText to the dependency array

 

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
  }


  const handleFilterClick = () => {
    if (handleFilterShow) {
      handleFilterShow();
    }
    else {
      console.error("handleFilterShow function is not available in context");
    }
  }



  const handleAddLeadsClick = () => {
    if (handleAddLeadShow) {
      handleAddLeadShow(); // Ensure the function is called correctly
    } else {
      console.error("handleAddLeadShow function is not available in context");
    }
  };


  const handlePresetRange = (option) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    let start = null;
    let end = today;

    switch (option) {
      case "today":
        start = today;
        end = endOfDay;
        break;
      case "last30":
        start = new Date(today);
        start.setDate(today.getDate() - 30);
        break;
      case "thisMonth":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case "lastMonth":
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        break;
      case "last90":
        start = new Date(today);
        start.setDate(today.getDate() - 90);
        break;
      case "last6Months":
        start = new Date(today);
        start.setMonth(today.getMonth() - 6);
        break;
      case "last1Year":
        start = new Date(today);
        start.setFullYear(today.getFullYear() - 1);
        break;
      default:
        break;
    }

    setStartDate(start);
    setEndDate(end);
    //setLoading(false);
  };


  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await axios.put("Leads/UpdateLeadStatus", {
        LeadId: leadId,
        LeadsStatus: newStatus,
        UserID: "1",
      });
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  const handleDurationChange = (event) => {
    const selectedOption = event.target.value;
    setDurationOption(selectedOption);

    if (selectedOption === "custom") {
      setIsCustomRange(true);
      setStartDate(null); // Reset start date
      setEndDate(null);   // Reset end date
      setIsCalendarVisible(true); // Show calendar for custom date selection
      //setLoading(false);
    } else {
      setIsCustomRange(false);
      setIsCalendarVisible(false); // Hide calendar for preset options
      handlePresetRange(selectedOption); // Set dates based on preset option
      //setLoading(true);
    }
  };


  const handleStartDateChange = (date) => {
    setStartDate(date);


    if (date && endDate) {
      setIsCustomRange(false);
      //setLoading(true);
      setIsCalendarVisible(false);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    // Hide calendar after selecting end date

    if (startDate && date) {
      setIsCustomRange(false); // Disable custom range if both dates are set
      //setLoading(true);
      setIsCalendarVisible(false);
    }
  };
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination || !filteredLeads[source.droppableId] || !filteredLeads[destination.droppableId]) {
      console.error("Droppable ID not found in filteredLeads");
      return;
  }

    const sourceItems = Array.from(filteredLeads[source.droppableId] || []);
    const [movedItem] = sourceItems.splice(source.index, 1);

    if (!movedItem) {
      console.error("Moved item is undefined");
      return;
  }

    const destinationItems = Array.from(filteredLeads[destination.droppableId] || []);
    destinationItems.splice(destination.index, 0, movedItem);

    setFilteredLeads((prev) => ({
      ...prev,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destinationItems,
    }));

    // Update the lead status when dragged to a new column
    const destinationStatusId = leadStatuses.find(
      (status) => status.StatusName === destination.droppableId
    )?.Id;

    if (destinationStatusId !== undefined) {
      updateLeadStatus(movedItem.Id, destinationStatusId); // Update the status of the moved item
    }

    

  
console.log("Moving item", movedItem, "from", source.droppableId, "to", destination.droppableId);

  
  };

  if (loading) {
    return (
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    return <p>Error fetching data!</p>;
  }


  return (
    <>
      <div className="leads-homepage">
        <div className="date-search">
          <p>Duration</p>
          <div className="d-flex date-select">
            <select
              className="form-control mr-sm-2 mt-1"
              onChange={handleDurationChange}
              value={durationOption}

            >
              <option value="">Select Duration</option>
              <option value="today">Today</option>
              <option value="last30">Last 30 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="last90">Last 90 Days</option>
              <option value="last6Months">Last 6 Months</option>
              <option value="last1Year">Last 1 Year</option>
              <option value="custom">Custom Range</option>
            </select>

            {isCustomRange && (
              <div className="custom-range d-flex align-items-center ml-2 position-relative">
                <div className="calendar-container d-flex" id="km" style={{
                  position: 'relative',
                  top: '160px', zIndex: '99'
                }}
                >
                  <div className="calendar-box">
                    <p>Start Date</p>
                    <Calendar
                      value={startDate}
                      onChange={handleStartDateChange}
                      maxDate={endDate} // Set the max date to be the end date
                    />
                  </div>
                  <div className="calendar-box">
                    <p>End Date</p>
                    <Calendar
                      value={endDate}
                      onChange={handleEndDateChange}
                      minDate={startDate} // Set the min date to be the start date
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="type-search" id="type-search">
          <p className="flex-item1">Type</p>
          <div className="select-li flex-item1">
            <select name="cars" id="cars">
              <option value="volvo">All</option>
              <option value="saab">Leads</option>
              <option value="mercedes">Client</option>
            </select>
          </div>
        </div>

        <div className="status-search" id="status-search">
          <div className="search-bar">
            <div className="icon-search">
              <IoSearchSharp />
            </div>
            <input
              type="text"
              className="form-control f-14 p-1 border-additional-grey"
              id="search-text-field"
              placeholder="Start typing to search"
              autoComplete="off"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div
          className="filter-div ml-auto d-flex align-items-center"
          id="filter-div"
        >
          <div className="">
            <button className="filter" onClick={handleFilterClick}><MdFilterListAlt className="filter-icon  " />

              Filter</button>

          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-8 col-6">
          <ul className="leads-buttons">
            <li>
              {/* Trigger the Add Leads Offcanvas */}
              <button
                className="btn btn-primary"
                onClick={handleAddLeadsClick}
              >
                <FontAwesomeIcon icon={faPlus} id="add-icon" />
                ADD Leads
              </button>
            </li>
            <li>
              <button
                className="btn btn-primary-add-stage" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap" onClick={handleAddStageOpen}>
                <FontAwesomeIcon icon={faPlus} id="add-icon" />
                Add Stage
              </button>
            </li>
            {isAddStageModalOpen && <AddStage onClose={handleAddStageClose}  addLeadStage={addLeadStage}  />}
          </ul>
        </div>

        <div className="col-md-4 col-6">
          <ul className="icon-right">
            <li className="icons-together">
              <Link to="/leadshomepage" className="pagal">
                <button className="btn btn-primary">
                  <FaListUl />
                </button>
              </Link>
              <Link to="/leads" className="pagal">
                <button className="btn btn-primary">
                  <FaChartBar />
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container-fluid">
          <div className="leads-container row">
             {/* Explicitly render "Leads" column */}
             <div className="col-md-3">
              <div className="column">
                <h2>Leads ({leads.length})</h2>
                <Droppable droppableId="Leads">
                  {(provided) => (
                    <div className="leads-list" {...provided.droppableProps} ref={provided.innerRef}>
                       {filteredData.map((ad, index) => (
                        <Draggable key={String(ad.Id)} draggableId={String(ad.Id)} index={index}>
                          {(provided, snapshot) => {
                              const draggingStyle = snapshot.isDragging
                                ? {
                                  ...provided.draggableProps.style,
                                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                                  transform: "scale(1.05)",
                                  transition: "transform 0.1s ease-out",
                                  zIndex: 1000,
                                }
                                : {};

                              return (
                                <div
                                  className="lead-card"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...draggingStyle,
                                    ...provided.draggableProps.style,
                                    borderLeft: ad?.Platform === "ig"
                                      ? "5px solid #e1306c"
                                      : ad?.Platform === "fb"
                                        ? "5px solid #426782"
                                        : "5px solid #bbd3f6",
                                  }}
                                >
                                  <div
                                    className={`background-image ${ad?.Platform === "Self" ? "self-platform" : ""}`}
                                    style={{
                                      backgroundImage: `url(${ad?.Platform === "Self"
                                        ? "https://flyclipart.com/thumbs/security-shield-user-icon-circle-1715684.png"
                                        : ad?.Platform === "ig"
                                          ? "https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266_640.jpg"
                                          : ad?.Platform === "fb"
                                            ? "https://logowik.com/content/uploads/images/672_fb_icon.jpg"
                                            : ""
                                        })`,
                                      opacity: snapshot.isDragging ? 0.3 : 0.5,
                                      backgroundSize: ad?.Platform === "ig" ? "120px" : ad?.Platform === "self" ? "200px" : "160px",
                                      marginRight: ad?.Platform === "fb" ? "-20px" : "0px",
                                      marginBottom: ad?.Platform === "Self" ? "11px" : "0px",
                                    }}
                                  ></div>
                                  <div className="lead-content">
                                    <p><strong>Ad:</strong> {ad.AdName?.slice(0, 26)}...</p>
                                    <p><strong>Name:</strong> {ad.FullName}</p>
                                    <p><strong>Phone:</strong> {ad.PhoneNumber}</p>
                                    <p><strong>Email:</strong> {ad.Email}</p>
                                    <p><strong>City:</strong> {ad.City}</p>
                                    <p><strong>Time:</strong> {new Date(ad.CreatedTime).toLocaleString()}</p>
                                  </div>
                                </div>
                              );
                            }}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable> 
              </div>
            </div>
            {Object.entries(filteredLeads).map(([columnId, items]) => (
              <div className="col-md-3" key={columnId}>
                <div className="column">
                <h2>{columnId} ({items.length})</h2>

                  {/* Droppable only wraps leads-list */}
                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <div className="leads-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((ad, index) => (
                          <Draggable key={String(ad.Id)} draggableId={String(ad.Id)} index={index}>
                            {(provided, snapshot) => {
                              const draggingStyle = snapshot.isDragging
                                ? {
                                  ...provided.draggableProps.style,
                                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                                  transform: "scale(1.05)",
                                  transition: "transform 0.1s ease-out",
                                  zIndex: 1000,
                                }
                                : {};

                              return (
                                <div
                                  className="lead-card"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    ...draggingStyle,
                                    ...provided.draggableProps.style,
                                    borderLeft: ad?.Platform === "ig"
                                      ? "5px solid #e1306c"
                                      : ad?.Platform === "fb"
                                        ? "5px solid #426782"
                                        : "5px solid #bbd3f6",
                                  }}
                                >
                                  <div
                                    className={`background-image ${ad?.Platform === "Self" ? "self-platform" : ""}`}
                                    style={{
                                      backgroundImage: `url(${ad?.Platform === "Self"
                                        ? "https://flyclipart.com/thumbs/security-shield-user-icon-circle-1715684.png"
                                        : ad?.Platform === "ig"
                                          ? "https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266_640.jpg"
                                          : ad?.Platform === "fb"
                                            ? "https://logowik.com/content/uploads/images/672_fb_icon.jpg"
                                            : ""
                                        })`,
                                      opacity: snapshot.isDragging ? 0.3 : 0.5,
                                      backgroundSize: ad?.Platform === "ig" ? "120px" : ad?.Platform === "self" ? "200px" : "160px",
                                      marginRight: ad?.Platform === "fb" ? "-20px" : "0px",
                                      marginBottom: ad?.Platform === "Self" ? "11px" : "0px",
                                    }}
                                  ></div>
                                  <div className="lead-content">
                                    <p><strong>Ad:</strong> {ad.AdName?.slice(0, 26)}...</p>
                                    <p><strong>Name:</strong> {ad.FullName}</p>
                                    <p><strong>Phone:</strong> {ad.PhoneNumber}</p>
                                    <p><strong>Email:</strong> {ad.Email}</p>
                                    <p><strong>City:</strong> {ad.City}</p>
                                    <p><strong>Time:</strong> {new Date(ad.CreatedTime).toLocaleString()}</p>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DragDropContext>


    </>
  );
}

export default Leads;
