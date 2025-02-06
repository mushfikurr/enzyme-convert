export function GridBackground() {
  return (
    <>
      <div className="absolute -z-10 w-full h-full inset-0 bg-radial-gradient from-background via-background to-transparent"></div>
      <div className="absolute -z-20 inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-60"></div>
    </>
  );
}
