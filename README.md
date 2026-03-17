# Serenity: Multi-Merchant Wellness Marketplace

## Project Overview
Serenity is a specialized wellness platform for booking Spa and Pool services. This project is a solo quiz submission that implements a complex multi-vendor system, role-based access control, and automated payment routing.

## Core System Logic

### 1. Multi-Merchant Payment Flow
Unlike traditional e-commerce where one store gets all the money, Serenity acts as a platform.
- Every Service (Spa/Pool) is linked to a Seller.
- Every Seller has a unique PayPal Merchant ID assigned by the Admin.
- When a User books a service, the system dynamically injects the Seller's Merchant ID into the PayPal transaction.
- This ensures the payment goes directly to the Seller while the platform maintains the order record.

### 2. Role-Based Access Control (RBAC)
The platform enforces strict permissions across three tiers:
- **Admin:** Manages users, approves/declines seller applications, and monitors subscription revenue.
- **Seller:** Can create and manage their own service listings (Price, Image, Description).
- **User:** Can browse services, book appointments via PayPal, and manage personal profile/orders.

### 3. Subscription System
The platform features three membership tiers (Basic, Pro, Elite). These are integrated using the PayPal Subscription API, allowing for recurring access rather than one-time purchases.

### 4. Project-Specific AI Chatbot
A knowledge-based AI is integrated to assist users. It is programmed to answer inquiries specifically regarding Serenity's service offerings and membership details.

## Technical Stack
- **Frontend:** React 19, Redux (State Management), React-Bootstrap.
- **Backend:** Django, Django REST Framework.
- **Database:** SQLite3.
- **API:** PayPal SDK (Checkout & Subscriptions).

## Setup and Installation

### Backend Setup (Django)
1. Navigate to the backend folder: `cd backend`
2. Create and activate a virtual environment:
   - `python -m venv venv`
   - Windows: `venv\Scripts\activate` | Mac: `source venv/bin/activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Configure environment: Create a `.env` file using `.env.sample`.
5. Database Init:
   - `python manage.py migrate`
   - `python manage.py createsuperuser` (To access Admin Panel)
6. Start Server: `python manage.py runserver`

### Frontend Setup (React)
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Configure environment: Create a `.env` file using `.env.sample`.
4. Start App: `npm start`

## Repository Policy
- Solo project: All contributions are on the main branch.
- No sensitive data: `.env` and `db.sqlite3` are excluded via `.gitignore`.
