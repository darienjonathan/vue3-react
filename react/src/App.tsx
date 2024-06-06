import { Outlet, Link, useMatches } from "react-router-dom";
import styles from "common/css/app.module.css";
import { links } from "../../common/script/const/route/const";

export const App: React.FC = () => {
  const matches = useMatches();
  const activeLink = [...links]
    .reverse()
    .find((link) => matches.some((match) => match.pathname === link.to));

  return (
    <div className={styles.app}>
      <header className={[styles.app_header, styles.header].join(" ")}>
        <div
          className={[styles.header_label, styles.header_label__react].join(
            " ",
          )}
        >
          React
        </div>
        <div className={styles.header_text}>シンプルなvue3とReact比較</div>
      </header>
      <aside className={styles.app_aside}>
        <div className={styles.link_activeRoute}>
          <div>Active route:</div>
          <div>{activeLink?.to}</div>
        </div>
        <nav className={styles.link_list}>
          {links.map(({ to, text }) => (
            <Link
              key={to}
              to={to}
              className={[
                styles.link_item,
                to === activeLink?.to ? styles.link_item__active : "",
              ].join(" ")}
            >
              {text}
            </Link>
          ))}
        </nav>
      </aside>
      <main className={styles.app_main}>
        <Outlet />
      </main>
    </div>
  );
};
