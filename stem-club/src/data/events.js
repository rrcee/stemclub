export const events = [
  {
    id: 'robotics-workshop-upcoming',
    title: 'Robotics Workshop',
    category: 'Workshop',
    description: 'A hands-on workshop covering robot assembly, sensor integration, and microcontroller programming. Students will build and program a functional robot from scratch.',
    location: 'STEM Lab',
    date: null,
    time: null,
    registrationOpen: true,
    color: '#f59e0b'
  },
  {
    id: 'coding-bootcamp-upcoming',
    title: 'Coding Bootcamp',
    category: 'Workshop',
    description: 'An intensive coding session focusing on Python programming, algorithm design, and building practical applications. Suitable for beginners and intermediate programmers.',
    location: 'Computer Lab',
    date: null,
    time: null,
    registrationOpen: true,
    color: '#06b6d4'
  },
  {
    id: 'ai-workshop-upcoming',
    title: 'AI Workshop',
    category: 'Workshop',
    description: 'Introduction to artificial intelligence and machine learning. Students will explore how AI models work and build a simple image classification project.',
    location: 'STEM Lab',
    date: null,
    time: null,
    registrationOpen: true,
    color: '#8b5cf6'
  },
  {
    id: 'science-exhibition-upcoming',
    title: 'Science Exhibition',
    category: 'Exhibition',
    description: 'Annual science exhibition where students present their innovative projects, models, and research to the school community and invited guests.',
    location: 'School Auditorium',
    date: null,
    time: null,
    registrationOpen: false,
    color: '#10b981'
  },
  {
    id: 'stem-meet-upcoming',
    title: 'STEM Meet',
    category: 'Competition',
    description: 'A collaborative event bringing together STEM enthusiasts from multiple schools to present projects, participate in challenges, and exchange ideas.',
    location: 'To be announced',
    date: null,
    time: null,
    registrationOpen: false,
    color: '#ef4444'
  }
];

export const getEventById = (id) => events.find(e => e.id === id);
export const getEventCategories = () => [...new Set(events.map(e => e.category))];
