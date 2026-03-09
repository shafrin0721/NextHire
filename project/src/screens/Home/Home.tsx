import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

/* ========== DATA ========== */

const featuredJobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $180k",
    color: "blue" as const,
  },
  {
    title: "Marketing Manager",
    company: "GrowthCo",
    location: "New York, NY",
    type: "Full-time",
    salary: "$80k - $120k",
    color: "green" as const,
  },
  {
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Austin, TX",
    type: "Remote",
    salary: "$90k - $130k",
    color: "purple" as const,
  },
];

const impactStats = [
  { value: "15K+", label: "Jobs Posted" },
  { value: "50K+", label: "Registered Employers" },
  { value: "2K+", label: "Monthly Searches" },
  { value: "25K+", label: "Active Users" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    quote:
      "NextHire transformed my job search. I found my dream position in just two weeks. The platform's interface is incredibly intuitive and the job matching is spot-on!",
    avatar: "SJ",
    bgColor: "#4169E1",
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    quote:
      "The quality of job listings on NextHire is unmatched. I was able to connect with top companies that weren't visible on other platforms. Highly recommended!",
    avatar: "MC",
    bgColor: "#10b981",
  },
  {
    name: "Emily Davis",
    role: "UX Designer",
    quote:
      "Thanks to NextHire, I landed the perfect role that fits my skills. The entire process was seamless and the support team was incredibly helpful throughout.",
    avatar: "ED",
    bgColor: "#8b5cf6",
  },
];

/* ========== ICON COMPONENTS ========== */

const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DollarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const PenToolIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const jobIcons: Record<string, React.FC> = {
  blue: CodeIcon,
  green: TrendingUpIcon,
  purple: PenToolIcon,
};

/* ========== HOME COMPONENT ========== */

export const Home = (): JSX.Element => {
  return (
    <div className="home-page">
      {/* ===== NAVBAR ===== */}
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img
              src="/nexthire-logo.png"
              alt="NextHire Logo"
              className="navbar-logo-img"
            />
            <span className="navbar-logo-text">NextHire</span>
          </Link>

          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Browse Jobs</Link>
            </li>
            <li>
              <Link to="/companies">Companies</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>

          <div className="navbar-auth">
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/signup" className="btn-register">
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero-section" id="hero">
        <div className="hero-container">
          <div className="hero-content animate-fade-in-up">
            <h1 className="hero-title">
              Find Your Dream Job
              <br />
              Today
            </h1>
            <p className="hero-subtitle">
              Connect with top employers and discover career opportunities that match
              your skills and aspirations. Start your career journey with us.
            </p>
            <div className="hero-buttons">
              <Link to="/jobs" className="btn-hero-primary">
                <BriefcaseIcon />
                View Jobs
              </Link>
              <Link to="/signup" className="btn-hero-secondary">
                Apply Now
                <ArrowRightIcon />
              </Link>
            </div>
          </div>

          {/* Floating decoration */}
          <div className="hero-floating">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="30"
                y="20"
                width="140"
                height="100"
                rx="12"
                fill="white"
                opacity="0.6"
              />
              <rect
                x="90"
                y="5"
                width="40"
                height="25"
                rx="6"
                fill="white"
                opacity="0.4"
              />
              <line
                x1="55"
                y1="55"
                x2="145"
                y2="55"
                stroke="white"
                strokeWidth="3"
                opacity="0.3"
              />
              <line
                x1="55"
                y1="70"
                x2="120"
                y2="70"
                stroke="white"
                strokeWidth="3"
                opacity="0.3"
              />
              <line
                x1="55"
                y1="85"
                x2="135"
                y2="85"
                stroke="white"
                strokeWidth="3"
                opacity="0.3"
              />
              <line
                x1="55"
                y1="100"
                x2="100"
                y2="100"
                stroke="white"
                strokeWidth="3"
                opacity="0.3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ===== FEATURED JOBS ===== */}
      <section className="featured-section" id="featured-jobs">
        <div className="featured-container">
          <div className="section-header">
            <h2 className="section-title">Featured Job Opportunities</h2>
            <p className="section-subtitle">
              Discover exciting career opportunities from leading companies
              and brands
            </p>
          </div>

          <div className="jobs-grid">
            {featuredJobs.map((job, index) => {
              const IconComponent = jobIcons[job.color];
              return (
                <div
                  key={index}
                  className={`job-card animate-fade-in-up animate-delay-${index + 1}`}
                >
                  <div className="job-card-header">
                    <div className={`job-card-icon ${job.color}`}>
                      <IconComponent />
                    </div>
                    <div className="job-card-info">
                      <h3>{job.title}</h3>
                      <span className="job-card-company">{job.company}</span>
                    </div>
                  </div>

                  <div className="job-card-details">
                    <span className="job-detail-tag">
                      <MapPinIcon />
                      {job.location}
                    </span>
                    <span className="job-detail-tag">
                      <ClockIcon />
                      {job.type}
                    </span>
                    <span className="job-detail-tag">
                      <DollarIcon />
                      {job.salary}
                    </span>
                  </div>

                  <button className="btn-apply">Apply Now</button>
                </div>
              );
            })}
          </div>

          <div className="featured-view-all">
            <button className="btn-view-all">
              Explore More
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>

      {/* ===== ABOUT NEXTHIRE ===== */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-image-wrapper">
            <img
              src="/about-office.png"
              alt="NextHire team building future teams in a modern office"
              className="about-image"
            />
          </div>

          <div className="about-content">
            <h2>About NextHire</h2>
            <p>
              We're on a mission to connect talented professionals with innovative
              companies, building future teams that drive success and growth.
            </p>

            <div className="about-highlight-title">Our Mission</div>
            <p className="about-highlight-text">
              To bridge the gap between ambitious job seekers and companies that
              value talent. We empower individuals to take charge of their careers
              with tools and insights that matter.
            </p>

            <div className="about-highlight-title">Our Vision</div>
            <p className="about-highlight-text">
              To create a world where everyone has equal access to opportunities,
              empowering talent globally without borders.
            </p>

            <button className="btn-learn-more">
              Learn More About Us
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section className="impact-section" id="impact">
        <div className="impact-container">
          <div className="impact-header">
            <h2>Our Impact</h2>
            <p>Connecting talent with opportunities worldwide</p>
          </div>

          <div className="impact-grid">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className={`impact-stat animate-fade-in-up animate-delay-${index + 1}`}
              >
                <div className="impact-stat-value">{stat.value}</div>
                <div className="impact-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section" id="testimonials">
        <div className="testimonials-container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">
              Real stories from professionals who found their dream jobs
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className={`testimonial-card animate-fade-in-up animate-delay-${index + 1}`}
              >
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <div
                    className="testimonial-avatar"
                    style={{
                      background: t.bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      border: "none",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div className="testimonial-author-info">
                    <h4>{t.name}</h4>
                    <p>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <img
                  src="/nexthire-logo.png"
                  alt="NextHire Logo"
                  className="footer-logo-img"
                />
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
                <li>
                  <Link to="/jobs">Browse Jobs</Link>
                </li>
                <li>
                  <Link to="/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <a href="#">Career Tips</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact Us</h4>
              <ul>
                <li>
                  <a href="mailto:hello@nexthire.com?subject=General Inquiry">hello@nexthire.com</a>
                </li>
                <li>
                  <a href="#">+1 (555) 123-4567</a>
                </li>
                <li>
                  <a href="#">San Francisco, CA</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2024 NextHire. All rights reserved.</p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
