# This Real Estate Website is build using MERN technologies. 
-------------------------------------------------------------------------------------------------------------------------------------
step 1 - to create client side -
 npm create vite@latest client
-------------------------------------------------------
step 2 - install Tailwind css in vite - 
> npm install -D tailwindcss postcss autoprefixer
> npx tailwindcss init -p
----------------------------------------------------------
step 3 - Configure your template paths -  Add the paths to all of your template files in your tailwind.config.js file.-

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
--------------------------------------------------------------------
step 4 - Add the Tailwind directives to your CSS  - Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.-

@tailwind base;
@tailwind components;
@tailwind utilities;

------------------------------------------------------------------
step 5 - Run your app -
npm run dev
