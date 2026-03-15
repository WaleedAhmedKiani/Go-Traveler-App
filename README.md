
<h2>Features</h2>
•	User Authentication
o	Sign in with Google or GitHub
o	Secure session management with NextAuth.js
•	Trip Management
o	Create, update, and delete trips
o	Add locations with latitude & longitude
o	Manage trip itineraries
•	Interactive Map & Globe
o	Visualize trips dynamically with react-globe.gl
o	Zoom, pan, and explore all your trip locations
•	Image Uploads
o	Upload trip images using UploadThing
o	Supports secure remote storage and optimized delivery
•	Responsive Design
o	Mobile-first with Tailwind CSS
o	Smooth animations with tw-animate-css
•	Database & Backend
o	PostgreSQL database hosted on Neon
o	Prisma ORM for robust, type-safe database operations

<h2>Tech Stack </h2>
Layer	Technology
Frontend	Next.js, React, TypeScript, Tailwind CSS
Backend	Next.js API Routes, NextAuth.js, Prisma
Database	PostgreSQL (Neon)
Maps & Visualization	react-globe.gl, MapTiler API
File Upload	UploadThing
Authentication	OAuth (Google & GitHub)

<h1> Live Demo </h1>
Access the deployed app here:
 https://go-traveler-app.vercel.app  

<h2> Installation & Local Development </h2>
1.	Clone the repository
git clone https://github.com/<your-username>/go-traveler.git
cd go-traveler
2.	Install dependencies
npm install
3.	Setup environment variables (create .env file):
DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
AUTH_SECRET="your-random-secret-key"
NEXTAUTH_URL="http://localhost:3000"
UPLOADTHING_TOKEN="your-uploadthing-token"
NEXT_PUBLIC_MAPTILER_KEY="your-maptile-key"
4.	Generate Prisma client
npx prisma generate
5.	Run development server
npm run dev
6.	Visit http://localhost:3000 in your browser.

<h2> Project Structure </h2>
go-traveler/
│
├─ prisma/          # Prisma schema & migrations
├─ src/
│  ├─ app/          # Next.js pages & layouts
│  ├─ components/   # Reusable UI components
│  ├─ api/          # API routes
│  ├─ lib/          # Utilities & helpers
│  └─ styles/       # Tailwind CSS & global styles
├─ public/          # Static assets
├─ package.json
├─ next.config.ts
└─ README.md

<h2> Security & Best Practices </h2
•	ESLint & Prettier configured for clean code

•	Type-safe database queries with Prisma

•	NEXTAUTH_URL properly set for production OAuth

•	ESLint disabled during build to prevent deployment failures

Contribution
Contributions are welcome!
1.	Fork the repository

2.	Create your feature branch (git checkout -b feature/my-feature)

3.	Commit your changes (git commit -am 'Add feature')

4.	Push to the branch (git push origin feature/my-feature)

5.	Open a Pull Request

