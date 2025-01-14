# PoultryPal

PoultryPal is a comprehensive web-based management system designed to streamline and centralize key operations of poultry farms. It integrates functionalities like Human Resource Management, Point of Sale, Inventory, and Flock Monitoring into a single, user-friendly platform.

## Features

- **Human Resource Management:** Efficiently manage employees, schedules, and roles.
- **Point of Sale (POS):** Simplify sales and order processing.
- **Inventory Management:** Track feed, supplies, and other essential resources.
- **Flock Monitoring:** Monitor flock health, egg production, and growth metrics.
- **Customer Management:** Manage customer orders and refunds.
- **News Management:** Share updates and announcements.

## Tech Stack

- **Frontend:** React.js, Tailwindcss
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other Tools:** Multer (file uploads), Nodemailer (email notifications), Cloudinary, Stripe (Payment Gateway), Axios, Socket.io, Redux 

## Installation

1. Clone the repository:
   ```bash
   git clone  https://github.com/syedhisham/PoultryPal.git
   ```
2. Navigate to the project backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
2. Navigate to the project frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```env
   MONGODB_USERNAME=your_mongodb_username
   MONGODB_PASSWORD=your_mongodb_password
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   smtp_email=your_smtp_email
   smtp_password=your_smtp_password
   CLIENT_URL=your_client_url
   STRIPE_SECRET_KEY=your_stripe_secret_key
   PORT=your_port
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
5. Start the frontend development server:
   ```bash
   npm start
   ```

## Usage

1. Access the application at `http://localhost:5173`.
2. Log in or register as an Admin, Employee, or Customer.
3. Utilize the dashboard to manage operations like orders, inventory, and flock monitoring.

## Folder Structure

- **src:** Contains the source code for the frontend and backend.
  - **frontend:** React components, pages, and styles.
  - **backend:** API routes, controllers, and models.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve PoultryPal.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

For inquiries or feedback, reach out to:
- **Email:** syedhishamshah27@gmail.com
- **GitHub:** [syedhisham](https://github.com/syedhisham)

---


