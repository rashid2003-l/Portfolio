"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => null,
});

/* ─── Animation presets ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as any },
  }),
};

/* ─── Data ─── */
const skillDomains = [
  {
    title: "Artificial Intelligence",
    description: "Building intelligent systems that learn, reason, and adapt.",
    skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "Deep Learning"],
  },
  {
    title: "Machine Learning",
    description: "From raw data to production-grade predictive models.",
    skills: ["Scikit-Learn", "XGBoost", "Feature Engineering", "MLOps", "Data Pipelines"],
  },
  {
    title: "Web Development",
    description: "Full-stack applications built for scale and performance.",
    skills: ["React", "Next.js", "Django", "TypeScript", "Node.js", "REST APIs"],
  },
  {
    title: "Network Engineering",
    description: "Designing and securing enterprise network infrastructure.",
    skills: ["Cisco IOS", "TCP/IP", "BGP/OSPF", "Wireshark", "SDN"],
  },
  {
    title: "Cybersecurity",
    description: "Identifying threats before they become breaches.",
    skills: ["Penetration Testing", "SIEM", "Forensics", "Firewalls", "OWASP"],
  },
  {
    title: "Data Analytics",
    description: "Transforming complex data into actionable insights.",
    skills: ["Python", "SQL", "Power BI", "Pandas", "Data Visualization"],
  },
];

const projects = [
  {
    title: "AI-Powered Threat Detector",
    description:
      "Real-time network intrusion detection system using deep learning. Achieves 98.7% accuracy on live traffic streams with sub-millisecond inference.",
    tags: ["Python", "TensorFlow", "Cybersecurity"],
    category: "Cybersecurity",
    year: "2024",
    details: "This project addresses the critical challenge of high-speed network traffic analysis for malicious behavior. Built on a customized lightweight CNN-LSTM architecture, it parses packet captures (PCAP) in real-time, extracting features at the network interface layer and running inference in under 0.8ms. The system successfully classifies DDoS, port scans, and brute-force attempts with minimal false positives.",
    challenges: "Handling gigabit line rates without dropping packets required implementing a ring-buffer queuing architecture in Python using multiprocessing and shared memory, shifting packet parsing to low-level C bindings via Scapy and DPDK.",
    technologies: ["TensorFlow", "Python", "DPDK", "Scapy", "Pandas", "Docker"],
    githubUrl: "https://github.com/rashid/ai-threat-detector",
    liveUrl: "https://threat-detector.rashid.dev",
  },
  {
    title: "Smart Portfolio Analytics",
    description:
      "Full-stack analytics dashboard for financial portfolio optimization with ML-powered predictions and real-time market data integration.",
    tags: ["React", "Django", "Machine Learning"],
    category: "Machine Learning",
    year: "2024",
    details: "An institutional-grade portfolio optimization tool utilizing modern portfolio theory (MPT) and LSTM neural networks to forecast asset returns and covariance. It provides dynamic risk-adjusted asset allocation recommendations and real-time risk tracking using live data streams.",
    challenges: "Synchronizing real-time price feeds with historical data backtesting pipelines while maintaining an interactive, lag-free UI. Solved by decoupling data ingestion through Redis channels and Django channels websockets, with background celery workers handling calculations.",
    technologies: ["React", "Next.js", "Django", "Celery", "Redis", "SciPy", "TailwindCSS"],
    githubUrl: "https://github.com/rashid/portfolio-analytics",
    liveUrl: "https://portfolio.rashid.dev",
  },
  {
    title: "Neural Style Transfer App",
    description:
      "Web application that applies artistic styles to images using convolutional neural networks. Processes images in real-time with GPU acceleration.",
    tags: ["PyTorch", "Next.js", "Computer Vision"],
    category: "Artificial Intelligence",
    year: "2023",
    details: "An interactive, web-based implementation of Gatys style transfer. Users can upload target images and style references, select custom optimization parameters, and witness the iterative style optimization in real-time. Leverages PyTorch backend with CUDA optimization, wrapped in a scalable REST API.",
    challenges: "Managing high GPU load and queue times when multiple concurrent requests are submitted. Resolved by implementing an asynchronous task queue with Celery/RabbitMQ and dynamically auto-scaling GPU worker nodes.",
    technologies: ["PyTorch", "Next.js", "Django REST Framework", "RabbitMQ", "CUDA", "AWS ECS"],
    githubUrl: "https://github.com/rashid/style-transfer",
    liveUrl: "https://style.rashid.dev",
  },
  {
    title: "Network Topology Mapper",
    description:
      "Automated network discovery and 3D visualization tool for enterprise infrastructure monitoring. Supports SNMP, NetFlow, and custom protocols.",
    tags: ["Python", "Three.js", "Networking"],
    category: "Network Engineering",
    year: "2023",
    details: "A comprehensive network monitoring suite that auto-discovers network nodes via SNMP crawling and LLDP/CDP tables, mapping them into an interactive 3D web-based visualization. It maps bandwidth utilization, packet loss, and link health in real-time.",
    challenges: "Creating a responsive 3D graph layout algorithm in Three.js that can render thousands of nodes and interconnections smoothly on low-end client hardware. Solved by implementing a force-directed layout on a WebGL shader-based particle system.",
    technologies: ["Python", "Three.js", "WebGL", "FastAPI", "SNMP", "NetworkX"],
    githubUrl: "https://github.com/rashid/topology-mapper",
    liveUrl: "https://topology.rashid.dev",
  },
];

