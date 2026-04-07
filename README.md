# Pacta - Contract Management Application

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-003B57)](https://www.sqlite.org/)

Pacta is a comprehensive contract management web application designed to streamline the lifecycle of business agreements. It serves as a digital platform for organizations to manage contracts between clients and suppliers, including tracking contract details, authorized signers, supplements (modifications), and generating various reports. The application provides role-based access control, automated notifications for expiring contracts, and a dashboard for key performance indicators.

## Key Features

- **Contracts Management**: Create, view, edit, and delete contracts with details such as contract number, title, client/supplier information, authorized signers, start/end dates, monetary amount, contract type, status, and description.
- **Clients and Suppliers**: Manage business entities involved in contracts and associate authorized signers.
- **Authorized Signers**: Handle personnel authorized to sign contracts on behalf of clients or suppliers.
- **Supplements**: Track contract modifications or amendments with approval workflows and status tracking.
- **Reports**: Comprehensive reporting system including contract status distribution, financial analysis, upcoming expirations, client/supplier analysis, supplements overview, and export capabilities.
- **Dashboard**: Overview with KPI cards, status distribution charts, and quick action buttons.
- **Notifications**: Automated alerts for expiring contracts and other events.
- **Documents**: Repository for storing contract-related documents.
- **Users Management**: User accounts with role-based permissions (admin, manager, editor, viewer).
- **Audit Logging**: Change tracking system for contract operations.
- **Responsive Design**: Mobile-first approach with responsive layouts.

## Technology Stack

- **Frontend Framework**: Next.js 15.5 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 with Radix UI components (shadcn/ui)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Database**: SQLite (better-sqlite3)
- **Authentication**: bcrypt + JWT (jose library)
- **State Management**: React Context (AuthContext)
- **Build Tools**: Turbopack, PostCSS, ESLint

## Getting Started

### Prerequisites

- Node.js 18+

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and set JWT_SECRET
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The SQLite database will be created automatically in `data/pacta.db`

5. Default login credentials:
   - Email: `admin@pacta.local`
   - Password: `pacta123`

### API Endpoints

- `POST /next_api/auth/login` - Login with email/password
- `POST /next_api/auth/register` - Register new user
- `GET /next_api/health` - Health check
- `GET /next_api/example` - List examples (requires auth)
- `POST /next_api/example` - Create example (requires auth)
- `PUT /next_api/example/:id` - Update example (requires auth)
- `DELETE /next_api/example/:id` - Delete example (requires auth)
- `POST /next_api/upload` - File upload

## Usage Guide

1. **Login**: Use default credentials or register a new account.
2. **Dashboard**: View KPIs, contract status, and quick actions.
3. **Manage Contracts**: Navigate to the Contracts section to create, edit, or view contracts.
4. **Reports**: Generate and export various reports from the Reports section.
5. **Users**: Manage user roles and permissions in the Users section.
6. **Notifications**: Check automated alerts in the Notifications section.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── contracts/          # Contract management pages
│   ├── clients/            # Client management pages
│   ├── suppliers/          # Supplier management pages
│   ├── authorized-signers/ # Authorized signer pages
│   ├── supplements/        # Supplement management pages
│   ├── reports/            # Reporting pages
│   ├── dashboard/          # Dashboard page
│   ├── notifications/      # Notifications page
│   ├── documents/          # Document repository
│   ├── users/              # User management
│   └── next_api/           # API routes
├── components/             # Reusable React components
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Layout components
│   ├── auth/               # Authentication components
│   └── [feature]/          # Feature-specific components
├── contexts/               # React contexts (AuthContext)
├── hooks/                  # Custom hooks
├── lib/                    # Utility libraries
│   ├── db.ts               # SQLite database layer
│   ├── schema.sql          # Database schema
│   ├── seed.ts             # Seed data
│   ├── auth.ts             # bcrypt + JWT auth
│   ├── auth-middleware.ts  # API auth middleware
│   ├── crud-operations.ts  # SQLite CRUD operations
│   ├── validation-schemas.ts # Zod schemas
│   └── utils.ts            # General utilities
├── middlewares/            # Next.js middlewares
├── types/                  # TypeScript type definitions
└── ...
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel.
2. Set environment variables in Vercel dashboard (`JWT_SECRET`).
3. Deploy the application.

Note: SQLite database is file-based. For multi-instance deployments, consider a shared database solution.
