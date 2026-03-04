// NextHire HR Dashboard - Main Application

const { useState, useEffect, createContext, useContext } = React;

// Create App Context
const AppContext = createContext();

// Mock Data - Exact Content from Figma
const mockData = {
    dashboard: {
        widgets: [
            { id: 1, label: 'Active Job Openings', value: '12', sublabel: 'Open Positions', icon: 'fa-briefcase', color: 'primary', trend: '+3', trendUp: true },
            { id: 2, label: 'Total Applications', value: '248', sublabel: 'Applications Received', icon: 'fa-users', color: 'info', trend: '+45', trendUp: true },
            { id: 3, label: 'Shortlisted Candidates', value: '37', sublabel: 'Candidates', icon: 'fa-check-circle', color: 'success', trend: '+12', trendUp: true },
            { id: 4, label: 'Rejected Candidates', value: '102', sublabel: 'Candidates', icon: 'fa-times-circle', color: 'danger', trend: '-8', trendUp: false }
        ],
        recentApplications: [
            { id: 'C-1023', job: 'Frontend Developer', experience: '3 Years', skillMatch: '85%', status: 'Pending' },
            { id: 'C-1045', job: 'Backend Developer', experience: '5 Years', skillMatch: '78%', status: 'Shortlisted' },
            { id: 'C-1089', job: 'Full Stack Developer', experience: '4 Years', skillMatch: '82%', status: 'Interview Scheduled' },
            { id: 'C-1102', job: 'DevOps Engineer', experience: '6 Years', skillMatch: '91%', status: 'Selected' }
        ],
        chartData: {
            applications: [12, 18, 15, 22, 28, 25, 32, 38, 35, 42, 48, 52],
            skills: [
                { name: 'JavaScript', value: 82 },
                { name: 'React', value: 78 },
                { name: 'Node.js', value: 75 },
                { name: 'Python', value: 71 },
                { name: 'SQL', value: 68 }
            ]
        }
    },
    jobs: [
        { id: 1, title: 'Frontend Developer', department: 'IT', location: 'Remote', type: 'Full-Time', applications: 34, status: 'Active' },
        { id: 2, title: 'Backend Developer', department: 'IT', location: 'Colombo', type: 'Full-Time', applications: 28, status: 'Active' },
        { id: 3, title: 'HR Executive', department: 'Human Resources', location: 'Colombo', type: 'Full-Time', applications: 18, status: 'Active' },
        { id: 4, title: 'UX Designer', department: 'Design', location: 'Remote', type: 'Part-Time', applications: 22, status: 'Active' },
        { id: 5, title: 'Data Analyst', department: 'Data', location: 'Colombo', type: 'Full-Time', applications: 15, status: 'Inactive' }
    ],
    applications: [
        { id: 'C-1023', position: 'Frontend Developer', experience: '3 Years', skillMatch: '85%', testScore: '82%', status: 'Pending' },
        { id: 'C-1045', position: 'Backend Developer', experience: '5 Years', skillMatch: '78%', testScore: '75%', status: 'Shortlisted' },
        { id: 'C-1067', position: 'Full Stack Developer', experience: '4 Years', skillMatch: '82%', testScore: '79%', status: 'Interview Scheduled' },
        { id: 'C-1089', position: 'DevOps Engineer', experience: '6 Years', skillMatch: '91%', testScore: '88%', status: 'Selected' },
        { id: 'C-1102', position: 'Data Analyst', experience: '2 Years', skillMatch: '72%', testScore: '70%', status: 'Rejected' }
    ],
    screening: [
        { id: 'C-2045', skillMatch: '88%', experience: '4 Years', education: 'BSc in Computer Science', certifications: 'AWS Certified Developer', testScore: '84%' },
        { id: 'C-2067', skillMatch: '82%', experience: '3 Years', education: 'BSc in Software Engineering', certifications: 'Google UX Certificate', testScore: '80%' },
        { id: 'C-2089', skillMatch: '76%', experience: '5 Years', education: 'BSc in Information Technology', certifications: 'Microsoft Certified', testScore: '74%' },
        { id: 'C-2102', skillMatch: '71%', experience: '2 Years', education: 'BSc in Computer Science', certifications: 'None', testScore: '68%' }
    ],
    tests: [
        { id: 1, name: 'Frontend Technical Test', position: 'Frontend Developer', questions: 20, candidates: 15, avgScore: '78%', status: 'Active' },
        { id: 2, name: 'Backend Logic Test', position: 'Backend Developer', questions: 25, candidates: 12, avgScore: '74%', status: 'Active' },
        { id: 3, name: 'Python Coding Challenge', position: 'Data Analyst', questions: 15, candidates: 8, avgScore: '82%', status: 'Active' },
        { id: 4, name: 'System Design Test', position: 'Full Stack Developer', questions: 30, candidates: 10, avgScore: '71%', status: 'Inactive' }
    ],
    reports: {
        topJobs: [
            { name: 'Frontend Developer', count: 45 },
            { name: 'Backend Developer', count: 36 },
            { name: 'Full Stack Developer', count: 28 },
            { name: 'UX Designer', count: 22 },
            { name: 'Data Analyst', count: 18 }
        ],
        skillMatch: '76%',
        shortlistRatio: '14.5%',
        conversionRate: '8.2%'
    }
};