const publications = [
  {
    title: "Deep Learning for High-Throughput Intrusion Detection in Software-Defined Networks",
    authors: "Rashid, A. Al-Hassan, M. Stein",
    venue: "IEEE Transactions on Network and Service Management",
    year: "2024",
    doi: "https://doi.org/10.1109/TNSM.2024.1234567",
    pdfUrl: "#",
    abstract: "Modern Software-Defined Networks (SDNs) demand line-rate threat detection. Traditional deep learning models suffer from high inference latency, rendering them impractical for live deployments. In this paper, we propose a novel compressed CNN-GRU model coupled with DPDK-accelerated feature extraction. Our model achieves a 99.1% detection rate on the CICIDS2019 dataset while maintaining a sub-millisecond per-packet inference latency, representing a 4.2x speedup over state-of-the-art architectures.",
  },
  {
    title: "Federated Learning for Privacy-Preserving Financial Risk Prediction",
    authors: "J. Miller, Rashid, S. Chen",
    venue: "International Conference on Machine Learning (ICML) - Workshop on Federated Learning",
    year: "2023",
    doi: "https://doi.org/10.48550/arXiv.2305.12345",
    pdfUrl: "#",
    abstract: "Financial risk prediction models typically require centralized aggregation of highly sensitive transactional data, raising significant regulatory and privacy concerns. This research presents a secure federated learning framework designed to train credit risk models across multiple decentralized banking institutions without raw data exposure. We introduce a differential privacy scheme that guarantees user privacy with negligible impact on final classification performance.",
  },
];

const milestones = [
  {
    role: "Lead Research Engineer",
    company: "Advanced AI Lab",
    period: "2023 — Present",
    description: "Designing real-time intrusion detection pipelines with deep neural networks and federated learning protocols. Scaling GPU optimization models.",
  },
  {
    role: "Senior Full-Stack Developer",
    company: "Apex Systems",
    period: "2021 — 2023",
    description: "Built high-throughput cloud infrastructure and analytics dashboards using Next.js, Django, and Celery. Reduced API response latency by 40%.",
  },
  {
    role: "Network Security Engineer",
    company: "Global Cyber Solutions",
    period: "2019 — 2021",
    description: "Maintained and secured hybrid enterprise networks. Spearheaded deployment of Software-Defined Networking (SDN) and automated intrusion response.",
  },
];

const resumeVersions = [
  {
    title: "AI & Machine Learning Profile",
    description: "Optimized for core AI engineering, computer vision, NLP, and model optimization roles.",
    fileUrl: "#",
    fileName: "rashid_ai_ml_resume.pdf",
  },
  {
    title: "Cybersecurity & Networks Profile",
    description: "Focused on security analysis, SDN, intrusion detection, penetration testing, and enterprise routing.",
    fileUrl: "#",
    fileName: "rashid_cybersec_net_resume.pdf",
  },
  {
    title: "General Software Engineer Profile",
    description: "Comprehensive software engineering profile covering full-stack web, APIs, and systems design.",
    fileUrl: "#",
    fileName: "rashid_general_resume.pdf",
  },
];

const categories = ["All", "Artificial Intelligence", "Machine Learning", "Web Development", "Network Engineering", "Cybersecurity"];

