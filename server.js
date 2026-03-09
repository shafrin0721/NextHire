import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'nexthire_secret_key_2024';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// ==================== DATABASE (In-Memory for demo) ====================
let users = [
    { id: 1, username: 'hradmin', password: '$2a$10$X7VYGyYqZqKxYqZqKxYqKuYqZqKxYqKuYqZqKxYqKuYqZqKxYqKu', name: 'HR Admin', role: 'Administrator', email: 'hr@nexthire.com' },
    { id: 2, username: 'hruser', password: '$2a$10$X7VYGyYqZqKxYqZqKxYqKuYqZqKxYqKuYqZqKxYqKuYqZqKxYqKu', name: 'HR User', role: 'HR Manager', email: 'hruser@nexthire.com' }
];

let jobs = [
    { id: 1, title: 'Frontend Developer', department: 'IT', location: 'Remote', type: 'Full-Time', applications: 34, status: 'Active', requirements: 'React, JavaScript, CSS', skills: ['React', 'JavaScript', 'CSS'], description: 'We are looking for an experienced Frontend Developer', expirationDate: '2024-12-31', questions: [
        { id: 1, question: 'What is the virtual DOM?', type: 'mcq', options: ['A lightweight copy of DOM', 'A real DOM', 'A database', 'A server'], correctAnswer: 0 },
        { id: 2, question: 'Which hook is used for side effects?', type: 'mcq', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correctAnswer: 1 }
    ], createdAt: new Date().toISOString() },
    { id: 2, title: 'Backend Developer', department: 'IT', location: 'Colombo', type: 'Full-Time', applications: 28, status: 'Active', requirements: 'Node.js, Python, SQL', skills: ['Node.js', 'Python', 'SQL'], description: 'Backend Developer needed', expirationDate: '2024-11-30', questions: [], createdAt: new Date().toISOString() },
    { id: 3, title: 'HR Executive', department: 'Human Resources', location: 'Colombo', type: 'Full-Time', applications: 18, status: 'Active', requirements: 'Communication, HRIS', skills: ['Communication', 'HRIS'], description: 'HR Executive needed', expirationDate: '2024-12-15', questions: [], createdAt: new Date().toISOString() },
    { id: 4, title: 'UX Designer', department: 'Design', location: 'Remote', type: 'Part-Time', applications: 22, status: 'Active', requirements: 'Figma, UI/UX', skills: ['Figma', 'UI/UX'], description: 'UX Designer needed', expirationDate: '2024-11-20', questions: [], createdAt: new Date().toISOString() },
    { id: 5, title: 'Data Analyst', department: 'Data', location: 'Colombo', type: 'Full-Time', applications: 15, status: 'Inactive', requirements: 'Python, SQL, Tableau', skills: ['Python', 'SQL', 'Tableau'], description: 'Data Analyst needed', expirationDate: '2024-10-31', questions: [], createdAt: new Date().toISOString() }
];

let applications = [
    { id: 'C-1023', candidateName: 'John Doe', position: 'Frontend Developer', experience: '3 Years', skillMatch: '85%', testScore: '82%', status: 'Pending', cvUrl: '#', email: 'john@example.com', phone: '+1 555-0101', skills: ['React', 'JavaScript', 'CSS'], education: 'BSc Computer Science', appliedDate: '2024-01-15' },
    { id: 'C-1045', candidateName: 'Jane Smith', position: 'Backend Developer', experience: '5 Years', skillMatch: '78%', testScore: '75%', status: 'Shortlisted', cvUrl: '#', email: 'jane@example.com', phone: '+1 555-0102', skills: ['Node.js', 'Python', 'SQL'], education: 'BSc Software Engineering', appliedDate: '2024-01-14' },
    { id: 'C-1067', candidateName: 'Mike Johnson', position: 'Full Stack Developer', experience: '4 Years', skillMatch: '82%', testScore: '79%', status: 'Interview Scheduled', cvUrl: '#', email: 'mike@example.com', phone: '+1 555-0103', skills: ['React', 'Node.js'], education: 'BSc IT', appliedDate: '2024-01-13' },
    { id: 'C-1089', candidateName: 'Sarah Williams', position: 'DevOps Engineer', experience: '6 Years', skillMatch: '91%', testScore: '88%', status: 'Selected', cvUrl: '#', email: 'sarah@example.com', phone: '+1 555-0104', skills: ['AWS', 'Docker'], education: 'BSc Engineering', appliedDate: '2024-01-12' },
    { id: 'C-1102', candidateName: 'Tom Brown', position: 'Data Analyst', experience: '2 Years', skillMatch: '72%', testScore: '70%', status: 'Rejected', cvUrl: '#', email: 'tom@example.com', phone: '+1 555-0105', skills: ['Python', 'Excel'], education: 'BSc Statistics', appliedDate: '2024-01-11' }
];

