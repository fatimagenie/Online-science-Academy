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
    { id: 1, name: "Mathematics: Complete Algebra", category: "math", teacher: "", initials: "", description: "Master algebra from basics to advanced quadratic equations and functions.", grade: "Grade 9-10", lessons: 24, rating: 4.2, stars: 4, price: "Rs. 4,500", emoji: "\u{1F4D0}", colors: ["#003366","#3a5f94"] },
    { id: 2, name: "Physics: Mechanics & Motion", category: "physics", teacher: "", initials: "", description: "Understand Newton's laws, kinematics, and real-world applications.", grade: "Grade 11-12", lessons: 30, rating: 4.8, stars: 5, price: "Rs. 5,200", emoji: "\u269B", colors: ["#1a4a7a","#5a9fd4"] },
    { id: 3, name: "Science: Organic Basics", category: "science", teacher: "", initials: "", description: "Learn science fundamentals and experiments.", grade: "Grade 11-12", lessons: 22, rating: 4.5, stars: 4, price: "Rs. 4,800", emoji: "\u{1F9EA}", colors: ["#2d5a3d","#6ab07a"] },
    { id: 4, name: "English: Essay & Literature", category: "english", teacher: "", initials: "", description: "Improve essay writing, comprehension, and literary analysis skills.", grade: "Grade 9-12", lessons: 18, rating: 4.3, stars: 4, price: "Rs. 3,800", emoji: "\u{1F4D6}", colors: ["#6b3a6b","#b07ab0"] },
    { id: 5, name: "Computer Science: Programming", category: "cs", teacher: "", initials: "", description: "Learn programming fundamentals with C++ and Python from scratch.", grade: "Grade 9-12", lessons: 36, rating: 4.9, stars: 5, price: "Rs. 6,000", emoji: "\u{1F4BB}", colors: ["#2a2a5a","#6a6aaa"] },
    { id: 6, name: "Biology: Cell & Genetics", category: "biology", teacher: "", initials: "", description: "Explore cell biology, DNA, genetics, and modern biotechnology.", grade: "Grade 11-12", lessons: 28, rating: 4.6, stars: 4, price: "Rs. 5,000", emoji: "\u{1F9EC}", colors: ["#2d5a2d","#70b070"] }
  ],
  schedule: {
    timeSlots: ["8:00 - 9:00", "10:00 - 11:00", "2:00 - 3:00", "4:00 - 5:00"],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    grid: [
      [
        { subject: "Math", teacher: "" },
        { subject: "Physics", teacher: "" },
        { subject: "Science", teacher: "" },
        { subject: "English", teacher: "" },
        { subject: "CS", teacher: "" },
        { subject: "Biology", teacher: "" }
      ],
      [
        { subject: "Physics", teacher: "" },
        { subject: "Math", teacher: "" },
        { subject: "English", teacher: "" },
        { subject: "Science", teacher: "" },
        { subject: "Biology", teacher: "" },
        { subject: "Math", teacher: "" }
      ],
      [
        { subject: "Science", teacher: "" },
        { subject: "CS", teacher: "" },
        { subject: "Math", teacher: "" },
        { subject: "Physics", teacher: "" },
        { subject: "English", teacher: "" },
        { subject: "Physics", teacher: "" }
      ],
      [
        { subject: "English", teacher: "" },
        { subject: "Biology", teacher: "" },
        { subject: "CS", teacher: "" },
        { subject: "Math", teacher: "" },
        { subject: "Science", teacher: "" },
        { subject: "English", teacher: "" }
      ]
    ]
  },
  grades: [
    { id: 1, subject: "Mathematics", teacher: "", marks: 85, total: 100, grade: "A", status: "Passed" },
    { id: 2, subject: "Physics", teacher: "", marks: 70, total: 100, grade: "B", status: "Passed" },
    { id: 3, subject: "Science", teacher: "", marks: 91, total: 100, grade: "A+", status: "Passed" },
    { id: 4, subject: "English", teacher: "", marks: 58, total: 100, grade: "C", status: "Needs Work" },
    { id: 5, subject: "Computer Science", teacher: "", marks: 88, total: 100, grade: "A", status: "Passed" },
    { id: 6, subject: "Biology", teacher: "", marks: 74, total: 100, grade: "B", status: "Passed" }
  ],
  messages: [
    { id: 1, sender: "", initials: "", color: "#003366", text: "Great progress on the algebra assignment! Your quadratic equations are improving. Keep practicing the harder problems.", time: "2 hours ago", unread: true },
    { id: 2, sender: "", initials: "", color: "#1a4a7a", text: "Don't forget to complete the Newton's Laws worksheet before tomorrow's class. We'll review it together.", time: "Yesterday", unread: false },
    { id: 3, sender: "", initials: "", color: "#2d5a3d", text: "Excellent work on the science quiz! You scored 9/10. Just review benzene derivatives for next class.", time: "2 days ago", unread: false },
    { id: 4, sender: "", initials: "", color: "#6b3a6b", text: "Your essay needs more depth in the analysis section. Let's schedule a meeting to discuss improvements.", time: "3 days ago", unread: false },
    { id: 5, sender: "", initials: "", color: "#2a2a5a", text: "Welcome to the CS course! Make sure you have Python installed before our first coding session.", time: "5 days ago", unread: false }
  ],
  stats: { courses: 12, hours: 86, achievements: 7, avgScore: 92 },
  profile: { name: "Admin User", email: "asmaiqbal847@gmail.com", phone: "+92 340 6222068", role: "Administrator", joinDate: "July 2026" },
  password: "Admin098",
  enrollments: [],
  fees: []
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
  } catch(e) {}
}

function osaReset() {
  localStorage.removeItem('osa_data');
}

function osaNextId(arr) {
  var max = 0;
  arr.forEach(function(item) { if (item.id > max) max = item.id; });
  return max + 1;
}

function osaAddEnrollment(data) {
  var d = osaLoad();
  if (!d.enrollments) d.enrollments = [];
  data.id = osaNextId(d.enrollments);
  data.enrolledAt = new Date().toISOString();
  data.status = 'active';
  d.enrollments.push(data);
  osaSave(d);

  if (typeof firebaseAddDoc === 'function') {
    firebaseAddDoc('enrollments', data).catch(function(e) { console.log('Firestore write failed:', e); });
  }

  return data;
}

function osaGetEnrollments() {
  var d = osaLoad();
  return d.enrollments || [];
}

function osaStudentLogin(email) {
  var enrollments = osaGetEnrollments();
  for (var i = 0; i < enrollments.length; i++) {
    if (enrollments[i].email.toLowerCase() === email.toLowerCase()) {
      return enrollments[i];
    }
  }
  return null;
}

function osaGetCourseById(id) {
  var d = osaLoad();
  for (var i = 0; i < d.courses.length; i++) {
    if (d.courses[i].id === id) return d.courses[i];
  }
  return null;
}
