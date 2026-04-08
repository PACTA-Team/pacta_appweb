# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.1] - 2026-04-08

### Fixed
- **Release build pipeline** - Fixed broken Linux .deb and Windows .exe artifacts

### Linux (.deb)
- Added `EnvironmentFile` to pacta.service for proper .env loading
- Fixed postinst script to install systemd service file to `/etc/systemd/system/`
- Auto-generate JWT_SECRET on install if placeholder detected
- Include `.next/standalone` build output in package (was missing)
- Include `.next/static` and `public` folder for static assets
- Create required directories (data, uploads, logs, config)
- Clean up service file on uninstall

### Windows (.exe)
- Fixed start.bat paths to use correct standalone structure
- Added .env loading via NSSM AppEnvironmentExtra
- Added log file configuration (stdout/stderr)
- Include `.next/static` and proper directory structure

### General
- Added `PORT=3000` to .env.example
- Added build verification step to catch missing standalone early

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
