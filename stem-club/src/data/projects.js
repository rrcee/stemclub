export const projects = [
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
    id: 'rain-simulation-model',
    title: 'Rain Simulation Model',
    category: 'Science',
    status: 'Completed',
    summary: 'An educational model demonstrating the water cycle and rainfall patterns.',
    description: 'A desktop rain simulation model that demonstrates precipitation patterns, water cycle dynamics, and storm systems. The model uses LED arrays and mist generators to visualize rainfall intensity and distribution patterns, helping students understand hydrology and meteorology concepts through hands-on observation.',
    problem: 'Understanding the water cycle and rainfall patterns remains abstract without visual demonstration. Students need to observe how rain forms, moves, and impacts the environment to grasp meteorology and hydrology concepts.',
    solution: 'The Rain Simulation Model uses controlled LED arrays to simulate rainfall intensity zones, mist generators to create visible precipitation, and flow channels to demonstrate water collection and runoff patterns. Integrated sensors monitor humidity and trigger realistic rain sequences.',
    technologies: ['LED Arrays', 'Mist Generators', 'Arduino', 'Humidity Sensors', 'Water Pump', 'Educational Display'],
    howItWorks: [
      'Humidity sensors monitor ambient moisture levels',
      'When thresholds are met, LED arrays simulate rainfall intensity',
      'Mist generators produce visible precipitation particles',
      'Water collection channels demonstrate runoff and infiltration',
      'Real-time display shows rainfall accumulation and distribution'
    ],
    results: [
      'Built a functional rain simulation demonstrating various storm patterns',
      'Students observed water cycle dynamics in a controlled environment',
      'Demonstrated rainfall impact on different surface types',
      'Used as an educational tool in science classes for hydrology lessons'
    ],
    futureImprovements: [
      'Add temperature integration to simulate evaporative cooling',
      'Implement wind effects on rainfall distribution',
      'Create interactive controls for adjusting storm intensity',
      'Build a networked version for comparative regional studies'
    ],
    image: null,
    color: '#3b82f6'
  },
  {
    id: 'school-radio',
    title: 'School Radio',
    category: 'Communication',
    status: 'In Progress',
    summary: 'A student-run internet radio station for school broadcasts and events.',
    description: 'An internet radio streaming setup allowing students to broadcast music, announcements, and school events live. The station features a mixing console, microphone setup, and live streaming platform integration for school community engagement.',
    problem: 'Students lack a platform for developing communication skills, sharing ideas, and broadcasting school events to the school community. Traditional PA systems are limited and do not reach remote audiences.',
    solution: 'The School Radio uses an ESP32-based streaming setup connected to a condenser microphone and audio mixer. Students host live shows, broadcast school events, and play curated music. Audio is streamed via an online platform accessible to the school community via web browser or mobile app.',
    technologies: ['ESP32', 'Condenser Microphone', 'Audio Mixer', 'Streaming Platform', 'Web Interface', 'Mobile App'],
    howItWorks: [
      'ESP32 connects to Wi-Fi and streams audio to an online platform',
      'Condenser microphone captures audio input from students',
      'Audio mixer adjusts levels and adds effects',
      'Live stream is accessible via web browser or mobile app',
      'Students host shows, announce events, and play curated content'
    ],
    results: [
      'Launched the school radio station with weekly broadcast schedule',
      'Students developed communication and audio production skills',
      'School events are live-streamed to the wider community',
      'Increased student engagement and school community connectivity'
    ],
    futureImprovements: [
      'Add call-in listener interaction features',
      'Integrate with school newsletter and social media',
      'Develop pre-recorded show capabilities',
      'Upgrade audio hardware for professional-quality sound'
    ],
    image: null,
    color: '#8b5cf6'
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
      'LED lights serve as electrical loads. A monitoring circuit with voltage and current sensors displays generation and consumption data, making the energy flow visible and measurable.',
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
