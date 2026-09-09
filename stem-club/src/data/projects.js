export const projects = [
  {
    id: 'smart-irrigation-system',
    title: 'Smart Irrigation System',
    category: 'IoT',
    status: 'Completed',
    summary: 'IoT-based automatic plant watering using soil moisture sensors and ESP32.',
    description: 'An intelligent irrigation system that monitors soil moisture levels in real-time and automatically activates water pumps when the soil becomes dry. The system uses ESP32 microcontrollers connected to capacitive soil moisture sensors to collect data, which is then processed to determine optimal watering schedules.',
    problem: 'Traditional irrigation methods waste significant amounts of water due to fixed schedules that do not account for actual soil conditions, weather patterns, or plant-specific needs. Over-watering leads to waterlogging and nutrient leaching, while under-watering stresses plants and reduces yield.',
    solution: 'The Smart Irrigation System uses a network of soil moisture sensors connected to an ESP32 microcontroller to continuously monitor moisture levels. When readings fall below a configurable threshold, the system activates solenoid valves to deliver water precisely where needed. Data is logged for analysis and the system can be monitored remotely via a web dashboard.',
    technologies: ['ESP32', 'Soil Moisture Sensors', 'IoT', 'Automation', 'Relay Modules', 'Web Dashboard'],
    howItWorks: [
      'Capacitive soil moisture sensors are placed at root depth in each zone',
      'ESP32 reads sensor data at regular intervals and processes readings',
      'If moisture drops below the set threshold, the relay module activates the water pump',
      'Data is transmitted to a local server for logging and visualization',
      'A web-based dashboard displays real-time moisture levels and watering history'
    ],
    results: [
      'Successfully automated watering for a test garden with multiple plant zones',
      'Reduced water consumption compared to manual schedule-based watering',
      'Demonstrated reliable sensor readings across varying soil conditions',
      'Built a functional web dashboard for remote monitoring'
    ],
    futureImprovements: [
      'Integration with weather forecast APIs to prevent watering before rain',
      'Solar-powered sensor nodes for off-grid deployment',
      'Machine learning model to predict optimal watering times',
      'Mobile application for notifications and remote control'
    ],
    image: null,
    color: '#10b981'
  },
  {
    id: 'weather-monitoring-station',
    title: 'Weather Monitoring Station',
    category: 'IoT',
    status: 'Completed',
    summary: 'A system capable of measuring temperature, humidity, and atmospheric pressure.',
    description: 'A compact weather monitoring station built using microcontrollers and environmental sensors. The station measures temperature, humidity, and atmospheric pressure in real-time, displays readings on an LCD screen, and logs data for trend analysis and visualization.',
    problem: 'Understanding local weather patterns is important for agriculture, outdoor activities, and environmental studies. Commercial weather stations can be expensive and often do not allow access to raw data for educational analysis and experimentation.',
    solution: 'The Weather Monitoring Station uses affordable sensors connected to a microcontroller to collect environmental data. A DHT22 sensor measures temperature and humidity, while a BMP280 sensor captures atmospheric pressure. Data is displayed locally on an LCD and transmitted to a computer for logging and graphing.',
    technologies: ['DHT22 Sensor', 'BMP280 Sensor', 'Arduino', 'LCD Display', 'IoT', 'Data Visualization'],
    howItWorks: [
      'DHT22 sensor measures ambient temperature and relative humidity',
      'BMP280 barometric pressure sensor measures atmospheric pressure and altitude',
      'Arduino microcontroller reads sensor data via digital and I2C interfaces',
      'Current readings are displayed on a 16x2 LCD screen',
      'Data is transmitted via serial connection to a computer for logging',
      'A Python script generates graphs showing trends over time'
    ],
    results: [
      'Built a fully functional weather station with three measurement capabilities',
      'Collected and graphed environmental data over extended periods',
      'Demonstrated accurate readings when compared with standard instruments',
      'Students learned sensor interfacing, data collection, and visualization'
    ],
    futureImprovements: [
      'Add wind speed and direction measurement using an anemometer',
      'Implement wireless data transmission using ESP32 or LoRa',
      'Build a web-based dashboard for remote access to weather data',
      'Add rainfall measurement capability'
    ],
    image: null,
    color: '#0ea5e9'
  },
  {
    id: 'line-following-robot',
    title: 'Line Following Robot',
    category: 'Robotics',
    status: 'Completed',
    summary: 'An autonomous robot capable of following a predefined path using sensors.',
    description: 'A mobile robot that autonomously follows a line drawn on the ground using infrared sensors. The robot adjusts its speed and direction in real-time based on sensor readings to stay on course, demonstrating fundamental concepts of robotics, sensor integration, and control systems.',
    problem: 'Teaching robotics concepts requires hands-on experience with sensor-based decision making, motor control, and autonomous behavior. A line-following robot is an ideal platform for learning these concepts while producing a tangible, demonstrable result.',
    solution: 'The robot uses an array of infrared sensors mounted on its underside to detect the contrast between a dark line and a light surface. A microcontroller processes the sensor readings and adjusts the speed of two DC motors through an H-bridge motor driver to steer the robot along the line.',
    technologies: ['Arduino', 'IR Sensors', 'DC Motors', 'H-Bridge Driver', 'Robotics', 'Control Systems'],
    howItWorks: [
      'An array of IR sensors detects the reflectivity difference between the line and surface',
      'The Arduino reads analog values from each sensor to determine line position',
      'A proportional control algorithm calculates the required steering correction',
      'Motor speeds are adjusted via PWM signals through the L298N motor driver',
      'The robot continuously corrects its path to stay centered on the line'
    ],
    results: [
      'Built a robot that successfully follows straight lines, curves, and sharp turns',
      'Implemented a proportional control algorithm for smooth steering',
      'Students gained practical experience with sensor calibration and motor control',
      'Demonstrated the robot at school events and exhibitions'
    ],
    futureImprovements: [
      'Implement PID control for smoother and faster line tracking',
      'Add intersection detection and decision-making capabilities',
      'Integrate obstacle avoidance using ultrasonic sensors',
      'Build a wireless interface for remote monitoring and parameter tuning'
    ],
    image: null,
    color: '#f59e0b'
  },
  {
    id: 'smart-home-automation',
    title: 'Smart Home Automation',
    category: 'IoT',
    status: 'In Progress',
    summary: 'A connected automation system allowing appliances to be controlled using Wi-Fi, mobile interfaces and sensors.',
    description: 'A home automation system that enables remote control of electrical appliances through a mobile interface and automated triggers based on sensor data. The system uses an ESP32 microcontroller as the central hub, connecting to relays that control lights, fans, and other devices.',
    problem: 'Conventional home electrical systems lack remote control capabilities and intelligent automation. Manually operating switches is inconvenient and does not allow for energy-saving automation such as turning off lights when no one is present.',
    solution: 'The Smart Home Automation system connects household appliances to relay modules controlled by an ESP32 microcontroller. Users can toggle devices through a mobile web interface served by the ESP32. Additionally, PIR motion sensors and light-dependent resistors enable automatic control based on occupancy and ambient light levels.',
    technologies: ['ESP32', 'Relay Modules', 'Wi-Fi', 'PIR Sensors', 'LDR', 'Mobile Web Interface'],
    howItWorks: [
      'ESP32 hosts a web server accessible on the local Wi-Fi network',
      'Relay modules are wired in series with appliance power lines',
      'The web interface displays toggle buttons for each connected device',
      'PIR sensors detect room occupancy for automatic lighting control',
      'LDR sensors measure ambient light to adjust artificial lighting',
      'All state changes are logged and displayed in the interface'
    ],
    results: [
      'Successfully controlled multiple appliances from a smartphone browser',
      'Implemented motion-activated lighting in a test setup',
      'Built a responsive mobile web interface for device management',
      'Demonstrated the concept at the school science exhibition'
    ],
    futureImprovements: [
      'Add voice control integration using Google Assistant or Alexa',
      'Implement scheduling and timer-based automation',
      'Add energy consumption monitoring per device',
      'Develop a dedicated mobile application'
    ],
    image: null,
    color: '#06b6d4'
  },
  {
    id: 'renewable-energy-model',
    title: 'Renewable Energy Model',
    category: 'Renewable Energy',
    status: 'In Progress',
    summary: 'A working educational model demonstrating sustainable energy generation using solar and wind technologies.',
    description: 'An educational demonstration model that generates electricity using small-scale solar panels and a wind turbine. The model includes a charge controller, battery storage, and LED loads to show the complete energy generation and consumption cycle. Voltage and current measurements are displayed on a monitoring panel.',
    problem: 'Understanding renewable energy concepts remains abstract without hands-on demonstration. Students need to see and measure actual energy generation from solar and wind sources to appreciate the principles, challenges, and potential of sustainable energy.',
    solution: 'The Renewable Energy Model combines a small solar panel and a miniature wind turbine connected through a charge controller to a rechargeable battery. LED lights serve as electrical loads. A monitoring circuit with voltage and current sensors displays generation and consumption data, making the energy flow visible and measurable.',
    technologies: ['Solar Panel', 'Wind Turbine', 'Charge Controller', 'Battery Storage', 'Voltage Sensors', 'Current Sensors'],
    howItWorks: [
      'A small solar panel converts light into electrical energy',
      'A miniature wind turbine generates power from air movement',
      'Both sources connect through a charge controller to prevent battery overcharge',
      'A rechargeable battery stores the generated energy',
      'LED loads demonstrate energy consumption from the stored supply',
      'Voltage and current sensors connected to an Arduino display real-time measurements'
    ],
    results: [
      'Built a working model demonstrating both solar and wind energy generation',
      'Successfully charged a battery and powered LED loads from renewable sources',
      'Created a measurement display showing voltage, current, and power output',
      'Used the model as an educational tool in science classes'
    ],
    futureImprovements: [
      'Add data logging to track energy generation over days and seasons',
      'Implement a comparison display showing solar versus wind contribution',
      'Scale up the model to power small practical loads',
      'Create an interactive display panel for public exhibitions'
    ],
    image: null,
    color: '#10b981'
  }
];

export const getProjectById = (id) => projects.find(p => p.id === id);
export const getProjectsByCategory = (category) => projects.filter(p => p.category === category);
export const getProjectCategories = () => [...new Set(projects.map(p => p.category))];
