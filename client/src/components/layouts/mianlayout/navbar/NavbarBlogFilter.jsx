import { Link } from "react-router-dom";

export default function NavbarBlogFilter({ handleFilterToggle, toggle }) {
  const filterList = [
    { id: 1, active: true, name: "All" },
    { id: 2, active: false, name: "HOT" },
    { id: 3, active: false, name: "NEW" },
    { id: 4, active: false, name: "RISING" },
    { id: 5, active: false, name: "CONTROVERSIAL" },
    { id: 6, active: false, name: "TOP" },
    { id: 7, active: false, name: "GUIDED" },
    { id: 8, active: false, name: "PROMOTED" },
  ];

  return (
    <div className="category_list_for_navbar">
      <div className="container-filter-mobile flex justify-start gap-15">
        <p>
          Filter by <span>Hot</span>
        </p>

        <button className="cursor-pointer" onClick={handleFilterToggle}>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7 10.2334H17L12 15.2334L7 10.2334Z"
              fill="black"
              fill-opacity="0.87"
            />
          </svg>
        </button>
      </div>

      <ul className={`flex justify-items-start ${toggle && "toggle-filter"}`}>
        {filterList.map((listFilterItem) => (
          <li
            className={`${listFilterItem.active && "active-link"}`}
            key={listFilterItem.id}
          >
            <Link>{listFilterItem.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
