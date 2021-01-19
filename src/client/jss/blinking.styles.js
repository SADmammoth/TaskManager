const blinking = {
  blinking: {
    animation: 'blink 2s infinite ease-in-out 1s',
  },

  '@keyframes blink': {
    from: {
      opacity: 0,
    },
    '50%': {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  },
};

export default blinking;
