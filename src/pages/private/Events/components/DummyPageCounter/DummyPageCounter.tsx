import Text from 'components/Text';

export const DummyPageCounter: React.VFC<{
  currentPage: number;
  totalPages: number | null;
}> = ({ currentPage, totalPages }) => {
  return (
    <div
      style={{
        color: 'var(--ui-button-text)',
        backgroundColor: 'var(--ui-button-danger-hover)',
        position: 'fixed',
        right: '16px',
        padding: '16px',
        borderRadius: '8px',
        zIndex: 1000,
      }}
    >
      {totalPages ? (
        <Text color="inherit">{`Showing ${Math.min(
          currentPage + 1,
          totalPages
        )} of ${totalPages} pages`}</Text>
      ) : (
        <Text color="inherit">Initial loading</Text>
      )}
    </div>
  );
};
