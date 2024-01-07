/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        home: 'repeat(auto-fill, minmax(var(--presentation-media-width), 1fr))',
        media: 'repeat(auto-fill, minmax(var(--movie-width), 1fr))',
      },
      height: {
        media: 'var(--presentation-media-height)',
        'media-2': 'calc(var(--presentation-media-height) * 2)',
      },
      backgroundImage: {
        home: 'linear-gradient(90deg, rgb(18, 18, 18) 25%, rgba(18, 18, 18, .7) 50%, rgba(18, 18, 18, .1) 100%)',
      },
      boxShadow: {
        media: '0 7px 8px -4px #0003,0 12px 17px 2px #00000024,0 5px 22px 4px #0000001f',
      },
      aspectRatio: {
        '2/3': '2 / 3',
      },
      grayscale: {
        5: '5%',
      },
      saturate: {
        110: '110%',
      },
    },
  },
};
