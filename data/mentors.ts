export type MentorCategory = "tech" | "non-tech";

export type Mentor = {
  id: number;
  name: string;
  role: string;
  category: MentorCategory;
  rating: number;
  sessions: number;
  description: string;
  image: string;
  calendly: string;
};

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Frontend Developer",
    category: "tech",
    rating: 4.8,
    sessions: 120,
    description: "Helps students fix DSA, JavaScript, and frontend project gaps.",
    image: "/mentors/rahul.svg",
    calendly: "https://calendly.com/demo-mentor-1",
  },
  {
    id: 2,
    name: "Aisha Khan",
    role: "Backend Engineer",
    category: "tech",
    rating: 4.9,
    sessions: 96,
    description: "Guides API design, databases, debugging, and interview readiness.",
    image: "/mentors/aisha.svg",
    calendly: "https://calendly.com/demo-mentor-2",
  },
  {
    id: 3,
    name: "Vikram Rao",
    role: "Data Analyst",
    category: "tech",
    rating: 4.7,
    sessions: 84,
    description: "Coaches Excel, SQL, dashboards, and analytics portfolio projects.",
    image: "/mentors/vikram.svg",
    calendly: "https://calendly.com/demo-mentor-3",
  },
  {
    id: 4,
    name: "Meera Iyer",
    role: "Communication Coach",
    category: "non-tech",
    rating: 4.8,
    sessions: 140,
    description: "Improves speaking clarity, confidence, presentations, and feedback loops.",
    image: "/mentors/meera.svg",
    calendly: "https://calendly.com/demo-mentor-4",
  },
  {
    id: 5,
    name: "Arjun Patel",
    role: "Aptitude Mentor",
    category: "non-tech",
    rating: 4.7,
    sessions: 132,
    description: "Builds speed, accuracy, quant basics, and test-taking strategy.",
    image: "/mentors/arjun.svg",
    calendly: "https://calendly.com/demo-mentor-5",
  },
  {
    id: 6,
    name: "Nisha Menon",
    role: "Career Strategist",
    category: "non-tech",
    rating: 4.9,
    sessions: 110,
    description: "Helps with role clarity, resumes, networking, and interview stories.",
    image: "/mentors/nisha.svg",
    calendly: "https://calendly.com/demo-mentor-6",
  },
];

export function getMentorCategory(goal: { goal: string; careerTrack?: string; mentorCategory?: MentorCategory }): MentorCategory {
  if (goal.mentorCategory) {
    return goal.mentorCategory;
  }

  if (goal.goal === "coding") {
    return "tech";
  }

  if (goal.goal === "career") {
    const nonTechTracks = ["Product Management"];
    return goal.careerTrack && nonTechTracks.includes(goal.careerTrack) ? "non-tech" : "tech";
  }

  return "non-tech";
}

export function getRecommendedMentors(goal: { goal: string; careerTrack?: string }, limit = 3) {
  const category = getMentorCategory(goal);
  return mentors.filter((mentor) => mentor.category === category).slice(0, limit);
}
