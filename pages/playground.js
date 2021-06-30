import Head from 'next/head';
import Script from 'next/script';
import React from 'react';
import { connect } from 'react-redux';

import styles from '../styles/Home.module.css';

import { getCurrentConfig, getAllIdAndType } from '../src/redux/reducer/graph-reducer';
import Toolbar from '../src/components/toolbar';
import GraphFrame from '../src/components/graph-frame';
import BarChart from '../src/components/bar-chart';
import PointChart from '../src/components/point-chart';
import LineChart from '../src/components/line-chart';
import { setSelectedGraph } from '../src/redux/actions/toolbar-action';
import { deleteGraph } from '../src/redux/actions/bar-action';

const Playground = (props) => {
  const { allIdAndType, setSelectedGraph, deleteGraph } = props;

  const createGraph = (type, id) => {
    switch (type) {
      case 'bar': {
        return <BarChart key={id} id={id} />;
      }
      case 'line': {
        return <LineChart key={id} id={id} />;
      }

      case 'point': {
        return <PointChart key={id} id={id} />;
      }

      default: {
        return <BarChart key={id} id={id} />;
      }
    }
  };

  const renderGraphs = (allIdAndType) => {
    return allIdAndType.map((el, i, arr) => {
      let selected = false;
      if (i == arr.length - 1) selected = true;
      return (
        <GraphFrame
          key={`frame-${el.id}`}
          id={el.id}
          setSelectedGraph={setSelectedGraph}
          handleDelete={deleteGraph}
          selected={selected}
        >
          {createGraph(el.type, el.id)}
        </GraphFrame>
      );
    });
  };

  return (
    <>
      <div className="playground-container">
          <Head>
            <script src="https://html2canvas.hertzen.com/dist/html2canvas.js" ></script>
            <script dangerouslySetInnerHTML={{
              __html: `
/*
 * Generate the png by given the html element, call beforeHook before 
 * the process, and afterHook when it's done.
 */
function generatePNGAndDownload(container, beforeHook, afterHook){
  beforeHook && beforeHook();
  html2canvas(container)
    .then(function(canvas){
      var dataURL = canvas.toDataURL();
      const div = document.createElement("div");
      document.body.appendChild(div);
      //div.innerHTML = '<img id="i1" src="' + dataURL + '"  />';
      div.innerHTML = '<a id="a1" href="' + dataURL + '" download="down.png" style="display:none" >download</a>';
      document.getElementById("a1").click();
      afterHook && afterHook();
      document.body.removeChild(div);
    });
}
                  `
            }}>
            </script>
          </Head>
        <Toolbar />
        <div className="graph-playground">{renderGraphs(allIdAndType)}</div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    config: getCurrentConfig(state.graph),
    allIdAndType: getAllIdAndType(state.graph),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedGraph: (id) => dispatch(setSelectedGraph(id)),
    deleteGraph: (id) => dispatch(deleteGraph(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
