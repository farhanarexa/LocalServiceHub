# LocalServiceHub

LocalServiceHub is a comprehensive service marketplace platform that connects service providers with customers in a local community. Built with Next.js and powered by Supabase, this application provides an intuitive interface for discovering, booking, and reviewing local services.

## 🚀 Live Demo

Check out the live demo: [https://localservice-hub.netlify.app/](https://localservice-hub.netlify.app/)

## 🌟 Features

### For Customers
- **Discover Services**: Browse services by category in your local area
- **Search & Filter**: Find specific services using search and category filters
- **Book Services**: Instantly book services with detailed information
- **Manage Bookings**: View and track all your service bookings
- **Rate & Review**: Leave reviews and ratings for completed services
- **Profile Management**: Manage your personal information and preferences

### For Service Providers
- **Create Services**: List your services with detailed descriptions
- **Manage Listings**: View and update your service offerings
- **Booking Management**: Track and manage incoming service requests
- **Customer Reviews**: See and respond to customer feedback
- **Analytics**: Track your service performance

### Platform Features
- **Authentication**: Secure login with email/password or Google OAuth
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Instant notifications for booking changes
- **Review System**: Comprehensive rating and review system with 24-hour editing window
- **Category Management**: Organized service categorization

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components built with Tailwind
- **Authentication**: Supabase Auth (Email/Password, Google OAuth)
- **Deployment**: Netlify

## 📋 Prerequisites

Before you begin, make sure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd local-service-hub
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up Supabase

1. Go to [Supabase](https://supabase.io) and create a new project
2. Create the following tables in your Supabase database:

#### Services Table
```sql
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price TEXT,
  rating DECIMAL DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Bookings Table
```sql
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  service_id UUID REFERENCES services NOT NULL,
  service_provider_id UUID REFERENCES auth.users NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  booking_notes TEXT,
  booking_status TEXT DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  user_email TEXT,
  user_full_name TEXT,
  user_phone TEXT,
  user_location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Reviews Table
```sql
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings NOT NULL,
  service_id UUID REFERENCES services NOT NULL,
  service_provider_id UUID REFERENCES auth.users NOT NULL,
  reviewer_id UUID REFERENCES auth.users NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  phone TEXT,
  location TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
local-service-hub/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── my-bookings/    # User's booking management
│   │   ├── my-services/    # Service management interface
│   │   ├── service/[id]/   # Individual service details
│   │   ├── services/       # Browse services
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   └── ...             # Other pages
│   ├── components/         # Reusable React components
│   ├── context/            # React Context providers
│   ├── utils/              # Utility functions and constants
│   └── lib/                # Common libraries
├── public/                 # Static assets
├── .env.example           # Environment variable template
├── next.config.mjs        # Next.js configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## 📖 How It Works

### User Journey
1. **Registration/Login**: Users authenticate via email/password or Google OAuth
2. **Service Discovery**: Browse or search for services by category
3. **Booking**: Select a service and book it with preferred date and notes
4. **Management**: Track bookings and communicate with service providers
5. **Review**: After service completion, rate and review the service
6. **Feedback Loop**: Reviews help other users find quality services

### Service Provider Journey
1. **Registration**: Create an account as a service provider
2. **Service Creation**: List your services with descriptions and pricing
3. **Booking Management**: Receive and manage service requests
4. **Completion**: Mark services as completed and receive reviews

### Review System
- Users can submit one review per booking
- Reviews can be edited within 24 hours of submission
- After 24 hours, reviews become final and cannot be modified
- All reviews contribute to service ratings

### Authentication Flow
- Secure authentication with Supabase Auth
- Role-based access controls
- Protected routes using PrivateRoute component
- Session management and auto-refresh

## 🚀 Deployment

### Netlify Deployment
1. Push your code to a Git repository
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `out`
5. Add environment variables in Netlify dashboard

### Environment Variables for Production
Make sure to set the same Supabase environment variables in your hosting platform.

## 🔐 Security Features

- JWT-based authentication
- Row-level security in Supabase
- Input sanitization and validation
- Protected routes with PrivateRoute
- Secure file uploads with Supabase Storage

## 🧪 Testing

Coming soon - testing suite for components and API integrations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
- Open an issue in the repository
- Check the documentation
- Contact the development team

## 👨‍💻 Author

Developed by [Your Name/Team Name]

## 🙏 Acknowledgments

- Next.js for the excellent React framework
- Supabase for the powerful backend-as-a-service
- Vercel for hosting solutions
- All contributors and users who help improve this project