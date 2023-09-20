# Museum-Artefact-Explorer

The Museum Artefact Explorer is a web application that allows users to explore and discover information about artworks and artefacts from the Metropolitan Museum of Art's collection. The application provides features like searching, viewing details, and managing favorites and search history.

![museum-artefact-explorer](https://github.com/sookimm/Museum-Artefact-Explorer/assets/105490589/68cbb6ce-d7c8-4b1d-8766-a9ba5069f90d)

## Deploy Link: 
https://museum-artefact-explorer-wqd6.vercel.app/

## Author: 
Sooyeon Kim

## Tech Stack:
- **Frontend**: The frontend of the application is built using React.js, a popular JavaScript library for building user interfaces. It uses Next.js, a framework for server-rendered React applications, to handle routing and server-side rendering. Key components related to UX and frontend include:
  + ArtworkCard: This component displays information about an artwork, including its image, title, date, classification, and medium. It uses the react-bootstrap library for styling and useSWR for data fetching, making it responsive and efficient.
  + ArtworkCardDetail: This component provides more detailed information about an artwork, including additional details like artist information, credit line, and dimensions. Users can also add or remove artworks from their favorites using this       component.
  + MainNav: This component represents the main navigation bar of the application, allowing users to navigate between different sections, perform searches, and manage their account (login/logout).
  + Layout: This component defines the overall layout structure of the application.
- **Backend**: The backend of the application is responsible for serving API endpoints, handling user authentication, and managing user data. Key backend components and technologies include:
  + Express.js: This is a Node.js framework used for building the backend API. It handles routing, request processing, and API endpoints.
  + Passport.js: Passport.js is used for user authentication, allowing users to log in and access personalized features.
  + MongoDB (NoSQL): MongoDB is used as the database to store user data, including favorites and search history. It's a NoSQL database known for its flexibility in handling unstructured or semi-structured data.
- **User Authentication**: The project uses JSON Web Tokens (JWT) for user authentication. The authenticateUser function handles user login and sets a JWT token upon successful authentication.
- **Styling**: The project uses Bootstrap for styling, ensuring a responsive and visually appealing user interface.
- **State Management**: Jotai is used for state management, particularly for handling user favorites and search history. It helps manage the application's global state.
- **Search and Filtering**: The project includes an "Advanced Search" feature that allows users to filter artworks based on criteria such as title, tags, geo-location, medium, and more.
- **RouteGuard**: The RouteGuard component is responsible for guarding routes and ensuring that only authenticated users can access certain parts of the application. Unauthorized users are redirected to the login page.
- **SWR (Stale-While-Revalidate)**: SWR is used for data fetching and caching, enhancing the application's performance and responsiveness.
- **Environmental Variables**: The application uses environmental variables for sensitive information like API URLs.
- **Next.js SWRConfig**: The SWRConfig from Next.js is used to configure the data fetching strategy for the application.
