var firebaseConfig = {
  apiKey: "AIzaSyCOhz4uiubqySem2Ws9AFxyzZqlymc8qvI",
  authDomain: "online-science-academy-62479.firebaseapp.com",
  projectId: "online-science-academy-62479",
  storageBucket: "online-science-academy-62479.firebasestorage.app",
  messagingSenderId: "133526873435",
  appId: "1:133526873435:web:d95592e07335bf8126667e",
  measurementId: "G-EHCEREQV24"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var auth = firebase.auth();

function firebaseSeedDefaults() {
  return db.collection('settings').doc('main').get().then(function(doc) {
    if (!doc.exists) {
      var d = osaLoad();
      var batch = db.batch();

      batch.set(db.collection('settings').doc('main'), {
        branding: d.branding,
        profile: d.profile
      });

      batch.set(db.collection('schedule').doc('main'), d.schedule);

      d.courses.forEach(function(c) {
        batch.set(db.collection('courses').doc(String(c.id)), c);
      });
      d.grades.forEach(function(g) {
        batch.set(db.collection('grades').doc(String(g.id)), g);
      });
      d.messages.forEach(function(m) {
        batch.set(db.collection('messages').doc(String(m.id)), m);
      });

      return batch.commit();
    }
  });
}

function firebaseLoadAll() {
  return Promise.all([
    db.collection('settings').doc('main').get(),
    db.collection('courses').orderBy('id').get(),
    db.collection('enrollments').orderBy('id').get(),
    db.collection('fees').orderBy('id').get(),
    db.collection('grades').orderBy('id').get(),
    db.collection('messages').orderBy('id').get(),
    db.collection('schedule').doc('main').get(),
    db.collection('analytics').doc('main').get()
  ]).then(function(results) {
    var settings = results[0].exists ? results[0].data() : {};
    var courses = []; results[1].forEach(function(doc) { courses.push(doc.data()); });
    var enrollments = []; results[2].forEach(function(doc) { enrollments.push(doc.data()); });
    var fees = []; results[3].forEach(function(doc) { fees.push(doc.data()); });
    var grades = []; results[4].forEach(function(doc) { grades.push(doc.data()); });
    var messages = []; results[5].forEach(function(doc) { messages.push(doc.data()); });
    var schedule = results[6].exists ? results[6].data() : OSA_DEFAULTS.schedule;
    var analytics = results[7].exists ? results[7].data() : { totalVisits: 0, todayVisits: 0, lastVisit: null };

    return {
      branding: settings.branding || OSA_DEFAULTS.branding,
      profile: settings.profile || OSA_DEFAULTS.profile,
      courses: courses,
      enrollments: enrollments,
      fees: fees,
      grades: grades,
      messages: messages,
      schedule: schedule,
      analytics: analytics
    };
  });
}

function firebaseNextId(collection) {
  return db.collection(collection).orderBy('id', 'desc').limit(1).get().then(function(snap) {
    if (snap.empty) return 1;
    var maxId = 0;
    snap.forEach(function(doc) { maxId = doc.data().id || 0; });
    return maxId + 1;
  });
}

function firebaseAddDoc(collection, data) {
  return db.collection(collection).doc(String(data.id)).set(data);
}

function firebaseUpdateDoc(collection, id, data) {
  return db.collection(collection).doc(String(id)).set(data);
}

function firebaseDeleteDoc(collection, id) {
  return db.collection(collection).doc(String(id)).delete();
}

function firebaseGetDoc(collection, id) {
  return db.collection(collection).doc(String(id)).get().then(function(doc) {
    return doc.exists ? doc.data() : null;
  });
}

function firebaseQueryDoc(collection, field, value) {
  return db.collection(collection).where(field, '==', value).limit(1).get().then(function(snap) {
    if (snap.empty) return null;
    var result = null;
    snap.forEach(function(doc) { result = doc.data(); });
    return result;
  });
}

function firebaseUpdateAnalytics() {
  var todayStr = new Date().toDateString();
  var ref = db.collection('analytics').doc('main');

  return ref.get().then(function(doc) {
    var data = doc.exists ? doc.data() : { totalVisits: 0, todayVisits: 0, lastVisitDate: '', todayVisitsCount: 0 };

    data.totalVisits = (data.totalVisits || 0) + 1;

    if (data.lastVisitDate === todayStr) {
      data.todayVisitsCount = (data.todayVisitsCount || 0) + 1;
    } else {
      data.lastVisitDate = todayStr;
      data.todayVisitsCount = 1;
    }

    data.lastVisit = firebase.firestore.FieldValue.serverTimestamp();

    return ref.set(data);
  });
}

function firebaseGetAnalytics() {
  return db.collection('analytics').doc('main').get().then(function(doc) {
    if (!doc.exists) return { totalVisits: 0, todayVisits: 0, lastVisit: null, lastVisitDate: '', todayVisitsCount: 0 };
    return doc.data();
  });
}
