import styles from "./index.module.css";

const header = ["機能", "React", "Vue", "メモ"];

const contents = [
  {
    title: "Counter",
    content: [
      ["ステート管理", "useState", "ref", "値が変わると再レンダリングが走る"],
      [
        "ステートから計算した値",
        "何も使わない、それともuseMemo",
        "computed",
        "vueではsetupは一回しか走らないため、computedでラップする必要がある",
      ],
    ],
  },
  {
    title: "Todo",
    content: [
      ["ステート管理", "useState", "ref", "値が変わると再レンダリングが走る"],
      [
        "ステートから計算した値",
        "何も使わない、それともuseMemo",
        "computed",
        "vueではsetupは一回しか走らないため、computedでラップする必要がある",
      ],
    ],
  },
];

export const Home: React.FC = () => (
  <div className={styles.table_group}>
    {contents.map((content) => (
      <div className={styles.table}>
        <div className={styles.table_title}>{content.title}</div>
        <div className={styles.table_grid}>
          {[header, ...content.content].map((content, index) => (
            <>
              {content.map((item) => (
                <div
                  key={index}
                  className={index === 0 ? styles.table_header : ""}
                >
                  {item}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    ))}
  </div>
);
