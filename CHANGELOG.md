# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0-security] - 2026-04-07

### Security
- JWT secret management: fail-hard in production without JWT_SECRET
- Removed hardcoded default credentials
- Server-side route protection via middleware with JWT verification
- httpOnly cookies instead of localStorage for token storage
- Upload endpoint protected with authentication + magic byte validation
- CORS restricted to local origins (127.0.0.1, localhost)
- Role-based authorization middleware (requireRole)
- Error message sanitization in production
- Health endpoint made read-only (no database seeding)
- Password validation strengthened (min 12 chars, complexity)
- Admin approval workflow for new user registrations

### Added
- Setup wizard for initial admin creation
- Pending approval page for new registrations
- GitHub Actions workflow for multi-platform binary builds
- Linux/Windows packaging with systemd/NSSM services

### Tests
- 41 tests passing (auth, seed, middleware, login, register)

[Unreleased]: https://github.com/PACTA-Team/pacta_appweb/compare/v0.2.0-security...HEAD
[0.2.0-security]: https://github.com/PACTA-Team/pacta_appweb/releases/tag/v0.2.0-security
