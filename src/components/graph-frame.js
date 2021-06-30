import React, { useEffect } from 'react';
import styles from '../../styles/GraphFrame.module.css';

const GraphFrame = (props) => {
  const { id, setSelectedGraph, selected, handleDelete } = props;

  useEffect(() => {
    if (selected) {
      handleClick();
    }
  }, [selected]);

  const handleClick = () => {
    document.querySelector(`.${styles.highlight}`)?.classList.remove(styles.highlight);
    document.querySelector(`#frame-${id}`).classList.add(styles.highlight);
    setSelectedGraph(id);
  };

  const handleDownload = (data) => {
    console.log("download:", data);
    const {id} = data;
    generatePNGAndDownload(
      document.getElementById(`frame-${id}`),
      () => {
        document.getElementById(`frame-${id}`).style.border = "5px solid white";
        Array.from(document.getElementsByClassName("GraphFrame_deleteGraph__3ldRg")).forEach(e => e.style.display = "none");
        //TODO hard code
        document.getElementById(`barChart-${id}`).setAttribute("height", "395px");
        document.getElementById(`barChart-${id}`).setAttribute("width", "393px");
      },
      () => {
        document.getElementById(`frame-${id}`).style.removeProperty("border");
        Array.from(document.getElementsByClassName("GraphFrame_deleteGraph__3ldRg")).forEach(e => e.style.display = "");
        document.getElementById(`barChart-${id}`).removeAttribute("height");
        document.getElementById(`barChart-${id}`).removeAttribute("width");
        setTimeout(() => alert("It's downloading the file, please check your download list in your browser later..."),0);
      }
    )
  };

  return (
    <div className={styles.graphFrame} id={`frame-${id}`} onClick={handleClick}>
      <div className={styles.frameHeader}>
        <h2 className={styles.title}>Chart Title</h2>
        <button title='download' className={styles.deleteGraph} onClick={() => handleDownload({ id })}>
          ↓
        </button>
        <button className={styles.deleteGraph} onClick={() => handleDelete({ id })}>
          X
        </button>
      </div>
      <div className={styles.wrapper}>{props.children}</div>
      <div className={styles.descriptionDiv}>
        <p className={styles.description}>
          Description: This is a graph using mock data. Upload your own and start playing around!
        </p>
      </div>
    </div>
  );
};

export default GraphFrame;
