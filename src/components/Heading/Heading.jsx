function Heading({ children, type }) {
  return <h1 className={`heading heading--${type}`}>{children}</h1>;
}

export default Heading;
