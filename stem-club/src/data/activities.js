export const activities = [
  {
    id: 'robotics-workshop',
    title: 'Robotics Workshop',
    category: 'Workshop',
    description: 'Students learned the basics of robotics, sensors and microcontroller programming. The workshop covered fundamental concepts of robot design, sensor integration, and writing control algorithms for autonomous behavior.',
    skills: ['Robotics Fundamentals', 'Sensor Integration', 'Arduino Programming', 'Motor Control', 'Problem Solving'],
    highlights: [
      'Hands-on robot assembly from component kits',
      'Programming microcontrollers for sensor-based decision making',
      'Understanding DC motor control with PWM signals',
      'Building and testing a line-following robot'
    ],
    date: null,
    image: null,
    color: '#f59e0b'
  },
  {
    id: 'science-exhibition',
    title: 'Science Exhibition',
    category: 'Exhibition',
    description: 'Students presented innovative science models and real-world problem-solving ideas. The exhibition showcased projects spanning renewable energy, automation, environmental monitoring, and applied physics.',
    skills: ['Presentation Skills', 'Scientific Method', 'Model Building', 'Research', 'Public Speaking'],
    highlights: [
      'Student teams presented original research and working prototypes',
      'Demonstrated practical applications of STEM concepts',
      'Received feedback from faculty and visiting experts',
      'Encouraged cross-disciplinary thinking and collaboration'
    ],
    date: null,
    image: null,
    color: '#8b5cf6'
  },
  {
    id: 'coding-bootcamp',
    title: 'Coding Bootcamp',
    category: 'Workshop',
    description: 'Hands-on sessions covering Python, problem solving and simple application development. Students progressed from basic syntax and data structures to building small utility programs and scripts.',
    skills: ['Python Programming', 'Problem Solving', 'Logical Thinking', 'Application Development', 'Debugging'],
    highlights: [
      'Introduction to Python syntax, variables, and control flow',
      'Solving algorithmic problems with progressively increasing difficulty',
      'Building command-line tools and simple automation scripts',
      'Collaborative coding exercises and peer code review'
    ],
    date: null,
    image: null,
    color: '#06b6d4'
  },
  {
    id: 'green-energy-project',
    title: 'Green Energy Project',
    category: 'Project',
    description: 'Students created a model demonstrating solar and wind energy generation. The project involved assembling a working renewable energy system, taking measurements, and understanding the principles of sustainable power.',
    skills: ['Renewable Energy', 'Circuit Design', 'Measurement', 'Data Analysis', 'Environmental Science'],
    highlights: [
      'Assembled solar panels and a miniature wind turbine',
      'Connected energy sources through a charge controller to a battery',
      'Measured and recorded voltage, current, and power output',
      'Compared energy generation under different conditions'
    ],
    date: null,
    image: null,
    color: '#10b981'
  },
  {
    id: 'ai-awareness-session',
    title: 'AI Awareness Session',
    category: 'Seminar',
    description: 'An introductory session covering artificial intelligence, machine learning and future careers. Students explored how AI systems work, examined real-world applications, and discussed the evolving landscape of AI-related careers.',
    skills: ['AI Fundamentals', 'Machine Learning Concepts', 'Career Awareness', 'Critical Thinking', 'Technology Literacy'],
    highlights: [
      'Overview of artificial intelligence and its subfields',
      'Demonstrations of machine learning applications in everyday technology',
      'Discussion of ethical considerations in AI development',
      'Exploration of STEM career paths involving AI and data science'
    ],
    date: null,
    image: null,
    color: '#0ea5e9'
  },
  {
    id: 'interschool-stem-meet',
    title: 'Inter-school STEM Meet',
    category: 'Competition',
    description: 'The club participated in a collaborative STEM event with students from other schools. Teams presented projects, participated in technical challenges, and exchanged ideas with peers from different institutions.',
    skills: ['Teamwork', 'Communication', 'Competition Strategy', 'Networking', 'Project Presentation'],
    highlights: [
      'Collaborated with students from multiple schools',
      'Presented club projects to a wider audience',
      'Participated in inter-school technical challenges',
      'Exchanged ideas and established connections for future collaboration'
    ],
    date: null,
    image: null,
    color: '#ef4444'
  }
];

export const getActivityById = (id) => activities.find(a => a.id === id);
export const getActivityCategories = () => [...new Set(activities.map(a => a.category))];
