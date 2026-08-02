# ClearHire

AI-powered resume screening platform for recruiters.

ClearHire is a production-oriented hiring platform that enables recruiters to upload candidate resumes, automatically process them using an asynchronous AI pipeline, rank candidates against job requirements, and perform on-demand LLM-based resume analysis.

---

# Repository Structure

This repository is organized as a Git monorepo.

```
ClearHire/
│
├── backend/      # Node.js + TypeScript REST API
├── frontend/     # React + TypeScript recruiter dashboard
├── worker/       # Python AI processing workers
│
├── docker-compose.yml
└── README.md
```

The project is divided into three independent components:

## Backend

Responsible for:

- Authentication
- Job management
- Resume upload workflow
- Batch creation
- Queue publishing
- AI analysis APIs
- Recruiter dashboard APIs

Originally maintained as legacy standalone repository

https://github.com/sheikh-aleem72/clearhire-backend

---

## Frontend

Responsible for:

- Recruiter dashboard
- Resume upload UI
- Candidate ranking
- AI analysis viewer
- Marketing pages

Originally maintained as legacy standalone repository

https://github.com/sheikh-aleem72/clearhire-frontend

---

## Worker

Responsible for:

- Resume parsing
- Resume normalization
- Embedding generation
- Semantic matching
- Candidate ranking
- Explanation generation
- LLM analysis
- Queue workers

Originally maintained as legacy standalone repository

https://github.com/sheikh-aleem72/clearhire-worker

---

# Git History

This repository was assembled from the three original repositories using Git subtree.

The original repositories remain available for historical reference.

Development now continues exclusively inside this monorepo.

---

# License

MIT
