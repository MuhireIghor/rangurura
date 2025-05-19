import { Link } from "react-router-dom";

const Logo = ({className,showText=false, url="/"}:{className:string,showText?:boolean,url?:string}) => {
  return (
    <div className="flex items-center">
      <Link to={url} className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M12 2H2v10h10V2z" />
          <path d="M12 12h10v10H12V12z" />
          <path d="M12 22v-9.8" />
          <path d="M12 12V2.2" />
          <path d="M2 12h10" />
          <path d="M12 12h10" />
        </svg>
        {showText && <span className={`text-xl font-bold ${className}`}>RANGURURA</span>}
      </Link>
    </div>
  );
};
export default Logo;
