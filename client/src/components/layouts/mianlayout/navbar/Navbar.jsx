import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="__container-navbar w-[100%]">
      <nav>
        <div className="container-top-navbar pl-5 pr-5 pt-5 pb-5">
          <p>All subreddits</p>
        </div>
        <div className="category_list_for_navbar">
          <ul className="flex justify-between w-[60%]">
            <li className="active-link">
              <Link>HOT</Link>
            </li>
            <li>
              <Link>NEW</Link>
            </li>
            <li>
              <Link>RISING</Link>
            </li>
            <li>
              <Link>CONTROVERSIAL</Link>
            </li>
            <li>
              <Link>TOP</Link>
            </li>
            <li>
              <Link>GUIDED</Link>
            </li>
            <li>
              <Link>PROMOTED</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
