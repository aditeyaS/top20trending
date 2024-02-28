import { useAppDispatch, useAppSelector } from "../redux/store";
import { changeTab, selectSelectedTab } from "../redux/slice/appSlice";
import themes from "../config/themes";
import { useEffect, useState } from "react";
import LogoSVG from "./svg/LogoSVG";

const Header = () => {
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(selectSelectedTab);

  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const previousTheme = localStorage.getItem("app-theme") || "";
    if (previousTheme) {
      setCurrentTheme(previousTheme);
    }
  }, []);

  useEffect(() => {
    currentTheme &&
      document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const onThemeChange = (selectedTheme: string) => {
    setCurrentTheme(selectedTheme);
    localStorage.setItem("app-theme", selectedTheme);
  };

  return (
    <div className="navbar bg-accent text-accent-content px-5">
      <div className="navbar-start">
        <LogoSVG />
        <span className="text-xl ml-2">Top20Trending</span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">
          <li>
            <button
              onClick={() => dispatch(changeTab("Movies"))}
              disabled={selectedTab === "Movies"}
              className="btn mr-2 text-accent disabled:text-accent"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 4H5a1 1 0 0 0-1 1v14c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1Zm0 0-4 4m5 0H4m1 0 4-4m1 4 4-4m-4 7v6l4-3-4-3Z"
                />
              </svg>
              Movie
            </button>
          </li>
          <li>
            <button
              disabled={selectedTab === "TV"}
              onClick={() => dispatch(changeTab("TV"))}
              className="btn mr-2 text-accent disabled:text-accent"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 6H4a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h10c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1Zm7 11-6-2V9l6-2v10Z"
                />
              </svg>
              TV
            </button>
          </li>
          <li>
            <button
              disabled={selectedTab === "Music"}
              onClick={() => dispatch(changeTab("Music"))}
              className="btn text-accent disabled:text-accent"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 16v-4a8 8 0 1 0-16 0v4m16 0v2a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2ZM4 16v2c0 1.1.9 2 2 2h2v-6H6a2 2 0 0 0-2 2Z"
                />
              </svg>
              Music
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Change Theme</summary>
              <ul className="p-2 bg-base-100 rounded-t-none overflow-y-auto max-h-96 overflow-x-hidden">
                {themes.map((theme, index) => (
                  <li key={index}>
                    <button
                      disabled={theme === currentTheme}
                      className="btn-sm text-base-content disabled:text-accent"
                      onClick={() => onThemeChange(theme)}
                    >
                      {theme}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
