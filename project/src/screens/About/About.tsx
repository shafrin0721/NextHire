import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

/* ========== DATA ========== */

const teamMembers = [
    { name: "Sarah Johnson", role: "Chief Executive Officer", initials: "SJ", bg: "#4169E1" },
    { name: "Michael Chen", role: "Chief Technology Officer", initials: "MC", bg: "#10b981" },
    { name: "Emily Rodriguez", role: "Marketing Director", initials: "ER", bg: "#9333ea" },
    { name: "David Thompson", role: "Head of Operations", initials: "DT", bg: "#ea580c" },
    { name: "Jessica Lee", role: "HR Manager", initials: "JL", bg: "#e11d48" },
    { name: "James Wilson", role: "Lead Developer", initials: "JW", bg: "#0d9488" },
    { name: "Amanda Garcia", role: "UX Designer", initials: "AG", bg: "#d97706" },
    { name: "Robert Martinez", role: "Sales Manager", initials: "RM", bg: "#4f46e5" },
];

const coreValues = [
    {
        title: "Innovation",
        description: "We constantly push boundaries to create cutting-edge solutions for the future of hiring.",
        color: "blue" as const,
        icon: "lightbulb",
    },
    {
        title: "Integrity",
        description: "Building lasting relationships through transparent, ethical practices in everything we do.",
        color: "green" as const,
        icon: "shield",
    },
    {
        title: "Collaboration",
        description: "Together we achieve more. Great results come through powerful teamwork and partnerships.",
        color: "purple" as const,
        icon: "users",
    },
    {
        title: "Excellence",
        description: "We hold ourselves to the highest standards, delivering exceptional experiences always.",
        color: "orange" as const,
        icon: "star",
    },
    {
        title: "Sustainability",
        description: "Committed to building a sustainable future through responsible hiring practices.",
        color: "teal" as const,
        icon: "leaf",
    },
    {
        title: "Growth",
        description: "Empowering individual and organizational growth with the right career pathways.",
        color: "amber" as const,
        icon: "trending",
    },
    {
        title: "Trust",
        description: "Earning the confidence of candidates and employers through reliable, consistent service.",
        color: "indigo" as const,
        icon: "heart",
    },
    {
        title: "Passion",
        description: "Driven by a genuine passion to help people find meaningful, fulfilling careers.",
        color: "rose" as const,
        icon: "fire",
    },
];

/* ========== ICONS ========== */

const TargetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" /><path d="M10 22h4" />
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 1c1 2 2 4.5 2 8 0 5.5-4.78 11-10 11z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
);

const TrendingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
);

const valueIcons: Record<string, React.FC> = {
    lightbulb: LightbulbIcon,
    shield: ShieldIcon,
    users: UsersIcon,
    star: StarIcon,
    leaf: LeafIcon,
    trending: TrendingIcon,
    heart: HeartIcon,
    fire: FireIcon,
};

/* ========== ABOUT COMPONENT ========== */

