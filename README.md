# Nitiksh Portfolio & Blog

A modern, responsive developer portfolio and blog built with Next.js 16, featuring dark mode, MongoDB integration, and a secure admin panel.

## 🚀 Features

- ✨ **Soft White & Dark Mode**: Seamless theme switching with persistent preferences
- 📝 **Blog Management**: Full CRUD operations with MongoDB backend
- 🔒 **Secure Admin Panel**: 3-question challenge with rate limiting
- 🎨 **Beautiful UI**: Clean, minimalist design with smooth animations
- 📱 **Fully Responsive**: Optimized for all screen sizes

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose
- **Icons**: Lucide React
- **Theme**: next-themes

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Nitiksh691/Nitiksh-Portfolio.git
cd Nitiksh-Portfolio
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_Q1_ANSWER=your_answer_1
ADMIN_Q2_ANSWER=your_answer_2
ADMIN_Q3_ANSWER=your_answer_3
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 🔧 Configuration

### Admin Access

1. Navigate to `/admin/challenge`
2. Answer the three security questions
3. Access the admin dashboard to manage blog posts

### MongoDB Setup

1. Create a MongoDB Atlas account or use a local MongoDB instance
2. Create a new database
3. Copy the connection string to your `.env.local` file

## 📝 Usage

### Managing Blog Posts

- **Create**: Navigate to `/admin` → "New Post"
- **Edit**: Click the edit icon on any post in the admin dashboard
- **Delete**: Click the delete icon on any post

### Theme Toggle

Click the sun/moon icon in the header to switch between light and dark modes.

## 🎨 Customization

- Update your profile information in `app/page.tsx`
- Modify theme colors in `app/globals.css`
- Add your social media links in the homepage
- Customize admin questions in `app/admin/challenge/page.tsx`

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Made with ❤️ by Nitiksh
