# ☁️ Hypothetical Cloud Deployment Plan (High-Level)

This document outlines how one could deploy **The Book Stacker** app to a cloud provider like **AWS** or **Azure**, using DevOps tools. 

---

## 🔧 Toolchain & Strategy

- **Source Control**:  
  Use GitHub (or GitLab / Azure Repos) to host the codebase

- **CI/CD Pipeline**:  
  Leverage GitHub Actions (or GitLab CI / Azure DevOps) to build and run the deployment pipeline

- **Infrastructure Provisioning**:  
  Use Terraform to spin up a minimal Linux VM 

- **Provisioning & Configuration Management**:  
  Use Ansible to:
  - Install Docker, Node.js, and any system dependencies
  - Clone the repository into the server
  - Run `docker-compose up --build` to launch the app

---

## 🌐 Assumptions

- **Networking** (VPC, firewall rules, open ports) is handled ahead of time — the VM is assumed to be reachable over SSH and accessible via HTTP on port 3000
- **No object storage** (like AWS S3 or Azure Blob) is needed, since the entire application runs from the cloned Git repo
- **No managed database** is used — PostgreSQL runs as a Docker container alongside the application

---

## ✅ Summary

- Ideal for dev/test environments, internal demos, or lightweight self-hosting scenarios
