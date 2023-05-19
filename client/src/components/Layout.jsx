import Menu from "./Menu";

const Layout = ({
  title = "Title",
  description = "REal Ecommerce App",
  className,
  children,
}) => {
  return (
    <div className="flex flex-col">
      <Menu />
      <div className="bg-gray-200 h-[200px] flex flex-col justify-center">
        <h1 className="ml-5 text-2xl font-bold">{title}</h1>
        <p className="ml-5">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
