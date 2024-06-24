## Date

Monday June 24, 2024

### Location of deployed application

https://weather-app-aholder.netlify.app/

### Time spent
I think this took me about 6 hours including testing and I kept changing my mind.

### Assumptions made
I assumed that when the app first loads, the details about the weather from the user's location is given. If they want to choose which location to display the weather information, they can use the search tool. I also assumed that the user is ok to see the weather units using the metric system, opposed to the imperial system.

### Shortcuts/Compromises made
I do feel as though I could have done better. I think I could have utilized the locator tool to detect which system to use (either, imperial, metric or kelvin). I wish I had read most of the API documentation through so I would not have created so much helper functions. I could have saved time, but I was so eager to jump in. As most of world uses the metric system, I left the functionality I wanted to include, out.

I also feel that the initial load of the user's location data is slow.

I also wish the design was nicer. I think I was wasting too much time on the UI and spent too much time.

### Stretch goals attempted
I did not attempt to do the stretch goals as I felt like I was running on empty.

### Instructions to run assignment locally
Using node version 20 or higher, run the following command:

```bash
npm install
```

To run the development server in your local environment do the following:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### What did you not include in your solution that you want us to know about?
I wanted to add a weather unit selector. If the user wants everything in Fahrenheit, they select imperial, Celsius, metric, etc.


### Other information about your submission that you feel it's important that we know if applicable

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