let anonymousCandidates = [
    { id: 'C-2045', skillMatch: '88%', experience: '4 Years', education: 'BSc Computer Science', certifications: 'AWS Certified Developer', testScore: '84%', skills: ['React', 'Node.js'], revealed: false, identity: null, revealedAt: null },
    { id: 'C-2067', skillMatch: '82%', experience: '3 Years', education: 'BSc Software Engineering', certifications: 'Google UX Certificate', testScore: '80%', skills: ['Figma', 'UI/UX'], revealed: false, identity: null, revealedAt: null },
    { id: 'C-2089', skillMatch: '76%', experience: '5 Years', education: 'BSc Information Technology', certifications: 'Microsoft Certified', testScore: '74%', skills: ['Python', 'SQL'], revealed: false, identity: null, revealedAt: null },
    { id: 'C-2102', skillMatch: '71%', experience: '2 Years', education: 'BSc Computer Science', certifications: 'None', testScore: '68%', skills: ['Excel', 'Tableau'], revealed: false, identity: null, revealedAt: null }
];

let skillTests = [
    { id: 1, name: 'Frontend Technical Test', position: 'Frontend Developer', questions: 20, candidates: 15, avgScore: '78%', status: 'Active', createdAt: new Date().toISOString() },
    { id: 2, name: 'Backend Logic Test', position: 'Backend Developer', questions: 25, candidates: 12, avgScore: '74%', status: 'Active', createdAt: new Date().toISOString() },
    { id: 3, name: 'Python Coding Challenge', position: 'Data Analyst', questions: 15, candidates: 8, avgScore: '82%', status: 'Active', createdAt: new Date().toISOString() },
    { id: 4, name: 'System Design Test', position: 'Full Stack Developer', questions: 30, candidates: 10, avgScore: '71%', status: 'Inactive', createdAt: new Date().toISOString() }
];

let interviews = [
    { id: 1, candidateId: 'C-1067', candidateName: 'Mike Johnson', position: 'Full Stack Developer', date: '2024-01-25', time: '10:00 AM', status: 'Scheduled', notes: '', createdAt: new Date().toISOString() },
    { id: 2, candidateId: 'C-1045', candidateName: 'Jane Smith', position: 'Backend Developer', date: '2024-01-26', time: '2:00 PM', status: 'Scheduled', notes: '', createdAt: new Date().toISOString() }
];

let identityRevealLogs = [];

// ==================== MIDDLEWARE ====================
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// ==================== AUTH ROUTES ====================
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    // For demo, accept these credentials
    if (username === 'hradmin' && password === 'hr123') {
        const user = { id: 1, username: 'hradmin', name: 'HR Admin', role: 'Administrator' };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token, user });
    }
    if (username === 'hruser' && password === 'user123') {
        const user = { id: 2, username: 'hruser', name: 'HR User', role: 'HR Manager' };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ token, user });
    }
    
    res.status(401).json({ error: 'Invalid credentials' });
});