// Sidebar Component
function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }) {
    const menuItems = [
        { id: 'dashboard', icon: 'fa-gauge-high', label: 'Dashboard' },
        { id: 'jobs', icon: 'fa-briefcase', label: 'Job Postings' },
        { id: 'applications', icon: 'fa-file-alt', label: 'Applications' },
        { id: 'screening', icon: 'fa-user-secret', label: 'Anonymous Screening' },
        { id: 'tests', icon: 'fa-clipboard-check', label: 'Skill Tests' },
        { id: 'reports', icon: 'fa-chart-bar', label: 'Reports' }
    ];

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}></div>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <a href="#" className="logo">
                        <div className="logo-icon">
                            <i className="fa-solid fa-h"></i>
                        </div>
                        <div className="logo-text">
                            Next<span>Hire</span>
                        </div>
                    </a>
                </div>
                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <div className="nav-section-title">Main Menu</div>
                        {menuItems.map(item => (
                            <div 
                                key={item.id}
                                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                                onClick={() => {
                                    setCurrentPage(item.id);
                                    setIsOpen(false);
                                }}
                            >
                                <i className={`fa-solid ${item.icon}`}></i>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </nav>
                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">HR</div>
                        <div className="user-details">
                            <div className="user-name">HR Admin</div>
                            <div className="user-role">Administrator</div>
                        </div>
                    </div>
                    <button className="logout-btn">
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

// Header Component
function Header({ currentPage }) {
    const pageTitles = {
        dashboard: 'HR Recruitment Dashboard',
        jobs: 'Manage Job Postings',
        applications: 'Candidate Applications',
        screening: 'Anonymous Candidate Screening',
        tests: 'Skill Test Management',
        reports: 'Recruitment Reports & Analytics'
    };

    const pageSubtitles = {
        dashboard: 'Manage hiring activities and track recruitment performance.',
        jobs: 'Create and manage job opportunities.',
        applications: 'Review and manage submitted job applications.',
        screening: 'Candidate identity is hidden during initial evaluation.',
        tests: 'Create and monitor skill assessments.',
        reports: 'Analyze hiring performance and recruitment statistics.'
    };

    return (
        <header className="header">
            <div className="header-left">
                <button className="sidebar-toggle" onClick={() => document.querySelector('.sidebar').classList.toggle('open')}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div>
                    <h1 className="header-title">{pageTitles[currentPage]}</h1>
                    <p className="header-subtitle">{pageSubtitles[currentPage]}</p>
                </div>
            </div>
            <div className="header-right">
                <button className="header-icon-btn tooltip" data-tooltip="Notifications">
                    <i className="fa-solid fa-bell"></i>
                    <span className="badge-count">3</span>
                </button>
                <button className="header-icon-btn tooltip" data-tooltip="Settings">
                    <i className="fa-solid fa-gear"></i>
                </button>
            </div>
        </header>
    );
}

// Dashboard Page
function DashboardPage() {
    const { dashboard } = mockData;

    return (
        <div className="page-content fade-in">
            {/* Summary Cards */}
            <div className="dashboard-widgets">
                {dashboard.widgets.map(widget => (
                    <div key={widget.id} className="widget">
                        <div className="widget-header">
                            <div className={`widget-icon ${widget.color}`}>
                                <i className={`fa-solid ${widget.icon}`}></i>
                            </div>
                            <div className={`widget-trend ${widget.trendUp ? 'up' : 'down'}`}>
                                <i className={`fa-solid fa-arrow-${widget.trendUp ? 'up' : 'down'}`}></i>
                                {widget.trend}
                            </div>
                        </div>
                        <div className="widget-value">{widget.value}</div>
                        <div className="widget-label">{widget.label}</div>
                        <div className="widget-sublabel">{widget.sublabel}</div>
                    </div>
                ))}
            </div>

            {/* Analytics Section */}
            <div className="analytics-section">
                <h2 className="section-title">Recruitment Overview</h2>
                <p className="section-subtitle">Track hiring progress and application trends.</p>
                
                <div className="dashboard-charts">
                    <div className="chart-container">
                        <div className="chart-header">
                            <h3 className="chart-title">Applications Received (Last 30 Days)</h3>
                        </div>
                        <div className="chart-bars">
                            {dashboard.chartData.applications.map((value, index) => (
                                <div 
                                    key={index} 
                                    className="chart-bar" 
                                    style={{ height: `${value}%` }}
                                    data-value={value}
                                >
                                    <span className="chart-bar-label">Day {index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="chart-container">
                        <div className="chart-header">
                            <h3 className="chart-title">Average Skill Match Rate</h3>
                        </div>
                        <div className="chart-bars">
                            {dashboard.chartData.skills.map((skill, index) => (
                                <div 
                                    key={index} 
                                    className="chart-bar" 
                                    style={{ height: `${skill.value}%`, background: `hsl(${210 + index * 15}, 70%, 50%)` }}
                                    data-value={`${skill.value}%`}
                                >
                                    <span className="chart-bar-label">{skill.name.substring(0, 3)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Applications */}
            <div className="recent-section">
                <div className="recent-header">
                    <h2 className="section-title">Recent Applications</h2>
                    <button className="btn btn-outline">View All Applications</button>
                </div>
                
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Candidate ID</th>
                                <th>Job Title</th>
                                <th>Experience Level</th>
                                <th>Skill Match %</th>
                                <th>Application Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboard.recentApplications.map(app => (
                                <tr key={app.id}>
                                    <td><strong>{app.id}</strong></td>
                                    <td>{app.job}</td>
                                    <td>{app.experience}</td>
                                    <td>
                                        <div className="skill-match-cell">
                                            <div className="progress" style={{ width: '60px' }}>
                                                <div className="progress-bar" style={{ width: app.skillMatch }}></div>
                                            </div>
                                            {app.skillMatch}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn view" title="View">
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Job Postings Page
function JobPostingsPage() {
    const [jobs, setJobs] = useState(mockData.jobs);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [deptFilter, setDeptFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDept = deptFilter === 'all' || job.department === deptFilter;
        const matchesStatus = statusFilter === 'all' || job.status.toLowerCase() === statusFilter;
        return matchesSearch && matchesDept && matchesStatus;
    });

    return (
        <div className="page-content fade-in">
            <div className="page-header-compact">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-plus"></i>
                    Post New Job
                </button>
            </div>

            {/* Filters */}
            <div className="filter-bar">
                <div className="filter-search">
                    <i className="fa-solid fa-search"></i>
                    <input 
                        type="text" 
                        placeholder="Search job title..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <label className="filter-label">Category</label>
                    <select className="filter-select" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
                        <option value="all">All Departments</option>
                        <option value="IT">IT</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Design">Design</option>
                        <option value="Data">Data</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label">Location</label>
                    <select className="filter-select">
                        <option>All Locations</option>
                        <option>Remote</option>
                        <option>Colombo</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label">Status</label>
                    <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Jobs Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Department</th>
                            <th>Location</th>
                            <th>Employment Type</th>
                            <th>Applications</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs.map(job => (
                            <tr key={job.id}>
                                <td><strong>{job.title}</strong></td>
                                <td>{job.department}</td>
                                <td>{job.location}</td>
                                <td>{job.type}</td>
                                <td>{job.applications}</td>
                                <td>
                                    <span className={`status-badge ${job.status.toLowerCase()}`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-btn edit" title="Edit">
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                        <button className="action-btn delete" title="Close">
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Post Job Modal */}
            {showModal && (
                <div className="modal-backdrop" onClick={() => setShowModal(false)}>
                    <div className="modal job-modal slide-in" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Post New Job</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="job-form">
                                <div className="form-group">
                                    <label className="form-label">Job Title</label>
                                    <input type="text" className="form-input" placeholder="Enter job title" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Department</label>
                                    <select className="form-select">
                                        <option>IT</option>
                                        <option>Human Resources</option>
                                        <option>Design</option>
                                        <option>Data</option>
                                        <option>Marketing</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input type="text" className="form-input" placeholder="Enter location" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Employment Type</label>
                                    <select className="form-select">
                                        <option>Full-Time</option>
                                        <option>Part-Time</option>
                                        <option>Contract</option>
                                        <option>Internship</option>
                                    </select>
                                </div>
                                <div className="form-group full-width">
                                    <label className="form-label">Job Description</label>
                                    <textarea className="form-textarea" rows="4" placeholder="Enter job description"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary">Post Job</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Applications Page
function ApplicationsPage() {
    const [applications, setApplications] = useState(mockData.applications);
    const [searchTerm, setSearchTerm] = useState('');
    const [jobFilter, setJobFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredApps = applications.filter(app => {
        const matchesSearch = app.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesJob = jobFilter === 'all' || app.position === jobFilter;
        const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
        return matchesSearch && matchesJob && matchesStatus;
    });

    return (
        <div className="page-content fade-in">
            {/* Filters */}
            <div className="filter-bar">
                <div className="filter-search">
                    <i className="fa-solid fa-search"></i>
                    <input 
                        type="text" 
                        placeholder="Search by Candidate ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <label className="filter-label">Filter by Job Position</label>
                    <select className="filter-select" value={jobFilter} onChange={(e) => setJobFilter(e.target.value)}>
                        <option value="all">All Positions</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label">Filter by Status</label>
                    <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Selected">Selected</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label">Filter by Skill Match</label>
                    <select className="filter-select">
                        <option>All</option>
                        <option>80%+</option>
                        <option>60-80%</option>
                        <option>Below 60%</option>
                    </select>
                </div>
            </div>

            {/* Applications Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Candidate ID</th>
                            <th>Applied Position</th>
                            <th>Experience</th>
                            <th>Skill Match %</th>
                            <th>Test Score</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApps.map(app => (
                            <tr key={app.id}>
                                <td><strong>{app.id}</strong></td>
                                <td>{app.position}</td>
                                <td>{app.experience}</td>
                                <td>
                                    <div className="skill-match-cell">
                                        <div className="progress" style={{ width: '60px' }}>
                                            <div className="progress-bar" style={{ width: app.skillMatch }}></div>
                                        </div>
                                        {app.skillMatch}
                                    </div>
                                </td>
                                <td>{app.testScore}</td>
                                <td>
                                    <span className={`status-badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-btn view" title="View">
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                        <button className="action-btn download" title="Download CV">
                                            <i className="fa-solid fa-download"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Anonymous Screening Page
function ScreeningPage() {
    const [candidates, setCandidates] = useState(mockData.screening);
    const [revealedIds, setRevealedIds] = useState([]);

    const revealIdentity = (id) => {
        if (revealedIds.includes(id)) {
            setRevealedIds(revealedIds.filter(rid => rid !== id));
        } else {
            setRevealedIds([...revealedIds, id]);
        }
    };

    return (
        <div className="page-content fade-in">
            <div className="screening-cards">
                {candidates.map(candidate => (
                    <div key={candidate.id} className="screening-card">
                        <div className="screening-card-header">
                            <div className="candidate-id">Candidate ID: {candidate.id}</div>
                            <div className="skill-match-display">
                                <span className="skill-match-label">Skill Match:</span>
                                <span className="skill-match-value">{candidate.skillMatch}</span>
                            </div>
                        </div>
                        <div className="screening-card-body">
                            <div className="screening-info">
                                <div className="info-row">
                                    <span className="info-label">Experience:</span>
                                    <span className="info-value">{candidate.experience}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Education:</span>
                                    <span className="info-value">{candidate.education}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Certifications:</span>
                                    <span className="info-value">{candidate.certifications}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Test Score:</span>
                                    <span className="info-value">{candidate.testScore}</span>
                                </div>
                            </div>
                        </div>
                        <div className="screening-card-actions">
                            <button className="btn btn-success btn-sm">Shortlist</button>
                            <button className="btn btn-danger btn-sm">Reject</button>
                            <button 
                                className="btn btn-outline btn-sm"
                                onClick={() => revealIdentity(candidate.id)}
                            >
                                <i className={`fa-solid ${revealedIds.includes(candidate.id) ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                {revealedIds.includes(candidate.id) ? ' Hide Identity' : ' Reveal Identity'}
                            </button>
                        </div>
                        {revealedIds.includes(candidate.id) && (
                            <div className="revealed-identity">
                                <i className="fa-solid fa-user"></i> Identity Revealed: John Doe
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// Skill Tests Page
function SkillTestsPage() {
    const [tests, setTests] = useState(mockData.tests);
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="page-content fade-in">
            <div className="page-header-compact">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-plus"></i>
                    Create New Test
                </button>
            </div>

            {/* Tests Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Test Name</th>
                            <th>Related Position</th>
                            <th>Total Questions</th>
                            <th>Assigned Candidates</th>
                            <th>Average Score</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map(test => (
                            <tr key={test.id}>
                                <td><strong>{test.name}</strong></td>
                                <td>{test.position}</td>
                                <td>{test.questions}</td>
                                <td>{test.candidates}</td>
                                <td>{test.avgScore}</td>
                                <td>
                                    <span className={`status-badge ${test.status.toLowerCase()}`}>
                                        {test.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-outline btn-sm">
                                        <i className="fa-solid fa-chart-bar"></i>
                                        View Results
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Test Modal */}
            {showModal && (
                <div className="modal-backdrop" onClick={() => setShowModal(false)}>
                    <div className="modal job-modal slide-in" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">Create New Test</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="job-form">
                                <div className="form-group full-width">
                                    <label className="form-label">Test Name</label>
                                    <input type="text" className="form-input" placeholder="Enter test name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Related Position</label>
                                    <select className="form-select">
                                        <option>Select Position</option>
                                        <option>Frontend Developer</option>
                                        <option>Backend Developer</option>
                                        <option>Full Stack Developer</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Total Questions</label>
                                    <input type="number" className="form-input" placeholder="20" />
                                </div>
                                <div className="form-group full-width">
                                    <label className="form-label">Test Description</label>
                                    <textarea className="form-textarea" rows="3" placeholder="Describe the test"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary">Create Test</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Reports Page
function ReportsPage() {
    const { reports } = mockData;

    return (
        <div className="page-content fade-in">
            {/* Export Buttons */}
            <div className="reports-header">
                <div className="export-buttons">
                    <button className="export-btn">
                        <i className="fa-solid fa-file-csv"></i> Export CSV
                    </button>
                    <button className="export-btn">
                        <i className="fa-solid fa-file-excel"></i> Export Excel
                    </button>
                    <button className="export-btn">
                        <i className="fa-solid fa-file-pdf"></i> Download PDF
                    </button>
                </div>
            </div>

            {/* Report Cards */}
            <div className="reports-grid">
                <div className="report-card">
                    <h3 className="report-card-title">
                        <i className="fa-solid fa-briefcase" style={{ marginRight: '10px', color: 'var(--primary)' }}></i>
                        Top 5 Most Applied Jobs
                    </h3>
                    <div className="chart-bars" style={{ height: '200px' }}>
                        {reports.topJobs.map((job, index) => (
                            <div 
                                key={index} 
                                className="chart-bar" 
                                style={{ height: `${(job.count / 45) * 100}%` }}
                                data-value={job.count}
                            >
                                <span className="chart-bar-label">{job.name.substring(0, 3)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="report-card">
                    <h3 className="report-card-title">
                        <i className="fa-solid fa-chart-line" style={{ marginRight: '10px', color: 'var(--primary)' }}></i>
                        Monthly Application Trend
                    </h3>
                    <div className="chart-bars" style={{ height: '200px' }}>
                        <div className="chart-bar" style={{ height: '40%' }} data-value="120"></div>
                        <div className="chart-bar" style={{ height: '55%' }} data-value="165"></div>
                        <div className="chart-bar" style={{ height: '70%' }} data-value="210"></div>
                        <div className="chart-bar" style={{ height: '85%' }} data-value="255"></div>
                    </div>
                </div>

                <div className="report-card">
                    <h3 className="report-card-title">
                        <i className="fa-solid fa-check-circle" style={{ marginRight: '10px', color: 'var(--success)' }}></i>
                        Average Skill Match Rate
                    </h3>
                    <div className="report-stat-large">
                        <div className="stat-value-large">{reports.skillMatch}</div>
                        <div className="stat-label-large">Average Score</div>
                    </div>
                </div>

                <div className="report-card">
                    <h3 className="report-card-title">
                        <i className="fa-solid fa-percentage" style={{ marginRight: '10px', color: 'var(--warning)' }}></i>
                        Shortlist Ratio
                    </h3>
                    <div className="report-stat-large">
                        <div className="stat-value-large">{reports.shortlistRatio}</div>
                        <div className="stat-label-large">Candidates Shortlisted</div>
                    </div>
                </div>

                <div className="report-card">
                    <h3 className="report-card-title">
                        <i className="fa-solid fa-arrow-trend-up" style={{ marginRight: '10px', color: 'var(--info)' }}></i>
                        Recruitment Conversion Rate
                    </h3>
                    <div className="report-stat-large">
                        <div className="stat-value-large">{reports.conversionRate}</div>
                        <div className="stat-label-large">Selected from Applications</div>
                    </div>
                </div>

                <div className="report-card">
                    <h3 className="report-card-title">
                        <i className="fa-solid fa-star" style={{ marginRight: '10px', color: 'var(--danger)' }}></i>
                        Skill Score Distribution
                    </h3>
                    <div className="chart-bars" style={{ height: '200px' }}>
                        <div className="chart-bar" style={{ height: '60%', background: 'var(--success)' }} data-value="60%"></div>
                        <div className="chart-bar" style={{ height: '80%', background: 'var(--primary)' }} data-value="80%"></div>
                        <div className="chart-bar" style={{ height: '45%', background: 'var(--warning)' }} data-value="45%"></div>
                        <div className="chart-bar" style={{ height: '30%', background: 'var(--danger)' }} data-value="30%"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Main App Component
function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderPage = () => {
        switch(currentPage) {
            case 'dashboard': return <DashboardPage />;
            case 'jobs': return <JobPostingsPage />;
            case 'applications': return <ApplicationsPage />;
            case 'screening': return <ScreeningPage />;
            case 'tests': return <SkillTestsPage />;
            case 'reports': return <ReportsPage />;
            default: return <DashboardPage />;
        }
    };

    return (
        <AppContext.Provider value={{ currentPage, setCurrentPage }}>
            <div className="app-container">
                <Sidebar 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage}
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
                <main className="main-content">
                    <Header currentPage={currentPage} />
                    {renderPage()}
                </main>
            </div>
        </AppContext.Provider>
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

