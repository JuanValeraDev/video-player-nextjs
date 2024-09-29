# Video Player Application

This project is an exercise to practice Next.js, utilizing tRPC for client-server communication and server actions to
interact with a Supabase database. The application is styled with TailwindCSS and Shadcn, featuring a fully responsive
design. It allows users to view a collection of videos uploaded to AWS and play them in a video player. The application
manages the state of likes and watches for each video, uses the App Router for navigation, and shares information
between pages through the URL. It also supports light and dark modes and displays loading skeletons while data is being
fetched.

## Features

- **Next.js**: Framework for building the application.
- **tRPC**: Used for client-server communication.
- **Supabase**: Database for storing video metadata and user interactions.
- **TailwindCSS & Shadcn**: For styling and responsive design.
- **AWS**: Storage for video files.
- **App Router**: For navigation between pages.
- **Light/Dark Mode**: Toggle between light and dark themes.
- **Loading Skeletons**: Displayed while data is being loaded.
- **State Management**: Manages likes and watches for each video.

## Installation

To install the dependencies, it is recommended to use `pnpm`, but you can use npm or yarn too:

```bash
pnpm install
```

## Running the Application
To start the development server, run:

```bash
pnpm dev
```

This will start the application on http://localhost:3000.  
## Testing the API
To test the API, you can use any API testing tool like Postman or Insomnia. Here are some example endpoints you can
test:

```bash
Get Videos: GET /api/trpc/getVideos
```

```bash
Increment Likes: POST /api/trpc/incrementLikes
Headers: Key: Content-Type Value: application/json
Body: {"videoId":":id"}
```

```bash
Increment Watches: POST /api/trpc/incrementWatches
Headers: Key: Content-Type Value: application/json
Body: {"videoId":":id"}
```

Make sure to replace :id with the actual video ID.

### Additional Information

* Responsive Design: The application is designed to be fully responsive, adapting to different screen sizes.
* Dark Mode: Users can toggle between light and dark modes for a better viewing experience.
* Loading Skeletons: While data is being fetched, loading skeletons are displayed to improve user experience.

### Development Notes

* Code Quality: The code has been structured to be clean and maintainable.

## Author JuanValeraDev

LinkedIn: https://www.linkedin.com/in/juan-valera-reales/