app.post('/api/auth/logout', authenticateToken, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

// ==================== JOBS ROUTES ====================
app.get('/api/jobs', authenticateToken, (req, res) => {
    res.json(jobs);
});

app.get('/api/jobs/:id', authenticateToken, (req, res) => {
    const job = jobs.find(j => j.id === parseInt(req.params.id));
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
});

app.post('/api/jobs', authenticateToken, (req, res) => {
    const newJob = {
        id: Date.now(),
        ...req.body,
        applications: 0,
        createdAt: new Date().toISOString()
    };
    jobs.push(newJob);
    res.status(201).json(newJob);
});

app.put('/api/jobs/:id', authenticateToken, (req, res) => {
    const index = jobs.findIndex(j => j.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Job not found' });
    
    jobs[index] = { ...jobs[index], ...req.body };
    res.json(jobs[index]);
});

app.delete('/api/jobs/:id', authenticateToken, (req, res) => {
    const index = jobs.findIndex(j => j.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Job not found' });
    
    jobs.splice(index, 1);
    res.json({ message: 'Job deleted successfully' });
});

// ==================== APPLICATIONS ROUTES ====================
app.get('/api/applications', authenticateToken, (req, res) => {
    res.json(applications);
});

app.get('/api/applications/:id', authenticateToken, (req, res) => {
    const app = applications.find(a => a.id === req.params.id);
    if (!app) return res.status(404).json({ error: 'Application not found' });
    res.json(app);
});

app.put('/api/applications/:id/status', authenticateToken, (req, res) => {
    const { status } = req.body;
    const index = applications.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Application not found' });
    
    applications[index].status = status;
    res.json(applications[index]);
});

// ==================== ANONYMOUS SCREENING ROUTES ====================
app.get('/api/screening', authenticateToken, (req, res) => {
    res.json(anonymousCandidates);
});

app.post('/api/screening/:id/reveal', authenticateToken, (req, res) => {
    const index = anonymousCandidates.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Candidate not found' });
    
    const names = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'Tom Brown'];
    const identity = names[Math.floor(Math.random() * names.length)];
    
    anonymousCandidates[index].revealed = true;
    anonymousCandidates[index].identity = identity;
    anonymousCandidates[index].revealedAt = new Date().toISOString();
    
    // Log the reveal action
    identityRevealLogs.push({
        candidateId: req.params.id,
        identity: identity,
        revealedBy: req.user.username,
        revealedAt: new Date().toISOString()
    });
    
    res.json(anonymousCandidates[index]);
});

app.get('/api/screening/logs', authenticateToken, (req, res) => {
    res.json(identityRevealLogs);
});

// ==================== SKILL TESTS ROUTES ====================
app.get('/api/tests', authenticateToken, (req, res) => {
    res.json(skillTests);
});

app.post('/api/tests', authenticateToken, (req, res) => {
    const newTest = {
        id: Date.now(),
        ...req.body,
        candidates: 0,
        avgScore: 'N/A',
        createdAt: new Date().toISOString()
    };
    skillTests.push(newTest);
    res.status(201).json(newTest);
});

app.put('/api/tests/:id', authenticateToken, (req, res) => {
    const index = skillTests.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Test not found' });
    
    skillTests[index] = { ...skillTests[index], ...req.body };
    res.json(skillTests[index]);
});

// ==================== INTERVIEWS ROUTES ====================
app.get('/api/interviews', authenticateToken, (req, res) => {
    res.json(interviews);
});

app.post('/api/interviews', authenticateToken, (req, res) => {
    const newInterview = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date().toISOString()
    };
    interviews.push(newInterview);
    res.status(201).json(newInterview);
});

app.put('/api/interviews/:id', authenticateToken, (req, res) => {
    const index = interviews.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Interview not found' });
    
    interviews[index] = { ...interviews[index], ...req.body };
    res.json(interviews[index]);
});

// ==================== REPORTS ROUTES ====================
app.get('/api/reports', authenticateToken, (req, res) => {
    const totalApplications = applications.length;
    const shortlisted = applications.filter(a => a.status === 'Shortlisted').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    const selected = applications.filter(a => a.status === 'Selected').length;
    const pending = applications.filter(a => a.status === 'Pending').length;
    
    const topJobs = [
        { name: 'Frontend Developer', count: 45 },
        { name: 'Backend Developer', count: 36 },
        { name: 'Full Stack Developer', count: 28 },
        { name: 'UX Designer', count: 22 },
        { name: 'Data Analyst', count: 18 }
    ];
    
    const shortlistRatio = totalApplications > 0 ? ((shortlisted / totalApplications) * 100).toFixed(1) + '%' : '0%';
    const conversionRate = totalApplications > 0 ? ((selected / totalApplications) * 100).toFixed(1) + '%' : '0%';
    
    res.json({
        totalJobs: jobs.length,
        activeJobs: jobs.filter(j => j.status === 'Active').length,
        totalApplications,
        shortlisted,
        rejected,
        selected,
        pending,
        topJobs,
        avgSkillMatch: '76%',
        shortlistRatio,
        conversionRate,
        monthlyTrend: [
            { month: 'Jan', applications: 120 },
            { month: 'Feb', applications: 165 },
            { month: 'Mar', applications: 210 },
            { month: 'Apr', applications: 255 }
        ]
    });
});

// ==================== DASHBOARD STATS ====================
app.get('/api/dashboard', authenticateToken, (req, res) => {
    const activeJobs = jobs.filter(j => j.status === 'Active').length;
    const totalApps = applications.length;
    const shortlisted = applications.filter(a => a.status === 'Shortlisted').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    
    res.json({
        activeJobs,
        totalApplications: totalApps,
        shortlistedCandidates: shortlisted,
        rejectedCandidates: rejected,
        recentApplications: applications.slice(0, 5)
    });
});

// ==================== SERVE FRONTEND ====================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 NextHire HR Dashboard Server running on http://localhost:${PORT}`);
    console.log(`📊 API Endpoints available at http://localhost:${PORT}/api`);
    console.log(`\n🔑 Demo Credentials:`);
    console.log(`   Username: hradmin | Password: hr123`);
    console.log(`   Username: hruser | Password: user123\n`);
});

