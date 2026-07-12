var OSA_DEFAULTS = {
  branding: {
    name: "Online Science Academy",
    tagline: "Empowering students to achieve academic excellence through personalized online tuition.",
    whatsapp: "923406222068",
    email: "asmaiqbal847@gmail.com",
    phone: "+92 340 6222068",
    address: "Islamabad, Pakistan"
  },
  courses: [
    { id: 1, name: "Mathematics: Complete Algebra", category: "math", teacher: "Sir Rashid", initials: "SR", description: "Master algebra from basics to advanced quadratic equations and functions.", grade: "Grade 9-10", lessons: 24, rating: 4.2, stars: 4, price: "Rs. 4,500", emoji: "\u{1F4D0}", colors: ["#003366","#3a5f94"] },
    { id: 2, name: "Physics: Mechanics & Motion", category: "physics", teacher: "Sir Ahmed Khan", initials: "AK", description: "Understand Newton's laws, kinematics, and real-world applications.", grade: "Grade 11-12", lessons: 30, rating: 4.8, stars: 5, price: "Rs. 5,200", emoji: "\u269B", colors: ["#1a4a7a","#5a9fd4"] },
    { id: 3, name: "Chemistry: Organic Basics", category: "chemistry", teacher: "Ma'am Fatima Noor", initials: "FN", description: "Learn organic chemistry fundamentals, reactions, and benzene derivatives.", grade: "Grade 11-12", lessons: 22, rating: 4.5, stars: 4, price: "Rs. 4,800", emoji: "\u{1F9EA}", colors: ["#2d5a3d","#6ab07a"] },
    { id: 4, name: "English: Essay & Literature", category: "english", teacher: "Ma'am Zainab Iqbal", initials: "ZI", description: "Improve essay writing, comprehension, and literary analysis skills.", grade: "Grade 9-12", lessons: 18, rating: 4.3, stars: 4, price: "Rs. 3,800", emoji: "\u{1F4D6}", colors: ["#6b3a6b","#b07ab0"] },
    { id: 5, name: "Computer Science: Programming", category: "cs", teacher: "Sir Muhammad Haris", initials: "MH", description: "Learn programming fundamentals with C++ and Python from scratch.", grade: "Grade 9-12", lessons: 36, rating: 4.9, stars: 5, price: "Rs. 6,000", emoji: "\u{1F4BB}", colors: ["#2a2a5a","#6a6aaa"] },
    { id: 6, name: "Biology: Cell & Genetics", category: "biology", teacher: "Ma'am Rabia Shah", initials: "RS", description: "Explore cell biology, DNA, genetics, and modern biotechnology.", grade: "Grade 11-12", lessons: 28, rating: 4.6, stars: 4, price: "Rs. 5,000", emoji: "\u{1F9EC}", colors: ["#2d5a2d","#70b070"] }
  ],
  schedule: {
    timeSlots: ["8:00 - 9:00", "10:00 - 11:00", "2:00 - 3:00", "4:00 - 5:00"],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    grid: [
      [
        { subject: "Math", teacher: "Sir Rashid" },
        { subject: "Physics", teacher: "Sir Ahmed" },
        { subject: "Chemistry", teacher: "Ma'am Fatima" },
        { subject: "English", teacher: "Ma'am Zainab" },
        { subject: "CS", teacher: "Sir Haris" },
        { subject: "Biology", teacher: "Ma'am Rabia" }
      ],
      [
        { subject: "Physics", teacher: "Sir Ahmed" },
        { subject: "Math", teacher: "Sir Rashid" },
        { subject: "English", teacher: "Ma'am Zainab" },
        { subject: "Chemistry", teacher: "Ma'am Fatima" },
        { subject: "Biology", teacher: "Ma'am Rabia" },
        { subject: "Math", teacher: "Sir Rashid" }
      ],
      [
        { subject: "Chemistry", teacher: "Ma'am Fatima" },
        { subject: "CS", teacher: "Sir Haris" },
        { subject: "Math", teacher: "Sir Rashid" },
        { subject: "Physics", teacher: "Sir Ahmed" },
        { subject: "English", teacher: "Ma'am Zainab" },
        { subject: "Physics", teacher: "Sir Ahmed" }
      ],
      [
        { subject: "English", teacher: "Ma'am Zainab" },
        { subject: "Biology", teacher: "Ma'am Rabia" },
        { subject: "CS", teacher: "Sir Haris" },
        { subject: "Math", teacher: "Sir Rashid" },
        { subject: "Chemistry", teacher: "Ma'am Fatima" },
        { subject: "English", teacher: "Ma'am Zainab" }
      ]
    ]
  },
  grades: [
    { id: 1, subject: "Mathematics", teacher: "Sir Rashid", marks: 85, total: 100, grade: "A", status: "Passed" },
    { id: 2, subject: "Physics", teacher: "Sir Ahmed Khan", marks: 70, total: 100, grade: "B", status: "Passed" },
    { id: 3, subject: "Chemistry", teacher: "Ma'am Fatima Noor", marks: 91, total: 100, grade: "A+", status: "Passed" },
    { id: 4, subject: "English", teacher: "Ma'am Zainab Iqbal", marks: 58, total: 100, grade: "C", status: "Needs Work" },
    { id: 5, subject: "Computer Science", teacher: "Sir Muhammad Haris", marks: 88, total: 100, grade: "A", status: "Passed" },
    { id: 6, subject: "Biology", teacher: "Ma'am Rabia Shah", marks: 74, total: 100, grade: "B", status: "Passed" }
  ],
  messages: [
    { id: 1, sender: "Sir Rashid", initials: "SR", color: "#003366", text: "Great progress on the algebra assignment! Your quadratic equations are improving. Keep practicing the harder problems.", time: "2 hours ago", unread: true },
    { id: 2, sender: "Sir Ahmed Khan", initials: "AK", color: "#1a4a7a", text: "Don't forget to complete the Newton's Laws worksheet before tomorrow's class. We'll review it together.", time: "Yesterday", unread: false },
    { id: 3, sender: "Ma'am Fatima Noor", initials: "FN", color: "#2d5a3d", text: "Excellent work on the organic chemistry quiz! You scored 9/10. Just review benzene derivatives for next class.", time: "2 days ago", unread: false },
    { id: 4, sender: "Ma'am Zainab Iqbal", initials: "ZI", color: "#6b3a6b", text: "Your essay needs more depth in the analysis section. Let's schedule a meeting to discuss improvements.", time: "3 days ago", unread: false },
    { id: 5, sender: "Sir Muhammad Haris", initials: "MH", color: "#2a2a5a", text: "Welcome to the CS course! Make sure you have Python installed before our first coding session.", time: "5 days ago", unread: false }
  ],
  stats: { courses: 12, hours: 86, achievements: 7, avgScore: 92 },
  profile: { name: "Admin User", email: "asmaiqbal847@gmail.com", phone: "+92 340 6222068", role: "Administrator", joinDate: "July 2026" },
  password: "Admin098"
};

function osaLoad() {
  try {
    var saved = localStorage.getItem('osa_data');
    if (saved) return JSON.parse(saved);
  } catch(e) {}
  return JSON.parse(JSON.stringify(OSA_DEFAULTS));
}

function osaSave(data) {
  try {
    localStorage.setItem('osa_data', JSON.stringify(data));
  } catch(e) { alert('Could not save data.'); }
}

function osaReset() {
  localStorage.removeItem('osa_data');
}

function osaNextId(arr) {
  var max = 0;
  arr.forEach(function(item) { if (item.id > max) max = item.id; });
  return max + 1;
}
