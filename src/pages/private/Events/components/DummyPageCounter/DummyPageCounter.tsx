import Text from 'components/Text';

export const DummyPageCounter: React.VFC<{
  current: number;
  total: number | null;
}> = ({ current, total }) => {
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
      {total ? (
        <Text color="inherit">{`Showing ${Math.min(
          current,
          total
        )} of ${total} items`}</Text>
      ) : (
        <Text color="inherit">Initial loading</Text>
      )}
    </div>
  );
};
