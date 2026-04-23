export default function DotLoader() {
  return (
    <div className="bg-black/40 fixed inset-0 flex justify-center items-center z-50 h-screen">
    <div className="dot-loader bg-white h-fit w-fit p-5 rounded-lg shadow-lg">
      <span></span>
      <span></span>
      <span></span>
    </div>
    </div>
  );
}


export function ButtonLoader() {
  return (
    <div className="dot-loader dot-loader-sm">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}