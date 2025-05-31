# WURQ Coding Challenge

Hi! 👋  
This is my submission for the React Native coding challenge, built using the [Ignite Boilerplate](https://github.com/infinitered/ignite). The app is organized into three screens, each designed to match the challenge tasks — from API handling and data display to charting and user interaction.

---

## 🚀 What’s Inside

### 🏠 Main Screen
- Displays a list of users fetched via MobX.
- User cards are color-coded by age:
  - Gray for under 30
  - Red for 30–50
  - Blue for over 50
- Any user with a negative age is ignored.
- Total fees paid by all users are shown at the top.

### ⏱️ Second Screen
- Starts a timer as soon as the screen loads.
- Shows all user info as one big text block.
- Includes a `Promise` that resolves after 3 seconds (via 1-second intervals).

### 📊 Third Screen (WURQ-inspired)
- Matches the provided UI reference.
- Includes:
  - A custom line chart (built with `react-native-chart-kit`)
  - Styled history cards
  - A form section that live-updates the display as you type

---

## 🛠 Tech Stack

- **React Native (Ignite)**
- **MobX** – for global state
- **TypeScript** – for better dev experience
- **react-native-chart-kit** – for chart rendering
- **React Navigation** – for smooth screen transitions

---

## 📦 How to Run It

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd wurq-challenge

2. **Install dependencies**
   npm i

3. **Run the app**
   npx react-native run-ios     # for iOS
   npx react-native run-android # for Android

4. **Run api folder for fetching details**
    npm run start