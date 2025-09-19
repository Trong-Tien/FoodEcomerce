import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       spacing: {
        '3px': '3px', // thêm giá trị spacing mới
      },
    },
  },
  plugins: [],
} satisfies Config





