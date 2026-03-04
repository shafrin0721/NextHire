// Mock Data for NextHire HR Dashboard

// Authentication
export const users = [
    { id: 1, username: 'hradmin', password: 'hr123', name: 'HR Admin', role: 'Administrator', email: 'hr@nexthire.com' },
    { id: 2, username: 'hruser', password: 'user123', name: 'HR User', role: 'HR Manager', email: 'hruser@nexthire.com' }
];

// Jobs Data
export let jobs = [
    { 
        id: 1, 
        title: 'Frontend Developer', 
        department: 'IT', 
        location: 'Remote', 
        type: 'Full-Time', 
        applications: 34, 
        status: 'Active',
        requirements: 'React, JavaScript, CSS, HTML5',
        skills: ['React', 'JavaScript', 'CSS', 'HTML5'],
        description: 'We are looking for an experienced Frontend Developer...',
        expirationDate: '2024-12-31',
        questions: [
            { id: 1, question: 'What is the virtual DOM?', type: 'mcq', options: ['A lightweight copy of DOM', 'A real DOM', 'A database', 'A server'], correctAnswer: 0 },
            { id: 2, question: 'Which hook is used for side effects?', type: 'mcq', options: ['useState', 'useEffect', 'useContext', 'useReducer'], correctAnswer: 1 },
            { id: 3, question: 'What is React?', type: 'common', answer: '' }
        ]
    },
    { 
        id: 2, 
        title: 'Backend Developer', 
        department: 'IT', 
        location: 'Colombo', 
        type: 'Full-Time', 
        applications: 28, 
        status: 'Active',
        requirements: 'Node.js, Python, SQL, REST APIs',
        skills: ['Node.js', 'Python', 'SQL', 'REST APIs'],
        description: 'We need a skilled Backend Developer...',
        expirationDate: '2024-11-30',
        questions: [
            { id: 1, question: 'What is REST?', type: 'mcq', options: ['A programming language', 'An architectural style', 'A database', 'A server'], correctAnswer: 1 },
            { id: 2, question: 'Explain SQL vs NoSQL', type: 'common', answer: '' }
        ]
    },
    { 
        id: 3, 
        title: 'HR Executive', 
        department: 'Human Resources', 
        location: 'Colombo', 
        type: 'Full-Time', 
        applications: 18, 
        status: 'Active',
        requirements: 'Communication, HRIS, Recruitment',
        skills: ['Communication', 'HRIS', 'Recruitment'],
        description: 'HR Executive needed...',
        expirationDate: '2024-12-15',
        questions: []
    },
    { 
        id: 4, 
        title: 'UX Designer', 
        department: 'Design', 
        location: 'Remote', 
        type: 'Part-Time', 
        applications: 22, 
        status: 'Active',
        requirements: 'Figma, UI/UX, Prototyping',
        skills: ['Figma', 'UI/UX', 'Prototyping'],
        description: 'Looking for a creative UX Designer...',
        expirationDate: '2024-11-20',
        questions: []
    },
    { 
        id: 5, 
        title: 'Data Analyst', 
        department: 'Data', 
        location: 'Colombo', 
        type: 'Full-Time', 
        applications: 15, 
        status: 'Inactive',
        requirements: 'Python, SQL, Tableau',
        skills: ['Python', 'SQL', 'Tableau'],
        description: 'Data Analyst needed...',
        expirationDate: '2024-10-31',
        questions: []
    }
];

// Applications Data
export let applications = [
    { id: 'C-1023', candidateName: 'John Doe', position: 'Frontend Developer', experience: '3 Years', skillMatch: '85%', testScore: '82%', status: 'Pending', cvUrl: '#', email: 'john@example.com', phone: '+1 555-0101', skills: ['React', 'JavaScript', 'CSS'], education: 'BSc Computer Science', appliedDate: '2024-01-15' },
    { id: 'C-1045', candidateName: 'Jane Smith', position: 'Backend Developer', experience: '5 Years', skillMatch: '78%', testScore: '75%', status: 'Shortlisted', cvUrl: '#', email: 'jane@example.com', phone: '+1 555-0102', skills: ['Node.js', 'Python', 'SQL'], education: 'BSc Software Engineering', appliedDate: '2024-01-14' },
    { id: 'C-1067', candidateName: 'Mike Johnson', position: 'Full Stack Developer', experience: '4 Years', skillMatch: '82%', testScore: '79%', status: 'Interview Scheduled', cvUrl: '#', email: 'mike@example.com', phone: '+1 555-0103', skills: ['React', 'Node.js', 'MongoDB'], education: 'BSc IT', appliedDate: '2024-01-13' },
    { id: 'C-1089', candidateName: 'Sarah Williams', position: 'DevOps Engineer', experience: '6 Years', skillMatch: '91%', testScore: '88%', status: 'Selected', cvUrl: '#', email: 'sarah@example.com', phone: '+1 555-0104', skills: ['AWS', 'Docker', 'Kubernetes'], education: 'BSc Computer Engineering', appliedDate: '2024-01-12' },
    { id: 'C-1102', candidateName: 'Tom Brown', position: 'Data Analyst', experience: '2 Years', skillMatch: '72%', testScore: '70%', status: 'Rejected', cvUrl: '#', email: 'tom@example.com', phone: '+1 555-0105', skills: ['Python', 'Excel', 'SQL'], education: 'BSc Statistics', appliedDate: '2024-01-11' }
];

