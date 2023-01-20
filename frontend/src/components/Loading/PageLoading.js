import './style.css';

function Loading() {
  return (
    <div className='flex items-center justify-center h-screen bg-gradient-to-b from-[#BAF7F7] to-[#08A0A6]'>
      <div className="lds-default">
      <div></div><div></div><div></div><div></div><div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default Loading;