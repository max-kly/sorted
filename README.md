# ✅ Sorted - A to-do application in TypeScript for Android and iOS

## Tech Stack ⚙️

- ⚡ **React Native**
- ⚡ **Redux**
- ⚡ **AWS Lambda**
- ⚡ **AWS API Gateway**
- ⚡ **Axios**
- ⚡ **Supabase**

---

## Requirements ❗️

| Package | Version |
|---------|---------|
| React Native | `0.76.9` |
| React | `18.3.1` |
| Axios | `^1.8.4` |
| Redux Toolkit | `^2.6.1` |
| React-Redux | `9.2.0` |
| PG | `^8.14.1` |
| Dotenv | `^16.4.7` |
| Serverless offline | `^14.4.0` |
| Jest | `^29.7.0` (dev dependency) |
| TypeScript | `^5.8.3` (dev dependency) |
| PG Format | `^1.0.4` (dev dependency) |

---

## 🧑‍💻 Installation

1. **Fork & Clone** the repository.
2. **Install backend dependencies**  
   ```sh
   cd backend
   npm install
   ```
3. **Install mobile dependencies**  
   ```sh
   cd ../mobile
   npm install
   ```
4. **Set up environment variables**  
   - In the **backend** directory, create a `.env.production` file:  
     ```env
     DATABASE_URL=your_database_url_here
     ```
    - In the **backend** directory, create a `.env.local` file:  
     ```env
     PGDATABASE=sorted_db
     ```
5. **Setup local db**  
   ```sh
   cd backend
   npm run setup-local-db
   ```
6. **Seed local database**  
   ```sh
   cd backend
   npm run seed-local
   ```
7. **Run Tests** (optional)  
   ```sh
   npx jest
   ```

---

## 🏠 How to Run Locally

1. Start the mobile (mobile connected to already deployed serverless API on AWS):  
   ```sh
   cd mobile
   npm start
   ```
2. To start backend locally:  
   ```sh
   cd backend
   npm run dev
   ```

---

## ☁️ How to deploy API

1. **Fork & Clone** the repository.
2. **Create a Supabase account** and save your **database password**.
3. **Get your database connection**:  
   - In Supabase, click on **Connect** → Copy the **Database Connection URL** under **Transaction Pooler**.
4. Set database url in your **env.production** file
5. To seed production database:  
   ```sh
   cd backend
   npm run seed-prod
   ```
6. Create an **IAM role** with access to **AWS Lambda**
7. Enter your AWS credentials:  
   ```sh
   aws configure
   ```
8. Deploy backend:  
   ```sh
   cd backend
   npm run deploy
   ```

---

## 🔌 How to connect mobile to deployed API

1. Change **baseURL** to your deployed API URL in **mobile/api/axios.ts** file

---

Crafted with ❤️ by [Max Kly](https://github.com/max-kly)
