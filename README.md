# 🎯 Quiz Application – Microservices Architecture

A full-stack Quiz Application built using **Spring Boot Microservices**, **API Gateway**, **Service Registry (Eureka)**, **Docker**, and a **React (Vite) frontend**.

---

## 🧩 Architecture Overview

- Service Registry – Eureka Server
- API Gateway – Spring Cloud Gateway
- Quiz Service – Quiz management
- Question Service – Question management
- MySQL – Separate database per service
- Frontend – React + Vite
- Docker & Docker Compose for orchestration

---

## 🛠 Tech Stack

**Backend**
- Java 17
- Spring Boot
- Spring Cloud Gateway
- Eureka Discovery
- JPA + Hibernate
- MySQL

**Frontend**
- React
- Vite
- Nginx (Docker)

**DevOps**
- Docker
- Docker Compose

---

## 🚀 How to Run the Project (One Command)

### 🔹 Prerequisites
- Docker
- Docker Compose
- Git

---

### 🔹 Steps

```bash
git clone https://github.com/snsumit/quiz-microservices-architecture.git
cd quiz-microservices-architecture/microservices
sudo docker compose up --build