export const About = (): JSX.Element => {
    return (
        <div className="about-page">
            {/* ===== NAVBAR ===== */}
            <header className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <img src="/nexthire-logo.png" alt="NextHire Logo" className="navbar-logo-img" />
                        <span className="navbar-logo-text">NextHire</span>
                    </Link>

                    <ul className="navbar-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>

                    <div className="navbar-auth">
                        <Link to="/login" className="btn-nav-login">Login</Link>
                        <Link to="/signup" className="btn-nav-register">Register</Link>
                    </div>
                </div>
            </header>

            {/* ===== HERO ===== */}
            <section className="about-hero">
                <div className="about-hero-container">
                    <h1>About Our Company</h1>
                    <p>
                        We are passionate innovators dedicated to transforming ideas into reality. Our
                        mission is to deliver exceptional solutions that empower businesses and inspire
                        extraordinary experiences.
                    </p>
                </div>
            </section>

            {/* ===== MISSION & VISION ===== */}
            <section className="mission-vision-section">
                <div className="mission-vision-container">
                    <div className="mv-card about-animate about-delay-1">
                        <div className="mv-card-header">
                            <div className="mv-card-icon">
                                <TargetIcon />
                            </div>
                            <h2>Our Mission</h2>
                        </div>
                        <p>
                            To revolutionize the hiring industry by providing innovative,
                            accessible, and efficient recruitment solutions that empower both
                            job seekers and employers. We strive to create meaningful
                            connections that foster professional growth and drive business
                            success.
                        </p>
                        <br />
                        <p>
                            We believe in nurturing top talent, fostering creativity,
                            and building a world where the right opportunities reach the right
                            individuals time and again.
                        </p>
                    </div>

                    <div className="mv-card about-animate about-delay-2">
                        <div className="mv-card-header">
                            <div className="mv-card-icon">
                                <EyeIcon />
                            </div>
                            <h2>Our Vision</h2>
                        </div>
                        <p>
                            To become the global leader in career development and
                            talent acquisition by creating a world where career growth and
                            making aspiration aligned change isn't the achievement.
                        </p>
                        <br />
                        <p>
                            We envision a future where hiring is seamless, transparent,
                            and fair — where individuals and organizations thrive harmoniously
                            together, shaping the next generation of work
                            for generations to come.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== MEET OUR TEAM ===== */}
            <section className="team-section">
                <div className="team-container">
                    <div className="section-header">
                        <h2>Meet Our Team</h2>
                        <p>
                            Talented professionals, creative passion, innovators, and a shared
                            commitment to excellence
                        </p>
                    </div>

                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div key={index} className={`team-card about-animate about-delay-${index + 1}`}>
                                <div className="team-avatar-wrapper">
                                    <div
                                        className="team-avatar-placeholder"
                                        style={{ background: member.bg }}
                                    >
                                        {member.initials}
                                    </div>
                                </div>
                                <h3>{member.name}</h3>
                                <div className="team-card-role">{member.role}</div>
                                <div className="team-social">
                                    <a href="#" aria-label="Twitter"><TwitterIcon /></a>
                                    <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
                                    <a href="#" aria-label="Email"><MailIcon /></a>
                                </div>
                                <button className="btn-view-profile">View Profile</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CORE VALUES ===== */}
            <section className="values-section">
                <div className="values-container">
                    <div className="section-header">
                        <h2>Our Core Values</h2>
                        <p>
                            The principles that guide everything we do and define who we are as a
                            company
                        </p>
                    </div>

                    <div className="values-grid">
                        {coreValues.map((value, index) => {
                            const IconComponent = valueIcons[value.icon];
                            return (
                                <div key={index} className={`value-card about-animate about-delay-${index + 1}`}>
                                    <div className={`value-icon ${value.color}`}>
                                        <IconComponent />
                                    </div>
                                    <h3>{value.title}</h3>
                                    <p>{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <img src="/nexthire-logo.png" alt="NextHire Logo" className="footer-logo-img" />
                                <span className="footer-logo-text">NextHire</span>
                            </div>
                            <p>
                                Your gateway to amazing career opportunities. Building future teams
                                by connecting top talent with leading companies.
                            </p>
                        </div>

                        <div className="footer-column">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/jobs">Browse Jobs</Link></li>
                                <li><Link to="/companies">Companies</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><a href="#">Career Tips</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Support</h4>
                            <ul>
                                <li><a href="#">Help Center</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Contact Us</h4>
                            <ul>
                                <li><a href="mailto:hello@nexthire.com?subject=General Inquiry">hello@nexthire.com</a></li>
                                <li><a href="#">+1 (555) 123-4567</a></li>
                                <li><a href="#">San Francisco, CA</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2024 NextHire. All rights reserved.</p>
                        <div className="footer-social">
                            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
                            <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
                            <a href="#" aria-label="GitHub"><GithubIcon /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
