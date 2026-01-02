const RobotSaoHoaPage = () => {
  const containerStyle: React.CSSProperties = {
    width: '100vw',
    height: 'calc(100vh - 3.5em)',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    marginTop: '3.5em',
  }

  const iframeStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    minHeight: 0,
    border: 'none',
    background: '#fff',
    display: 'block',
  }

  return (
    <div style={containerStyle}>
      <iframe
        src="/trang-chu/robot-sao-hoa-2.html"
        title="Kotaro AI - Khám Phá Sao Hỏa Cùng NASA"
        allow="clipboard-write"
        style={iframeStyle}
      />
    </div>
  )
}

export default RobotSaoHoaPage
