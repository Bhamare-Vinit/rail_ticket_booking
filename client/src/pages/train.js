//train searching page


import React, { useState, useEffect } from "react";
import { Form, Button, Select, Modal } from "antd";
import { Link } from "react-router-dom";
import "../styles/TrainStyles.css";

import { useNavigate } from "react-router-dom";
import IRCTCLogo from "../pictures/IRCTC-Logo.png";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "../styles/DarkMode.css";

const { Option } = Select;

const Train = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  const [form] = Form.useForm();
  const [queryResult, setQueryResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [directRoutePath, setDirectRoutePath] = useState(null);
  const [noDirectRouteModalVisible, setNoDirectRouteModalVisible] =
    useState(false);

  function routes(values) {
    const adjacencyList = {
      MUMBAI: new Set([
        "DADAR",
        "KALYAN",
        "IGATPURI",
        "NASHIK",
        "JALGAON",
        "BHUSAWAL",
        "NAGPUR",
        "GADCHIROLI",
      ]),
      DADAR: new Set([
        "KALYAN",
        "IGATPURI",
        "NASHIK",
        "JALGAON",
        "BHUSAWAL",
        "NAGPUR",
        "GADCHIROLI",
      ]),
      KALYAN: new Set([
        "IGATPURI",
        "NASHIK",
        "JALGAON",
        "BHUSAWAL",
        "NAGPUR",
        "GADCHIROLI",
      ]),
      NASHIK: new Set(["JALGAON", "BHUSAWAL", "NAGPUR", "GADCHIROLI"]),
      BHUSAWAL: new Set(["NAGPUR", "GADCHIROLI"]),
      PANVEL: new Set([
        "KURLA",
        "KALYAN",
        "PUNE",
        "SATARA",
        "KOLHAPUR",
        "AURANGABAD",
      ]),
      PUNE: new Set(["SATARA", "KOLHAPUR", "AURANGABAD"]),
      KURLA: new Set(["KALYAN", "PUNE", "SATARA", "KOLHAPUR", "AURANGABAD"]),
    };
    const fullGraph = generateFullGraph(adjacencyList);

    const source = values?.SourceStationName?.toUpperCase();
    const destination = values?.DestinationStationName?.toUpperCase();

    const path = dfs(fullGraph, source, destination);

    if (path) {
      console.log("Path found:", path.join(" -> "));
      setDirectRoutePath(path.join(" -> "));
      // Print additional features for each node in the path
      path.forEach((node) => {
        // console.log("Additional features for", node, ":");
      });
    } else {
      console.log(
        "No path found between the given source and destination stations."
      );
      setDirectRoutePath(null);
      setNoDirectRouteModalVisible(true);
    }
  }

  function generateFullGraph(adjacencyList) {
    const fullGraph = {};
    for (const station in adjacencyList) {
      fullGraph[station] = Array.from(adjacencyList[station]);
    }
    return fullGraph;
  }

  function path1(source, destination) {
    if (source === "Panvel" && destination === "Pune") {
      const filteredTrainData = [
        {
          TrainNo: 6106,
          TrainName: "Panvel-Pune EXPRESS",
          SEQ: 13,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "21:38:00",
          DepartureTime: "21:40:00",
          Distance: 104,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "PUNE",
          DestinationStationName: "Pune",
        },
        {
          TrainNo: 16235,
          TrainName: "PN-AU EXPRESS",
          SEQ: 14,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "1:20:00",
          DepartureTime: "1:30:00",
          Distance: 131,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
        {
          TrainNo: 11013,
          TrainName: "PN-KL PASSR",
          SEQ: 1,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "17:38:00",
          DepartureTime: "17:40:00",
          Distance: 189,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "KL",
          DestinationStationName: "Kolhapur",
        },
        // {
        //   TrainNo: 6136,
        //   TrainName: "KN-AU EXPRESS",
        //   SEQ: 6,
        //   StationCode: "KN",
        //   StationName: "Kalyan",
        //   Arrivaltime: "12:30:00",
        //   DepartureTime: "12:35:00",
        //   Distance: 207,
        //   SourceStation: "KN",
        //   SourceStationName: "Kalyan",
        //   DestinationStation: "AU",
        //   DestinationStationName: "Aurangabad",
        // },
      ];

      setQueryResult(filteredTrainData);
    } else if (source === "Kalyan" && destination === "Aurangabad") {
      const filteredTrainData = [
        {
          TrainNo: 6106,
          TrainName: "Panvel-Pune EXPRESS",
          SEQ: 13,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "21:38:00",
          DepartureTime: "21:40:00",
          Distance: 104,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "PUNE",
          DestinationStationName: "Pune",
        },
        {
          TrainNo: 16235,
          TrainName: "PN-AU EXPRESS",
          SEQ: 14,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "1:20:00",
          DepartureTime: "1:30:00",
          Distance: 131,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
        {
          TrainNo: 11013,
          TrainName: "PN-KL PASSR",
          SEQ: 1,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "17:38:00",
          DepartureTime: "17:40:00",
          Distance: 189,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "KL",
          DestinationStationName: "Kolhapur",
        },
        {
          TrainNo: 6136,
          TrainName: "KN-AU EXPRESS",
          SEQ: 6,
          StationCode: "KN",
          StationName: "Kalyan",
          Arrivaltime: "12:30:00",
          DepartureTime: "12:35:00",
          Distance: 207,
          SourceStation: "KN",
          SourceStationName: "Kalyan",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
      ];
      setQueryResult(filteredTrainData);
    } else if (source === "Panvel" && destination === "Satara") {
      const filteredTrainData = [
        {
          TrainNo: 11013,
          TrainName: "PN-KL PASSR",
          SEQ: 1,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "17:38:00",
          DepartureTime: "17:40:00",
          Distance: 189,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "KL",
          DestinationStationName: "Kolhapur",
        },
        {
          TrainNo: 16235,
          TrainName: "PN-AU EXPRESS",
          SEQ: 14,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "1:20:00",
          DepartureTime: "1:30:00",
          Distance: 131,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
      ];
      setQueryResult(filteredTrainData);
    } else if (source === "Panvel" && destination === "Kolhapur") {
      const filteredTrainData = [
        {
          TrainNo: 16235,
          TrainName: "PN-AU EXPRESS",
          SEQ: 14,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "1:20:00",
          DepartureTime: "1:30:00",
          Distance: 131,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
        {
          TrainNo: 11013,
          TrainName: "PN-KL PASSR",
          SEQ: 1,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "17:38:00",
          DepartureTime: "17:40:00",
          Distance: 189,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "KL",
          DestinationStationName: "Kolhapur",
        },
        {
          TrainNo: 6136,
          TrainName: "KN-AU EXPRESS",
          SEQ: 6,
          StationCode: "KN",
          StationName: "Kalyan",
          Arrivaltime: "12:30:00",
          DepartureTime: "12:35:00",
          Distance: 207,
          SourceStation: "KN",
          SourceStationName: "Kalyan",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
      ];
      setQueryResult(filteredTrainData);
    } else if (source === "Panvel" && destination === "Aurangabad") {
      const filteredTrainData = [
        {
          TrainNo: 16235,
          TrainName: "PN-AU EXPRESS",
          SEQ: 14,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "1:20:00",
          DepartureTime: "1:30:00",
          Distance: 131,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
      ];
      setQueryResult(filteredTrainData);
    } else if (source === "Pune" && destination === "Aurangabad") {
      const filteredTrainData = [
        {
          TrainNo: 16235,
          TrainName: "PN-AU EXPRESS",
          SEQ: 14,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "1:20:00",
          DepartureTime: "1:30:00",
          Distance: 131,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
      ];

      setQueryResult(filteredTrainData);
    } else if (source === "Pune" && destination === "Satara") {
      const filteredTrainData = [
        {
          TrainNo: 16235,
          TrainName: "PN-AU EXPRESS",
          SEQ: 14,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "1:20:00",
          DepartureTime: "1:30:00",
          Distance: 131,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
        {
          TrainNo: 11013,
          TrainName: "PN-KL PASSR",
          SEQ: 1,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "17:38:00",
          DepartureTime: "17:40:00",
          Distance: 189,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "KL",
          DestinationStationName: "Kolhapur",
        },
        {
          TrainNo: 6136,
          TrainName: "KN-AU EXPRESS",
          SEQ: 6,
          StationCode: "KN",
          StationName: "Kalyan",
          Arrivaltime: "12:30:00",
          DepartureTime: "12:35:00",
          Distance: 207,
          SourceStation: "KN",
          SourceStationName: "Kalyan",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
      ];

      setQueryResult(filteredTrainData);
    } else if (source === "Pune" && destination === "Kolhapur") {
      const filteredTrainData = [
        {
          TrainNo: 6136,
          TrainName: "KN-AU EXPRESS",
          SEQ: 6,
          StationCode: "KN",
          StationName: "Kalyan",
          Arrivaltime: "12:30:00",
          DepartureTime: "12:35:00",
          Distance: 207,
          SourceStation: "KN",
          SourceStationName: "Kalyan",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
        {
          TrainNo: 16235,
          TrainName: "PN-AU EXPRESS",
          SEQ: 14,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "1:20:00",
          DepartureTime: "1:30:00",
          Distance: 131,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "AU",
          DestinationStationName: "Aurangabad",
        },
        {
          TrainNo: 11013,
          TrainName: "PN-KL PASSR",
          SEQ: 1,
          StationCode: "PN",
          StationName: "Panvel",
          Arrivaltime: "17:38:00",
          DepartureTime: "17:40:00",
          Distance: 189,
          SourceStation: "PN",
          SourceStationName: "Panvel",
          DestinationStation: "KL",
          DestinationStationName: "Kolhapur",
        },
      ];

      setQueryResult(filteredTrainData);
    } else {
      // Fetch data from database based on source and destination
      fetchTrainDataFromDatabase(source, destination);
    }
  }

  async function fetchTrainDataFromDatabase(source, destination) {
    const apiUrl = `/api/v1/analytics/train-ctrl?SourceStationName=${source}&DestinationStationName=${destination}`;

    try {
      setLoading(true);
      console.log("API URL:", apiUrl);
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("API Response:", data);
      setQueryResult(data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function dfs(graph, source, destination, visited = new Set(), path = []) {
    visited.add(source);
    path.push(source);

    if (source === destination) {
      return path;
    }

    if (!graph[source] || !graph[source].length) {
      return null;
    }

    for (const neighbor of graph[source]) {
      if (!visited.has(neighbor)) {
        const newPath = dfs(
          graph,
          neighbor,
          destination,
          new Set(visited),
          path.slice()
        );
        if (newPath) {
          return newPath;
        }
      }
    }

    return null;
  }

  const onFinish = async (values) => {
    const apiUrl = `/api/v1/analytics/train-ctrl?SourceStationName=${values.SourceStationName}&DestinationStationName=${values.DestinationStationName}`;

    try {
      setLoading(true);
      console.log("API URL:", apiUrl);
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("API Response:", data);
      setQueryResult(data);
      routes(values);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
    path1(values.SourceStationName, values.DestinationStationName);
  };

  const handleSubmit = async (values) => {
    routes(values);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    form.setFieldsValue({
      [name]: value,
    });
  };

  const allStates = [
    "Mumbai",
    "Thane",
    "Kalyan",
    "Dadar",
    "Igatpuri",
    "Nashik",
    "Jalgaon",
    "Bhusawal",
    "Nagpur",
    "Pune",
    "Dhule",
    "Satara",
    "Panvel",
    "Kurla",
    "Manmad",
    "Kolhapur",
    "Gadchiroli",
    "Ahmednagar",
    "Aurangabad",
    "Ratnagiri",
    "Borivali",
    "Ammalner",
    "Lonavala",
    "Chalisgaon",
    "Muktainagar",
    "Andheri",
    "Govandi",
    "Delhi",
    "Ahemdabad",
    "Channai",
    "Kolkata",
    "Indor",
    "Banglore",
    "Noida",
  ];

  const allState = [
    "Mumbai",
    "Thane",
    "Kalyan",
    "Dadar",
    "Igatpuri",
    "Nashik",
    "Jalgaon",
    "Bhusawal",
    "Nagpur",
    "Pune",
    "Dhule",
    "Satara",
    "Panvel",
    "Kurla",
    "Manmad",
    "Kolhapur",
    "Gadchiroli",
    "Ahmednagar",
    "Aurangabad",
    "Ratnagiri",
    "Borivali",
    "Ammalner",
    "Lonavala",
    "Chalisgaon",
    "Muktainagar",
    "Andheri",
    "Govandi",
    "Delhi",
    "Ahemdabad",
    "Channai",
    "Kolkata",
    "Indor",
    "Banglore",
    "Noida",
  ];

  return (
    <div>
      <header className="main_header fixed_header">
        <div className="container">
          <div className="logo_head">
            <img src={IRCTCLogo} alt="IRCTC Logo" className="logo-img" />
            <p className="display-4"> IRCTC Portal</p>
            <div className="dark_mode">
              <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
              />
              <label className="dark_mode_label" htmlFor="darkmode-toggle">
                <Sun />
                <Moon />
              </label>
            </div>
            <div>
              <p>Current Time: {formattedTime}</p>
            </div>
          </div>
          <div className="menu_box">
            <nav className="top_nav_links navbar navbar-expand-lg">
              <div className="collapse navbar-collapse" id="topNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/history" className="nav-link">
                      History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className="nav-link">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Contacts" className="nav-link">
                      Contacts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Contacts" className="nav-link">
                      Trust
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      SignOut
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div
        className="train-container"
        style={{
          backgroundImage: 'url("train.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 600,
          width: 1600,
        }}
      >
        <div className="train-container ">
          <div className="train-sub ">
            <h2>Search Your Train Based On The Source And Destination</h2>
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                name="SourceStationName"
                label="Select Source"
                onChange={handleChange}
              >
                <Select style={{ width: "100%" }}>
                  {allStates.map((state) => (
                    <Option key={state} value={state}>
                      {state}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="DestinationStationName"
                label="Select Destination"
                onChange={handleChange}
              >
                <Select style={{ width: "100%" }}>
                  {allState.map((state) => (
                    <Option key={state} value={state}>
                      {state}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>

            {loading && <p>Loading...</p>}
            {directRoutePath && (
              <div className="direct-route-container">
                <p>{directRoutePath}</p>
              </div>
            )}

            {!loading && queryResult.length > 0 ? (
              <div className="query-result">
                <h3>Available Trains</h3>
                <table style={{ backgroundColor: "white" }}>
                  <thead>
                    <tr>
                      <th>Train Code</th>
                      <th>Train Name</th>
                      <th>Station Code</th>
                      <th>Station Name</th>
                      <th>Arrival Time</th>
                      <th>Departure Time</th>
                      <th>Source Station Code</th>
                      <th>Source Station Name</th>
                      <th>Destination Station Code</th>
                      <th>Destination Station Name</th>
                      <th>Book</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryResult.map((resultItem, index) => (
                      <tr key={index}>
                        <td>{resultItem.TrainNO}</td>
                        <td>{resultItem.TrainName}</td>
                        <td>{resultItem.StationCode}</td>
                        <td>{resultItem.StationName}</td>
                        <td>{resultItem.Arrivaltime}</td>
                        <td>{resultItem.DepartureTime}</td>
                        <td>{resultItem.SourceStation}</td>
                        <td>{resultItem.SourceStationName}</td>
                        <td>{resultItem.DestinationStation}</td>
                        <td>{resultItem.DestinationStationName}</td>
                        <td>
                          <Link
                            to="/add-ticket"
                            className="btn btn-success w-100 rounded-0"
                          >
                            Book
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            <Modal
              title="Direct Route Available"
              visible={noDirectRouteModalVisible}
              onOk={() => setNoDirectRouteModalVisible(false)}
              onCancel={() => setNoDirectRouteModalVisible(false)}
            >
              <p>Route is available for the selected source and destination.</p>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Train;
