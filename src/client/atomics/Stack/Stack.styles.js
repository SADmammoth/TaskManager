const styles = {
  horizontal: {
    '& > *': {
      float: 'left',
    },
    '& + *': {
      clear: 'both',
    },
  },

  vertical: {
    '& > *': {
      display: 'block',
      float: 'none',
    },
  },
};

export default styles;
