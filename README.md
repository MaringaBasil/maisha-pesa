# Maisha Pesa - Tenderpreneur Transaction Platform

Maisha Pesa is a digital platform designed for tenderpreneurs with access to tenders but limited funding. 
The platform connects Contractors, Brokers, Sourcing Agents, Investors, and Clients, with oversight from an Admin. 
It streamlines tender management from order creation to funding, sourcing, and delivery using a shared revenue model.

## Features

- User Authentication: Users can register and log in with different roles (Contractor, Broker, Sourcing Agent, Investor, Client, Admin).
- KYC Verification: Admins can verify KYC for users before they can act.
- Order Lifecycle Management: 
  - Brokers can create orders.
  - Contractors can approve or reject orders.
  - Approved orders are visible to Investors for bidding.
  - Winning Investors can fund orders.
  - Sourcing Agents can allocate items for funded orders.
  - Clients can track the status of their orders in real-time.
  - Revenue Share Model: Automatically calculates and distributes revenue shares after delivery.

## Technologies Used

- React.js
- Firebase (Authentication, Firestore)
- Bootstrap for styling
- Vite as the build tool

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
git clone https://github.com/YOUR_USERNAME/maisha-pesa.git
cd maisha-pesa


2. Install dependencies:

npm install

3. Set up Firebas:
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable Firestore and Authentication (Email/Password).
- Replace the Firebase configuration in `firebase.js` with your project's configuration.

4. Run the application
npm run dev


5. Open your browser and navigate to `http://localhost:3000` (or the port specified in the terminal).

## Usage

- Register: Users can register by selecting their role.
- Login: Users can log in to access their respective dashboards.
- Admin Dashboard: Admins can manage users and verify KYC.
- Broker Dashboard: Brokers can create and manage orders.
- Contractor Dashboard: Contractors can approve or reject orders.
- Investor Dashboard: Investors can view approved orders and place bids.
- Sourcing Agent Dashboard: Sourcing Agents can allocate items for funded orders.
- Client Dashboard: Clients can track the status of their orders.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Firebase team for providing a robust backend solution.
- Thanks to the React community for their support and resources.
 such as FAQs, troubleshooting tips, or a changelog.