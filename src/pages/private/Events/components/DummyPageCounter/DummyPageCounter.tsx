export const DummyPageCounter: React.VFC<{
  currentPage: number;
  totalPages: number | null;
}> = ({ currentPage, totalPages }) => {
  const total = totalPages || 9999;
  const current = Math.min(currentPage + 1, total);

  return (
    <div
      style={{
        color: 'black',
        backgroundColor: 'orange',
        position: 'fixed',
        right: '16px',
        padding: '16px',
        borderRadius: '8px',
        zIndex: 1000,
      }}
    >
      Страница: {current} из {total}
    </div>
  );
};
