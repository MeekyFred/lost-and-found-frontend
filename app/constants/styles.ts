export const customStyles = {
  table: {
    style: {
      overflow: 'auto',
      overflowX: 'hidden' as 'hidden',
    },
  },
  rows: {
    style: {
      minHeight: '72px', // override the row height
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'hsl(var(--warning))',
      },
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      // minWidth: '200px',
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};

export const responsiveStyles = {
  rows: {
    style: {
      minHeight: '86px', // override the row height
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'hsl(var(--accent))',
      },
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '4px', // override the cell padding for data cells
      paddingRight: '4px',
    },
  },
};

export const dashboardStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'hsl(var(--accent))',
      },
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};
