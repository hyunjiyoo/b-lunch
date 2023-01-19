import Banner from "components/Banner/Banner";

export default function Products() {
  
  return (
    <>
      {window.location.pathname === "/" && <Banner />}
    </>
  );
}