// Anonymous Candidates (for blind screening)
export let anonymousCandidates = [
    { id: 'C-2045', skillMatch: '88%', experience: '4 Years', education: 'BSc in Computer Science', certifications: 'AWS Certified Developer', testScore: '84%', revealed: false, identity: null },
    { id: 'C-2067', skillMatch: '82%', experience: '3 Years', education: 'BSc in Software Engineering', certifications: 'Google UX Certificate', testScore: '80%', revealed: false, identity: null },
    { id: 'C-2089', skillMatch: '76%', experience: '5 Years', education: 'BSc in Information Technology', certifications: 'Microsoft Certified', testScore: '74%', revealed: false, identity: null },
    { id: 'C-2102', skillMatch: '71%', experience: '2 Years', education: 'BSc in Computer Science', certifications: 'None', testScore: '68%', revealed: false, identity: null }
];

// Skill Tests
export let skillTests = [
    { id: 1, name: 'Frontend Technical Test', position: 'Frontend Developer', questions: 20, candidates: 15, avgScore: '78%', status: 'Active' },
    { id: 2, name: 'Backend Logic Test', position: 'Backend Developer', questions: 25, candidates: 12, avgScore: '74%', status: 'Active' },
    { id: 3, name: 'Python Coding Challenge', position: 'Data Analyst', questions: 15, candidates: 8, avgScore: '82%', status: 'Active' },
    { id: 4, name: 'System Design Test', position: 'Full Stack Developer', questions: 30, candidates: 10, avgScore: '71%', status: 'Inactive' }
];

// Interviews
export let interviews = [
    { id: 1, candidateId: 'C-1067', candidateName: 'Mike Johnson', position: 'Full Stack Developer', date: '2024-01-25', time: '10:00 AM', status: 'Scheduled', notes: '' },
    { id: 2, candidateId: 'C-1045', candidateName: 'Jane Smith', position: 'Backend Developer', date: '2024-01-26', time: '2:00 PM', status: 'Scheduled', notes: '' }
];

// Reports Data
export const reportsData = {
    topJobs: [
        { name: 'Frontend Developer', count: 45 },
        { name: 'Backend Developer', count: 36 },
        { name: 'Full Stack Developer', count: 28 },
        { name: 'UX Designer', count: 22 },
        { name: 'Data Analyst', count: 18 }
    ],
    skillMatch: '76%',
    shortlistRatio: '14.5%',
    conversionRate: '8.2%',
    monthlyTrend: [
        { month: 'Jan', applications: 120 },
        { month: 'Feb', applications: 165 },
        { month: 'Mar', applications: 210 },
        { month: 'Apr', applications: 255 }
    ]
};

// AI Resume Analysis Results
export function analyzeResume(cvSkills, jobSkills) {
    const matched = cvSkills.filter(skill => jobSkills.includes(skill));
    const missing = jobSkills.filter(skill => !cvSkills.includes(skill));
    const matchScore = Math.round((matched.length / jobSkills.length) * 100);
    
    return {
        matchedSkills: matched,
        missingSkills: missing,
        matchScore: matchScore,
        summary: `Found ${matched.length} matching skills out of ${jobSkills.length} required.`
    };
}

// Export Functions
export function exportToCSV(data, filename) {
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

export function exportToExcel(data, filename) {
    // Simple Excel-like CSV with .xlsx extension
    exportToCSV(data, filename.replace('.xlsx', '.csv'));
}

export function generatePDFReport(reportData) {
    // In a real app, this would use a library like jsPDF
    alert('PDF Report generation would be implemented with jsPDF library');
}