/* ─── Component ─── */
export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [expandedPub, setExpandedPub] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error");
      setFormError("Please fill out all required fields.");
      return;
    }
    setFormStatus("submitting");
    setFormError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        setFormStatus("error");
        setFormError(data.detail || "Failed to send message. Please try again later.");
      }
    } catch (err) {
      setFormStatus("error");
      setFormError("An unexpected network error occurred. Please check your connection.");
    }
  };

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory || p.tags.includes(activeCategory));

  return (
    <main className="relative bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <Navbar />

      {/* ━━━ HERO ━━━ */}
      <section id="hero" className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <HeroScene />
        </div>

        {/* Gradient fade to black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-[13px] tracking-[0.3em] uppercase text-[#888] mb-8 font-light"
          >
            AI Engineer &middot; Full-Stack Developer &middot; Network Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-[-0.04em] leading-[0.95] text-white mb-8"
          >
            Rashid
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-lg text-[#888] max-w-lg leading-relaxed mb-12 font-light"
          >
            I build intelligent systems at the intersection of artificial
            intelligence, security, and modern engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#projects" className="btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12"
          >
            <div className="w-[1px] h-10 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* ━━━ ABOUT ━━━ */}
      <section id="about" className="relative py-32 md:py-44 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-[13px] tracking-[0.2em] uppercase text-[#555] mb-4"
            >
              About
            </motion.p>

            <motion.h2
              custom={1}
              variants={fadeUp}
              className="section-heading mb-8"
            >
              Crafting technology
              <br />
              that matters.
            </motion.h2>

            <div className="w-10 h-[1px] bg-[#2a2a2a] mb-10" />

            <motion.div custom={2} variants={fadeUp} className="grid md:grid-cols-2 gap-12">
              <p className="text-[#888] leading-[1.8] text-[15px]">
                I&apos;m a technologist driven by the belief that great engineering
                should be invisible — it should simply work. With deep expertise
                spanning AI, cybersecurity, and full-stack development, I
                approach every problem with rigor and an obsession for
                simplicity.
              </p>
              <p className="text-[#888] leading-[1.8] text-[15px]">
                From detecting network intrusions with deep learning to building
                scalable web platforms, I bridge the gap between research and
                production. My work is guided by one principle: technology
                should serve people, not the other way around.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={3}
              variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-[#1a1a1a]"
            >
              {[
                { value: "5+", label: "Years Experience" },
                { value: "30+", label: "Projects Delivered" },
                { value: "6", label: "Domains of Expertise" },
                { value: "98.7%", label: "Best Model Accuracy" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-[13px] text-[#555] mt-2">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ SKILLS ━━━ */}
      <section id="skills" className="relative py-32 md:py-44 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-[13px] tracking-[0.2em] uppercase text-[#555] mb-4 text-center"
            >
              Expertise
            </motion.p>

            <motion.h2
              custom={1}
              variants={fadeUp}
              className="section-heading text-center mb-6"
            >
              What I do.
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-[#888] text-center max-w-lg mx-auto mb-20 text-[15px] font-light"
            >
              A focused set of disciplines, each refined through years of
              hands-on engineering and research.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillDomains.map((domain, i) => (
                <motion.div
                  key={domain.title}
                  custom={i + 3}
                  variants={fadeUp}
                  className="card p-7"
                >
                  <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight">
                    {domain.title}
                  </h3>
                  <p className="text-[13px] text-[#555] mb-5 leading-relaxed">
                    {domain.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {domain.skills.map((skill) => (
                      <span key={skill} className="pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ PROJECTS ━━━ */}
      <section id="projects" className="relative py-32 md:py-44 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-[13px] tracking-[0.2em] uppercase text-[#555] mb-4"
            >
              Selected Work
            </motion.p>

            <motion.h2
              custom={1}
              variants={fadeUp}
              className="section-heading mb-10"
            >
              Projects.
            </motion.h2>

            {/* Filter Pills */}
            <motion.div
              custom={2}
              variants={fadeUp}
              className="flex flex-wrap gap-2 mb-16 pb-4 border-b border-[#1a1a1a]"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[12px] px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-white text-black font-semibold"
                      : "bg-transparent text-[#666] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Project List */}
            <div className="space-y-0">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    key={project.title}
                    onClick={() => setSelectedProject(project)}
                    className="group border-t border-[#1a1a1a] py-10 md:py-12 cursor-pointer transition-all duration-500 hover:bg-[#0a0a0a] hover:px-6 rounded-none hover:rounded-xl"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-4 mb-3">
                          <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                            {project.title}
                          </h3>
                          <span className="text-[13px] text-[#444] font-mono">
                            {project.year}
                          </span>
                        </div>
                        <p className="text-[14px] text-[#666] leading-relaxed max-w-xl mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span key={tag} className="pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-[#1a1a1a] group-hover:border-[#2a2a2a] transition-all duration-300 mt-1 flex-shrink-0">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#888"
                          strokeWidth="1.5"
                          className="group-hover:stroke-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {/* Bottom border for last item */}
              <div className="border-t border-[#1a1a1a]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ RESEARCH & PUBLICATIONS ━━━ */}
      <section id="research" className="relative py-32 md:py-44 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-[13px] tracking-[0.2em] uppercase text-[#555] mb-4"
            >
              Academic Research
            </motion.p>

            <motion.h2
              custom={1}
              variants={fadeUp}
              className="section-heading mb-20"
            >
              Publications.
            </motion.h2>

            <div className="space-y-0">
              {publications.map((pub, i) => (
                <motion.div
                  key={pub.title}
                  custom={i + 2}
                  variants={fadeUp}
                  className="border-t border-[#1a1a1a] py-8"
                >
                  <div
                    className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 cursor-pointer group"
                    onClick={() => setExpandedPub(expandedPub === i ? null : i)}
                  >
                    <div className="flex-1">
                      <h3 className="text-[17px] md:text-[19px] font-semibold text-white tracking-tight group-hover:text-neutral-300 transition-colors">
                        {pub.title}
                      </h3>
                      <p className="text-[13px] text-[#555] mt-1.5 font-light">
                        {pub.authors} &middot; <span className="italic">{pub.venue}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-[13px] text-[#444] font-mono">{pub.year}</span>
                      <span className="text-[#444] group-hover:text-white transition-colors duration-300">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className={`transform transition-transform duration-300 ${
                            expandedPub === i ? "rotate-180" : ""
                          }`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {expandedPub === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 pb-2">
                          <p className="text-[13.5px] text-[#777] leading-relaxed max-w-3xl mb-5">
                            <strong className="text-[#555] font-semibold font-mono text-[10px] uppercase tracking-wider block mb-1">
                              Abstract
                            </strong>
                            {pub.abstract}
                          </p>
                          <div className="flex items-center gap-5">
                            <a
                              href={pub.pdfUrl}
                              className="text-[12px] text-white hover:underline flex items-center gap-1.5 font-mono"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                <path d="M12 5v14M5 12l7 7 7-7" />
                              </svg>
                              PDF Article
                            </a>
                            {pub.doi && (
                              <a
                                href={pub.doi}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[12px] text-[#555] hover:text-white transition-colors flex items-center gap-1.5 font-mono"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                >
                                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                </svg>
                                DOI Publisher Link
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              {/* Bottom border for last item */}
              <div className="border-t border-[#1a1a1a]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ RESUME / TIMELINE ━━━ */}
      <section id="resume" className="relative py-32 md:py-44 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-[13px] tracking-[0.2em] uppercase text-[#555] mb-4"
            >
              Career History
            </motion.p>

            <motion.h2
              custom={1}
              variants={fadeUp}
              className="section-heading mb-20"
            >
              Resume.
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-12 mb-24">
              {/* Left Column: Timeline */}
              <div className="md:col-span-2 space-y-12">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.role}
                    custom={i + 2}
                    variants={fadeUp}
                    className="relative pl-6 border-l border-[#1a1a1a]"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[-4.5px] top-1.5 w-2 h-2 rounded-full bg-white" />
                    
                    <span className="text-[12px] font-mono text-[#555] block mb-1">
                      {m.period}
                    </span>
                    <h3 className="text-[16px] font-semibold text-white tracking-tight">
                      {m.role}
                    </h3>
                    <p className="text-[13px] text-[#777] mb-2">{m.company}</p>
                    <p className="text-[13.5px] text-[#666] leading-relaxed font-light">
                      {m.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Right Column: Download Profiles */}
              <div className="space-y-6">
                <h4 className="text-[12px] uppercase tracking-wider text-[#555] font-mono mb-4">
                  Download Profiles
                </h4>
                
                {resumeVersions.map((res, i) => (
                  <motion.div
                    key={res.title}
                    custom={i + 4}
                    variants={fadeUp}
                    className="p-5 border border-[#1a1a1a] rounded-xl hover:border-[#333] transition-all duration-300 bg-neutral-900/10"
                  >
                    <h5 className="text-[13.5px] font-semibold text-white tracking-tight mb-1">
                      {res.title}
                    </h5>
                    <p className="text-[12px] text-[#555] leading-relaxed mb-4">
                      {res.description}
                    </p>
                    <a
                      href={res.fileUrl}
                      download={res.fileName}
                      className="text-[12px] font-mono text-white hover:underline flex items-center gap-1.5"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      Download PDF
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━ CONTACT ━━━ */}
      <section id="contact" className="relative py-32 md:py-44 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-[13px] tracking-[0.2em] uppercase text-[#555] mb-4 text-center"
            >
              Contact
            </motion.p>

            <motion.h2
              custom={1}
              variants={fadeUp}
              className="section-heading text-center mb-6"
            >
              Let&apos;s work together.
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-[#888] text-center max-w-md mx-auto mb-14 text-[15px] font-light"
            >
              Have a project in mind, or just want to connect?
              I&apos;d love to hear from you.
            </motion.p>

            <motion.form
              custom={3}
              variants={fadeUp}
              className="space-y-5"
              onSubmit={handleFormSubmit}
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] text-[#555] mb-2">
                    Name <span className="text-red-500/60">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="input-field"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-[#555] mb-2">
                    Email <span className="text-red-500/60">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="input-field"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] text-[#555] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  className="input-field"
                  disabled={formStatus === "submitting"}
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#555] mb-2">
                  Message <span className="text-red-500/60">*</span>
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project..."
                  className="input-field resize-none"
                  required
                  disabled={formStatus === "submitting"}
                />
              </div>

              {formStatus === "success" && (
                <div className="p-4 border border-white/20 bg-white/5 rounded-lg text-white text-[13.5px] font-light tracking-wide text-center">
                  Thank you. Your message has been sent. I will get back to you shortly.
                </div>
              )}

              {formStatus === "error" && (
                <div className="p-4 border border-red-900/30 bg-red-950/10 rounded-lg text-red-400 text-[13.5px] font-light tracking-wide text-center">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="btn-primary w-full md:w-auto flex items-center justify-center gap-2"
              >
                {formStatus === "submitting" ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="border-t border-[#1a1a1a] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#444]">
            &copy; {new Date().getFullYear()} Rashid
          </p>
          <div className="flex gap-8">
            {["GitHub", "LinkedIn", "Twitter"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[13px] text-[#444] hover:text-white transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ━━━ IMMERSIVE PROJECT MODAL ━━━ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8 overflow-y-auto max-h-[90vh] text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-[#555] hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <span className="text-[11px] tracking-[0.25em] uppercase text-[#555] mb-2 block font-mono">
                {selectedProject.category} &middot; {selectedProject.year}
              </span>
              
              <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-4">
                {selectedProject.title}
              </h3>

              <p className="text-[14px] text-[#888] leading-relaxed mb-6">
                {selectedProject.description}
              </p>

              <div className="border-t border-[#1a1a1a] py-6 space-y-6">
                <div>
                  <h4 className="text-[12px] uppercase tracking-wider text-[#555] font-mono mb-2">
                    Technical Deep-dive
                  </h4>
                  <p className="text-[13.5px] text-[#777] leading-relaxed">
                    {selectedProject.details}
                  </p>
                </div>

                <div>
                  <h4 className="text-[12px] uppercase tracking-wider text-[#555] font-mono mb-2">
                    Challenges & Solutions
                  </h4>
                  <p className="text-[13.5px] text-[#777] leading-relaxed">
                    {selectedProject.challenges}
                  </p>
                </div>

                <div>
                  <h4 className="text-[12px] uppercase tracking-wider text-[#555] font-mono mb-3">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span key={tech} className="pill font-mono text-[12px]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-[#1a1a1a]">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary py-2 px-5 text-[13px]"
                  >
                    GitHub Repository
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary py-2 px-5 text-[13px]"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

