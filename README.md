# User Dashboard

A React app that fetches and displays a list of users in a searchable table.

## Features

- Search users by name, email, company, or phone number
- Real-time filtering (case-insensitive)
- Shows "No results found" when search returns nothing
- Hover effect on table rows
- Loading state while fetching data

## Setup

1. Navigate to project folder:
```bash
cd "d:\Personal Stuff\React js\simple-react-dashboard"
```

2. Install dependencies:
```bash
npm install
```

3. Start dev server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## How It Works

- **Fetch**: Fetches 10 users from `https://jsonplaceholder.typicode.com/users` on page load
- **Search**: Type in the search box to filter users by name, email, company, or phone
- **Filter Logic**: Each keystroke filters the list (case-insensitive matching)
- **Table**: Displays Name, Username, Email, Company, and Phone columns

## File Structure

```
src/
├── App.js       # Main component
└── App.css      # Styles
```

## State Variables

- `search` - Search input value
- `users` - Array of fetched users
- `loading` - Boolean for loading state

## Key Hooks

- `useEffect` - Fetch users on component mount
- `useState` - Manage search, users, and loading state

## API Used

JSONPlaceholder: `https://jsonplaceholder.typicode.com/users`

Sample response:
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "phone": "1-770-736-8031",
  "company": { "name": "Romaguera-Crona" }
}
```

## Troubleshooting

**Table headers shrink when no results**
- Make sure `colSpan="5"` matches the number of columns

**Search not working**
- Check browser console for errors (F12)
- Verify the input is focused

**Data not loading**
- Check internet connection
- API might be down

---

**Last Updated**: January 4, 2026
