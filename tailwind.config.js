/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        brand: "#708ae8",
        facebook: "#385185",
        link: "#00376b",
      },
      backgroundImage: {
        "logo-pattern":
          "url(https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png)",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [],
};
