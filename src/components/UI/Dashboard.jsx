import React from "react";
import loadjs from "loadjs";
import { Preloader } from "./Preloader";
import { Transaction } from "./Transaction";

export const Dashboard = () => {
  // SCRIPT LOAD
  // const runScript = () => {
  //   loadjs([
  //     '/assets/js/all.min.js',
  //     '/assets/js/aos.js',
  //     '/assets/js/bootstrap.bundle.min.js',
  //     '/assets/js/custom.js',
  //     '/assets/js/fslightbox.js',
  //     '/assets/js/niceCountryInput.js',
  //     '/assets/js/plugins.js',
  //     '/assets/js/plugin-custom.js',
  //     '/assets/js/purecounter_vanilla.js',
  //     '/assets/js/swiper-bundle.min.js',
  //   ], () => {
  //     console.info("Scripts Loaded!");
  //   });
  // };

  // React.useEffect(() => {
  //   runScript();
  // }, [])

  return (
    <body>
      {/* <Preloader /> */}
      <section
        className="page-header bg--cover"
        style={{ backgroundImage: "url(assets/images/breadcrumb.png)" }}
      >
        <div className="container">
          <div
            className="page-header__content mt-100 text-center"
            // data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h2>Dashboard</h2>
          </div>
          <div className="page-header__shape">
            <span className="page-header__shape-item page-header__shape-item--1">
              <img src="assets/images/2.png" alt="shape-icon" />
            </span>
          </div>
        </div>
      </section>
      <section className="markets_section padding-top padding-bottom bg5-color">
        <div className="container">
          <div className="row gy-6">
            <div className="col-lg-6">
              <div className="row gy-6">
                <div className="col-md-12 col-xl-12">
                  <div className="markets_section__card bg4-color rounded-20 br2 p-4 p-md-6 wow fadeInUp">
                    <div className="markets_section__card-head d-flex align-items-center gap-2 mb-4 mb-md-5">
                      <img
                        src="assets/images/btc.png"
                        alt="icon"
                        style={{ height: "40px " }}
                      />
                      <h4 className="text-white">Bitcoin</h4>
                      <span className="fs-ten">BTC</span>
                    </div>
                    <div className="markets_section__card-chart mb-4 mb-md-5">
                      <div
                        id="crm-total-customers2"
                        style={{ minHeight: "40px" }}
                      >
                        <div
                          id="apexchartsz2sgtujh"
                          className="apexcharts-canvas apexchartsz2sgtujh apexcharts-theme-light"
                          style={{ width: "183px", height: "40px" }}
                        >
                          <svg
                            id="SvgjsSvg3671"
                            width="183"
                            height="40"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xmlns:svgjs="http://svgjs.dev"
                            className="apexcharts-svg"
                            xmlns:data="ApexChartsNS"
                            transform="translate(0, 0)"
                            style={{ background: "transparent" }}
                          >
                            <g
                              id="SvgjsG3673"
                              className="apexcharts-inner apexcharts-graphical"
                              transform="translate(0, 0)"
                            >
                              <defs id="SvgjsDefs3672">
                                <clipPath id="gridRectMaskz2sgtujh">
                                  <rect
                                    id="SvgjsRect3677"
                                    width="188.5"
                                    height="41.5"
                                    x="-2.75"
                                    y="-0.75"
                                    rx="0"
                                    ry="0"
                                    opacity="1"
                                    strokeWidth="0"
                                    stroke="none"
                                    strokeDasharray="0"
                                    fill="#fff"
                                  ></rect>
                                </clipPath>
                                <clipPath id="forecastMaskz2sgtujh"></clipPath>
                                <clipPath id="nonForecastMaskz2sgtujh"></clipPath>
                                <clipPath id="gridRectMarkerMaskz2sgtujh">
                                  <rect
                                    id="SvgjsRect3678"
                                    width="187"
                                    height="44"
                                    x="-2"
                                    y="-2"
                                    rx="0"
                                    ry="0"
                                    opacity="1"
                                    strokeWidth="0"
                                    stroke="none"
                                    strokeDasharray="0"
                                    fill="#fff"
                                  ></rect>
                                </clipPath>
                              </defs>
                              <line
                                id="SvgjsLine3676"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="40"
                                stroke="#b6b6b6"
                                strokeDasharray="3"
                                strokeLinecap="butt"
                                className="apexcharts-xcrosshairs"
                                x="0"
                                y="0"
                                width="1"
                                height="40"
                                fill="#b1b9c4"
                                filter="none"
                                fillOpacity="0.9"
                                strokeWidth="1"
                              ></line>
                              <g id="SvgjsG3684" className="apexcharts-grid">
                                <g
                                  id="SvgjsG3685"
                                  className="apexcharts-gridlines-horizontal"
                                  style={{ display: "none" }}
                                >
                                  <line
                                    id="SvgjsLine3688"
                                    x1="0"
                                    y1="0"
                                    x2="183"
                                    y2="0"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3689"
                                    x1="0"
                                    y1="4"
                                    x2="183"
                                    y2="4"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3690"
                                    x1="0"
                                    y1="8"
                                    x2="183"
                                    y2="8"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3691"
                                    x1="0"
                                    y1="12"
                                    x2="183"
                                    y2="12"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3692"
                                    x1="0"
                                    y1="16"
                                    x2="183"
                                    y2="16"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3693"
                                    x1="0"
                                    y1="20"
                                    x2="183"
                                    y2="20"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3694"
                                    x1="0"
                                    y1="24"
                                    x2="183"
                                    y2="24"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3695"
                                    x1="0"
                                    y1="28"
                                    x2="183"
                                    y2="28"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3696"
                                    x1="0"
                                    y1="32"
                                    x2="183"
                                    y2="32"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3697"
                                    x1="0"
                                    y1="36"
                                    x2="183"
                                    y2="36"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3698"
                                    x1="0"
                                    y1="40"
                                    x2="183"
                                    y2="40"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                </g>
                                <g
                                  id="SvgjsG3686"
                                  className="apexcharts-gridlines-vertical"
                                  style={{ display: "none" }}
                                ></g>
                                <line
                                  id="SvgjsLine3700"
                                  x1="0"
                                  y1="40"
                                  x2="183"
                                  y2="40"
                                  stroke="transparent"
                                  strokeDasharray="0"
                                  strokeLinecap="butt"
                                ></line>
                                <line
                                  id="SvgjsLine3699"
                                  x1="0"
                                  y1="1"
                                  x2="0"
                                  y2="40"
                                  stroke="transparent"
                                  strokeDasharray="0"
                                  strokeLinecap="butt"
                                ></line>
                              </g>
                              <g
                                id="SvgjsG3679"
                                className="apexcharts-line-series apexcharts-plot-series"
                              >
                                <g
                                  id="SvgjsG3680"
                                  className="apexcharts-series"
                                  seriesName="Value"
                                  data:longestSeries="true"
                                  rel="1"
                                  data:realIndex="0"
                                >
                                  <path
                                    id="SvgjsPath3683"
                                    d="M 0 40C 8.00625 40 14.86875 15.65217391304348 22.875 15.65217391304348C 30.88125 15.65217391304348 37.74375 22.608695652173914 45.75 22.608695652173914C 53.75625 22.608695652173914 60.61875 19.1304347826087 68.625 19.1304347826087C 76.63125 19.1304347826087 83.49375 7.105427357601002e-15 91.5 7.105427357601002e-15C 99.50625 7.105427357601002e-15 106.36875 5.217391304347828 114.375 5.217391304347828C 122.38125 5.217391304347828 129.24375 1.7391304347826164 137.25 1.7391304347826164C 145.25625 1.7391304347826164 152.11875 24.347826086956523 160.125 24.347826086956523C 168.13125 24.347826086956523 174.99375 19.1304347826087 183 19.1304347826087"
                                    fill="none"
                                    fillOpacity="1"
                                    stroke="rgba(188,231,12,0.85)"
                                    strokeOpacity="1"
                                    strokeLinecap="butt"
                                    strokeWidth="1.5"
                                    strokeDasharray="0"
                                    className="apexcharts-line"
                                    index="0"
                                    clipPath="url(#gridRectMaskz2sgtujh)"
                                    pathTo="M 0 40C 8.00625 40 14.86875 15.65217391304348 22.875 15.65217391304348C 30.88125 15.65217391304348 37.74375 22.608695652173914 45.75 22.608695652173914C 53.75625 22.608695652173914 60.61875 19.1304347826087 68.625 19.1304347826087C 76.63125 19.1304347826087 83.49375 7.105427357601002e-15 91.5 7.105427357601002e-15C 99.50625 7.105427357601002e-15 106.36875 5.217391304347828 114.375 5.217391304347828C 122.38125 5.217391304347828 129.24375 1.7391304347826164 137.25 1.7391304347826164C 145.25625 1.7391304347826164 152.11875 24.347826086956523 160.125 24.347826086956523C 168.13125 24.347826086956523 174.99375 19.1304347826087 183 19.1304347826087"
                                    pathFrom="M -1 40 L -1 40 L 22.875 40 L 45.75 40 L 68.625 40 L 91.5 40 L 114.375 40 L 137.25 40 L 160.125 40 L 183 40"
                                    fillRule="evenodd"
                                  ></path>
                                  <g
                                    id="SvgjsG3681"
                                    className="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
                                    data:realIndex="0"
                                  ></g>
                                </g>
                                <g
                                  id="SvgjsG3682"
                                  className="apexcharts-datalabels"
                                  data:realIndex="0"
                                ></g>
                              </g>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span className="fs-four text-white">INR</span>
                        <span className="fs-four p1-color">4009251.11</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="p1-color">0.35%</span>
                        <i className="ti ti-caret-up-filled p1-color fs-four"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-xl-12">
                  <div className="markets_section__card bg4-color rounded-20 br2 p-4 p-md-6 wow fadeInUp">
                    <div className="markets_section__card-head d-flex align-items-center gap-2 mb-4 mb-md-5">
                      <img
                        src="assets/images/eth.png"
                        alt="icon"
                        style={{ height: "40px" }}
                      />
                      <h4 className="text-white">Ethereum</h4>
                      <span className="fs-ten">ETH</span>
                    </div>
                    <div className="markets_section__card-chart mb-4 mb-md-5">
                      <div
                        id="crm-total-customers2"
                        style={{ minHeight: "40px" }}
                      >
                        <div
                          id="apexchartsz2sgtujh"
                          className="apexcharts-canvas apexchartsz2sgtujh apexcharts-theme-light"
                          style={{ width: "183px", height: "40px" }}
                        >
                          <svg
                            id="SvgjsSvg3671"
                            width="183"
                            height="40"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xmlns:svgjs="http://svgjs.dev"
                            className="apexcharts-svg"
                            xmlns:data="ApexChartsNS"
                            transform="translate(0, 0)"
                            style={{ background: "transparent" }}
                          >
                            <g
                              id="SvgjsG3673"
                              className="apexcharts-inner apexcharts-graphical"
                              transform="translate(0, 0)"
                            >
                              <defs id="SvgjsDefs3672">
                                <clipPath id="gridRectMaskz2sgtujh">
                                  <rect
                                    id="SvgjsRect3677"
                                    width="188.5"
                                    height="41.5"
                                    x="-2.75"
                                    y="-0.75"
                                    rx="0"
                                    ry="0"
                                    opacity="1"
                                    strokeWidth="0"
                                    stroke="none"
                                    strokeDasharray="0"
                                    fill="#fff"
                                  ></rect>
                                </clipPath>
                                <clipPath id="forecastMaskz2sgtujh"></clipPath>
                                <clipPath id="nonForecastMaskz2sgtujh"></clipPath>
                                <clipPath id="gridRectMarkerMaskz2sgtujh">
                                  <rect
                                    id="SvgjsRect3678"
                                    width="187"
                                    height="44"
                                    x="-2"
                                    y="-2"
                                    rx="0"
                                    ry="0"
                                    opacity="1"
                                    strokeWidth="0"
                                    stroke="none"
                                    strokeDasharray="0"
                                    fill="#fff"
                                  ></rect>
                                </clipPath>
                              </defs>
                              <line
                                id="SvgjsLine3676"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="40"
                                stroke="#b6b6b6"
                                strokeDasharray="3"
                                strokeLinecap="butt"
                                className="apexcharts-xcrosshairs"
                                x="0"
                                y="0"
                                width="1"
                                height="40"
                                fill="#b1b9c4"
                                filter="none"
                                fillOpacity="0.9"
                                strokeWidth="1"
                              ></line>
                              <g id="SvgjsG3684" className="apexcharts-grid">
                                <g
                                  id="SvgjsG3685"
                                  className="apexcharts-gridlines-horizontal"
                                  style={{ display: "none" }}
                                >
                                  <line
                                    id="SvgjsLine3688"
                                    x1="0"
                                    y1="0"
                                    x2="183"
                                    y2="0"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3689"
                                    x1="0"
                                    y1="4"
                                    x2="183"
                                    y2="4"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3690"
                                    x1="0"
                                    y1="8"
                                    x2="183"
                                    y2="8"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3691"
                                    x1="0"
                                    y1="12"
                                    x2="183"
                                    y2="12"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3692"
                                    x1="0"
                                    y1="16"
                                    x2="183"
                                    y2="16"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3693"
                                    x1="0"
                                    y1="20"
                                    x2="183"
                                    y2="20"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3694"
                                    x1="0"
                                    y1="24"
                                    x2="183"
                                    y2="24"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3695"
                                    x1="0"
                                    y1="28"
                                    x2="183"
                                    y2="28"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3696"
                                    x1="0"
                                    y1="32"
                                    x2="183"
                                    y2="32"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3697"
                                    x1="0"
                                    y1="36"
                                    x2="183"
                                    y2="36"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3698"
                                    x1="0"
                                    y1="40"
                                    x2="183"
                                    y2="40"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                </g>
                                <g
                                  id="SvgjsG3686"
                                  className="apexcharts-gridlines-vertical"
                                  style={{ display: "none" }}
                                ></g>
                                <line
                                  id="SvgjsLine3700"
                                  x1="0"
                                  y1="40"
                                  x2="183"
                                  y2="40"
                                  stroke="transparent"
                                  strokeDasharray="0"
                                  strokeLinecap="butt"
                                ></line>
                                <line
                                  id="SvgjsLine3699"
                                  x1="0"
                                  y1="1"
                                  x2="0"
                                  y2="40"
                                  stroke="transparent"
                                  strokeDasharray="0"
                                  strokeLinecap="butt"
                                ></line>
                              </g>
                              <g
                                id="SvgjsG3679"
                                className="apexcharts-line-series apexcharts-plot-series"
                              >
                                <g
                                  id="SvgjsG3680"
                                  className="apexcharts-series"
                                  seriesName="Value"
                                  data:longestSeries="true"
                                  rel="1"
                                  data:realIndex="0"
                                >
                                  <path
                                    id="SvgjsPath3683"
                                    d="M 0 40C 8.00625 40 14.86875 15.65217391304348 22.875 15.65217391304348C 30.88125 15.65217391304348 37.74375 22.608695652173914 45.75 22.608695652173914C 53.75625 22.608695652173914 60.61875 19.1304347826087 68.625 19.1304347826087C 76.63125 19.1304347826087 83.49375 7.105427357601002e-15 91.5 7.105427357601002e-15C 99.50625 7.105427357601002e-15 106.36875 5.217391304347828 114.375 5.217391304347828C 122.38125 5.217391304347828 129.24375 1.7391304347826164 137.25 1.7391304347826164C 145.25625 1.7391304347826164 152.11875 24.347826086956523 160.125 24.347826086956523C 168.13125 24.347826086956523 174.99375 19.1304347826087 183 19.1304347826087"
                                    fill="none"
                                    fillOpacity="1"
                                    stroke="rgba(188,231,12,0.85)"
                                    strokeOpacity="1"
                                    strokeLinecap="butt"
                                    strokeWidth="1.5"
                                    strokeDasharray="0"
                                    className="apexcharts-line"
                                    index="0"
                                    clipPath="url(#gridRectMaskz2sgtujh)"
                                    pathTo="M 0 40C 8.00625 40 14.86875 15.65217391304348 22.875 15.65217391304348C 30.88125 15.65217391304348 37.74375 22.608695652173914 45.75 22.608695652173914C 53.75625 22.608695652173914 60.61875 19.1304347826087 68.625 19.1304347826087C 76.63125 19.1304347826087 83.49375 7.105427357601002e-15 91.5 7.105427357601002e-15C 99.50625 7.105427357601002e-15 106.36875 5.217391304347828 114.375 5.217391304347828C 122.38125 5.217391304347828 129.24375 1.7391304347826164 137.25 1.7391304347826164C 145.25625 1.7391304347826164 152.11875 24.347826086956523 160.125 24.347826086956523C 168.13125 24.347826086956523 174.99375 19.1304347826087 183 19.1304347826087"
                                    pathFrom="M -1 40 L -1 40 L 22.875 40 L 45.75 40 L 68.625 40 L 91.5 40 L 114.375 40 L 137.25 40 L 160.125 40 L 183 40"
                                    fillRule="evenodd"
                                  ></path>
                                  <g
                                    id="SvgjsG3681"
                                    className="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
                                    data:realIndex="0"
                                  ></g>
                                </g>
                                <g
                                  id="SvgjsG3682"
                                  className="apexcharts-datalabels"
                                  data:realIndex="0"
                                ></g>
                              </g>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span className="fs-four text-white">INR</span>
                        <span className="fs-four p1-color">205600.11</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="p1-color">0.40%</span>
                        <i className="ti ti-caret-up-filled p1-color fs-four"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-xl-12">
                  <div className="markets_section__card bg4-color rounded-20 br2 p-4 p-md-6 wow fadeInUp">
                    <div className="markets_section__card-head d-flex align-items-center gap-2 mb-4 mb-md-5">
                      <img
                        src="assets/images/usdt.png"
                        alt="icon"
                        style={{ height: "40px" }}
                      />
                      <h4 className="text-white">Tether</h4>
                      <span className="fs-ten">USDT</span>
                    </div>
                    <div className="markets_section__card-chart mb-4 mb-md-5">
                      <div
                        id="crm-total-customers2"
                        style={{ minHeight: "40px" }}
                      >
                        <div
                          id="apexchartsz2sgtujh"
                          className="apexcharts-canvas apexchartsz2sgtujh apexcharts-theme-light"
                          style={{ width: "183px", height: "40px" }}
                        >
                          <svg
                            id="SvgjsSvg3671"
                            width="183"
                            height="40"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xmlns:svgjs="http://svgjs.dev"
                            className="apexcharts-svg"
                            xmlns:data="ApexChartsNS"
                            transform="translate(0, 0)"
                            style={{ background: "transparent" }}
                          >
                            <g
                              id="SvgjsG3673"
                              className="apexcharts-inner apexcharts-graphical"
                              transform="translate(0, 0)"
                            >
                              <defs id="SvgjsDefs3672">
                                <clipPath id="gridRectMaskz2sgtujh">
                                  <rect
                                    id="SvgjsRect3677"
                                    width="188.5"
                                    height="41.5"
                                    x="-2.75"
                                    y="-0.75"
                                    rx="0"
                                    ry="0"
                                    opacity="1"
                                    strokeWidth="0"
                                    stroke="none"
                                    strokeDasharray="0"
                                    fill="#fff"
                                  ></rect>
                                </clipPath>
                                <clipPath id="forecastMaskz2sgtujh"></clipPath>
                                <clipPath id="nonForecastMaskz2sgtujh"></clipPath>
                                <clipPath id="gridRectMarkerMaskz2sgtujh">
                                  <rect
                                    id="SvgjsRect3678"
                                    width="187"
                                    height="44"
                                    x="-2"
                                    y="-2"
                                    rx="0"
                                    ry="0"
                                    opacity="1"
                                    strokeWidth="0"
                                    stroke="none"
                                    strokeDasharray="0"
                                    fill="#fff"
                                  ></rect>
                                </clipPath>
                              </defs>
                              <line
                                id="SvgjsLine3676"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="40"
                                stroke="#b6b6b6"
                                strokeDasharray="3"
                                strokeLinecap="butt"
                                className="apexcharts-xcrosshairs"
                                x="0"
                                y="0"
                                width="1"
                                height="40"
                                fill="#b1b9c4"
                                filter="none"
                                fillOpacity="0.9"
                                strokeWidth="1"
                              ></line>
                              <g id="SvgjsG3684" className="apexcharts-grid">
                                <g
                                  id="SvgjsG3685"
                                  className="apexcharts-gridlines-horizontal"
                                  style={{ display: "none" }}
                                >
                                  <line
                                    id="SvgjsLine3688"
                                    x1="0"
                                    y1="0"
                                    x2="183"
                                    y2="0"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3689"
                                    x1="0"
                                    y1="4"
                                    x2="183"
                                    y2="4"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3690"
                                    x1="0"
                                    y1="8"
                                    x2="183"
                                    y2="8"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3691"
                                    x1="0"
                                    y1="12"
                                    x2="183"
                                    y2="12"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3692"
                                    x1="0"
                                    y1="16"
                                    x2="183"
                                    y2="16"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3693"
                                    x1="0"
                                    y1="20"
                                    x2="183"
                                    y2="20"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3694"
                                    x1="0"
                                    y1="24"
                                    x2="183"
                                    y2="24"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3695"
                                    x1="0"
                                    y1="28"
                                    x2="183"
                                    y2="28"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3696"
                                    x1="0"
                                    y1="32"
                                    x2="183"
                                    y2="32"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3697"
                                    x1="0"
                                    y1="36"
                                    x2="183"
                                    y2="36"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                  <line
                                    id="SvgjsLine3698"
                                    x1="0"
                                    y1="40"
                                    x2="183"
                                    y2="40"
                                    stroke="#e0e0e0"
                                    strokeDasharray="0"
                                    strokeLinecap="butt"
                                    className="apexcharts-gridline"
                                  ></line>
                                </g>
                                <g
                                  id="SvgjsG3686"
                                  className="apexcharts-gridlines-vertical"
                                  style={{ display: "none" }}
                                ></g>
                                <line
                                  id="SvgjsLine3700"
                                  x1="0"
                                  y1="40"
                                  x2="183"
                                  y2="40"
                                  stroke="transparent"
                                  strokeDasharray="0"
                                  strokeLinecap="butt"
                                ></line>
                                <line
                                  id="SvgjsLine3699"
                                  x1="0"
                                  y1="1"
                                  x2="0"
                                  y2="40"
                                  stroke="transparent"
                                  strokeDasharray="0"
                                  strokeLinecap="butt"
                                ></line>
                              </g>
                              <g
                                id="SvgjsG3679"
                                className="apexcharts-line-series apexcharts-plot-series"
                              >
                                <g
                                  id="SvgjsG3680"
                                  className="apexcharts-series"
                                  seriesName="Value"
                                  data:longestSeries="true"
                                  rel="1"
                                  data:realIndex="0"
                                >
                                  <path
                                    id="SvgjsPath3683"
                                    d="M 0 40C 8.00625 40 14.86875 15.65217391304348 22.875 15.65217391304348C 30.88125 15.65217391304348 37.74375 22.608695652173914 45.75 22.608695652173914C 53.75625 22.608695652173914 60.61875 19.1304347826087 68.625 19.1304347826087C 76.63125 19.1304347826087 83.49375 7.105427357601002e-15 91.5 7.105427357601002e-15C 99.50625 7.105427357601002e-15 106.36875 5.217391304347828 114.375 5.217391304347828C 122.38125 5.217391304347828 129.24375 1.7391304347826164 137.25 1.7391304347826164C 145.25625 1.7391304347826164 152.11875 24.347826086956523 160.125 24.347826086956523C 168.13125 24.347826086956523 174.99375 19.1304347826087 183 19.1304347826087"
                                    fill="none"
                                    fillOpacity="1"
                                    stroke="rgba(188,231,12,0.85)"
                                    strokeOpacity="1"
                                    strokeLinecap="butt"
                                    strokeWidth="1.5"
                                    strokeDasharray="0"
                                    className="apexcharts-line"
                                    index="0"
                                    clipPath="url(#gridRectMaskz2sgtujh)"
                                    pathTo="M 0 40C 8.00625 40 14.86875 15.65217391304348 22.875 15.65217391304348C 30.88125 15.65217391304348 37.74375 22.608695652173914 45.75 22.608695652173914C 53.75625 22.608695652173914 60.61875 19.1304347826087 68.625 19.1304347826087C 76.63125 19.1304347826087 83.49375 7.105427357601002e-15 91.5 7.105427357601002e-15C 99.50625 7.105427357601002e-15 106.36875 5.217391304347828 114.375 5.217391304347828C 122.38125 5.217391304347828 129.24375 1.7391304347826164 137.25 1.7391304347826164C 145.25625 1.7391304347826164 152.11875 24.347826086956523 160.125 24.347826086956523C 168.13125 24.347826086956523 174.99375 19.1304347826087 183 19.1304347826087"
                                    pathFrom="M -1 40 L -1 40 L 22.875 40 L 45.75 40 L 68.625 40 L 91.5 40 L 114.375 40 L 137.25 40 L 160.125 40 L 183 40"
                                    fillRule="evenodd"
                                  ></path>
                                  <g
                                    id="SvgjsG3681"
                                    className="apexcharts-series-markers-wrap apexcharts-hidden-element-shown"
                                    data:realIndex="0"
                                  ></g>
                                </g>
                                <g
                                  id="SvgjsG3682"
                                  className="apexcharts-datalabels"
                                  data:realIndex="0"
                                ></g>
                              </g>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span className="fs-four text-white">INR</span>
                        <span className="fs-four p1-color">87.11</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="p1-color">0.31%</span>
                        <i className="ti ti-caret-up-filled p1-color fs-four"></i>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- <div className="col-md-12 col-xl-12">
                          <div className="markets_section__card bg4-color rounded-20 br2 p-4 p-md-6 wow fadeInUp">
                              <div className="markets_section__card-head d-flex align-items-center gap-2 mb-4 mb-md-5">
                                  <img src="assets/images/inr.png" alt="icon" style="height: 40px;"/>
                                  <h4 className="text-white">Indian Rupee</h4>
                                  <span className="fs-ten">INR</span>
                              </div>
                              <div className="markets_section__card-chart mb-4 mb-md-5">
                                  <div id="crm-total-customers2" style="min-height: 40px;">
                                      <div id="apexchartsz2sgtujh" className="apexcharts-canvas apexchartsz2sgtujh apexcharts-theme-light" style="width: 183px; height: 40px;">
                                          <svg id="SvgjsSvg3671" width="183" height="40" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev" className="apexcharts-svg" xmlns:data="ApexChartsNS" transform="translate(0, 0)" style="background: transparent;">
                                              <g id="SvgjsG3673" className="apexcharts-inner apexcharts-graphical" transform="translate(0, 0)">
                                                  <defs id="SvgjsDefs3672">
                                                      <clipPath id="gridRectMaskz2sgtujh">
                                                          <rect id="SvgjsRect3677" width="188.5" height="41.5" x="-2.75" y="-0.75" rx="0" ry="0" opacity="1" strokeWidth="0" stroke="none" strokeDasharray="0" fill="#fff"></rect>
                                                      </clipPath>
                                                      <clipPath id="forecastMaskz2sgtujh"></clipPath>
                                                      <clipPath id="nonForecastMaskz2sgtujh"></clipPath>
                                                      <clipPath id="gridRectMarkerMaskz2sgtujh">
                                                          <rect id="SvgjsRect3678" width="187" height="44" x="-2" y="-2" rx="0" ry="0" opacity="1" strokeWidth="0" stroke="none" strokeDasharray="0" fill="#fff"></rect>
                                                      </clipPath>
                                                  </defs>
                                                  <line id="SvgjsLine3676" x1="0" y1="0" x2="0" y2="40" stroke="#b6b6b6" strokeDasharray="3" stroke-linecap="butt" className="apexcharts-xcrosshairs" x="0" y="0" width="1" height="40" fill="#b1b9c4" filter="none" fill-opacity="0.9" strokeWidth="1"></line>
                                                  <g id="SvgjsG3684" className="apexcharts-grid">
                                                      <g id="SvgjsG3685" className="apexcharts-gridlines-horizontal" style="display: none;">
                                                          <line id="SvgjsLine3688" x1="0" y1="0" x2="183" y2="0" stroke="#e0e0e0" strokeDasharray="0" stroke-linecap="butt" className="apexcharts-gridline"></line>
                                                          <line id="SvgjsLine3689" x1="0" y1="4" x2="183" y2="4" stroke="#e0e0e0" strokeDasharray="0" stroke-linecap="butt" className="apexcharts-gridline"></line>
                                                          <line id="SvgjsLine3690" x1="0" y1="8" x2="183" y2="8" stroke="#e0e0e0" strokeDasharray="0" stroke-linecap="butt" className="apexcharts-gridline"></line>
                                                          <line id="SvgjsLine3691" x1="0" y1="12" x2="183" y2="12" stroke="#e0e0e0" strokeDasharray="0" stroke-linecap="butt" className="apexcharts-gridline"></line>
                                                          <line id="SvgjsLine3692" x1="0" y1="16" x2="183" y2="16" stroke="#e0e0e0" strokeDasharray="0" stroke-linecap="butt" className="apexcharts-gridline"></line>
                                                          <line id="SvgjsLine3693" x1="0" y1="20" x2="183" y2="20" stroke="#e0e0e0" strokeDasharray="0" stroke-linecap="butt" className="apexcharts-gridline"></line>
                                                          <line id="SvgjsLine3694" x1="0" y1="24" x2="183" y2="24" stroke="#e0e0e0" strokeDasharray="0" stroke-linecap="butt" className="apexcharts-gridline"></line>
                                                          <line id="SvgjsLine3695" x1="0" y1="28" x2="183" y2="28" stroke="#e0e0e0" strokeDasharray="0" stroke-linecap="butt" className="apexcharts-gridline"></line>
                                                          <line id="SvgjsLine3696" x1="0" y1="32" x2="183" y2="32" stroke="#e0e0e0" strokeDasharray="0" stroke-linecap="butt" className="apexcharts-gridline"></line>
                                                          <line id="SvgjsLine3697" x1="0" y1="36" x2="183" y2="36" stroke="#e0e0e0" strokeDasharray="0" stroke-linecap="butt" className="apexcharts-gridline"></line>
                                                          <line id="SvgjsLine3698" x1="0" y1="40" x2="183" y2="40" stroke="#e0e0e0" strokeDasharray="0" stroke-linecap="butt" className="apexcharts-gridline"></line>
                                                      </g>
                                                      <g id="SvgjsG3686" className="apexcharts-gridlines-vertical" style="display: none;"></g>
                                                      <line id="SvgjsLine3700" x1="0" y1="40" x2="183" y2="40" stroke="transparent" strokeDasharray="0" stroke-linecap="butt"></line>
                                                      <line id="SvgjsLine3699" x1="0" y1="1" x2="0" y2="40" stroke="transparent" strokeDasharray="0" stroke-linecap="butt"></line>
                                                  </g>
                                                  <g id="SvgjsG3679" className="apexcharts-line-series apexcharts-plot-series">
                                                      <g id="SvgjsG3680" className="apexcharts-series" seriesName="Value" data:longestSeries="true" rel="1" data:realIndex="0">
                                                          <path id="SvgjsPath3683" d="M 0 40C 8.00625 40 14.86875 15.65217391304348 22.875 15.65217391304348C 30.88125 15.65217391304348 37.74375 22.608695652173914 45.75 22.608695652173914C 53.75625 22.608695652173914 60.61875 19.1304347826087 68.625 19.1304347826087C 76.63125 19.1304347826087 83.49375 7.105427357601002e-15 91.5 7.105427357601002e-15C 99.50625 7.105427357601002e-15 106.36875 5.217391304347828 114.375 5.217391304347828C 122.38125 5.217391304347828 129.24375 1.7391304347826164 137.25 1.7391304347826164C 145.25625 1.7391304347826164 152.11875 24.347826086956523 160.125 24.347826086956523C 168.13125 24.347826086956523 174.99375 19.1304347826087 183 19.1304347826087" fill="none" fill-opacity="1" stroke="rgba(188,231,12,0.85)" stroke-opacity="1" stroke-linecap="butt" strokeWidth="1.5" strokeDasharray="0" className="apexcharts-line" index="0" clip-path="url(#gridRectMaskz2sgtujh)" pathTo="M 0 40C 8.00625 40 14.86875 15.65217391304348 22.875 15.65217391304348C 30.88125 15.65217391304348 37.74375 22.608695652173914 45.75 22.608695652173914C 53.75625 22.608695652173914 60.61875 19.1304347826087 68.625 19.1304347826087C 76.63125 19.1304347826087 83.49375 7.105427357601002e-15 91.5 7.105427357601002e-15C 99.50625 7.105427357601002e-15 106.36875 5.217391304347828 114.375 5.217391304347828C 122.38125 5.217391304347828 129.24375 1.7391304347826164 137.25 1.7391304347826164C 145.25625 1.7391304347826164 152.11875 24.347826086956523 160.125 24.347826086956523C 168.13125 24.347826086956523 174.99375 19.1304347826087 183 19.1304347826087" pathFrom="M -1 40 L -1 40 L 22.875 40 L 45.75 40 L 68.625 40 L 91.5 40 L 114.375 40 L 137.25 40 L 160.125 40 L 183 40" fill-rule="evenodd"></path>
                                                          <g id="SvgjsG3681" className="apexcharts-series-markers-wrap apexcharts-hidden-element-shown" data:realIndex="0"></g>
                                                      </g>
                                                      <g id="SvgjsG3682" className="apexcharts-datalabels" data:realIndex="0"></g>
                                                  </g>
                                              </g>
                                          </svg>
                                      </div>
                                  </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-flex align-items-center gap-2">
                                      <span className="fs-four text-white">INR</span>
                                      <span className="fs-four p1-color">1.01</span>
                                  </div>
                                  <div className="d-flex align-items-center gap-2">
                                      <span className="p1-color">0.29%</span>
                                      <i className="ti ti-caret-up-filled p1-color fs-four"></i>
                                  </div>
                              </div>
                          </div>
                      </div> --> */}
              </div>
            </div>
            <Transaction />
            {/* <div className="col-lg-6">
              <div className="row gy-5 gy-md-6 justify-content-center">
                <div className="col-lg-6 col-xxl-12">
                  <div className="buy_crypto__formarea p-6 p-px-8 rounded-20 bg7-color wow fadeInUp">
                    <div className="demo">
                      <div className="tab">
                        <div className="tab-wrapper">
                          <input
                            id="tab1"
                            type="radio"
                            name="tabsA"
                            className="radio-inputs"
                            defaultChecked
                          />
                          <label className="tab-button" htmlFor="tab1">
                            Buy Assets
                          </label>
                          <div className="tab-content">
                            <h2 className="mb-3 text-white">Buy Assets</h2>
                            <form>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="buy_crypto__formarea-group mb-5 mb-md-6">
                                    <label className="mb-2 text-white">
                                      Spend
                                    </label>
                                    <div className="d-flex align-items-center br2 p-1 rounded-4 bg1-color">
                                      <input
                                        type="text"
                                        placeholder="2201-650,600"
                                      />
                                      <div className="text-end">
                                        <div className="apex_section__slider-selector markets_section__rcard-selector">
                                          <div className="f-group">
                                            <div className="f-dropdown selectDropdown filled">
                                              <select
                                                id="select3"
                                                className="f-control f-dropdown"
                                              >
                                                <option
                                                  value="1"
                                                  selected=""
                                                  data-image="assets/images/btc.png"
                                                >
                                                  BTC
                                                </option>
                                                <option
                                                  value="2"
                                                  data-image="assets/images/eth.png"
                                                >
                                                  ETH
                                                </option>
                                                <option
                                                  value="3"
                                                  data-image="assets/images/usdt.png"
                                                >
                                                  USDT
                                                </option>
                                                <option
                                                  value="4"
                                                  data-image="assets/images/inr.png"
                                                >
                                                  INR
                                                </option>
                                              </select>
                                              <ul>
                                                <li className="active">
                                                  <a data-val="1">
                                                    <img src="assets/images/btc.png" />
                                                    <span>BTC</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a data-val="2">
                                                    <img src="assets/images/icon/eth.png" />
                                                    <span>ETH</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a data-val="3">
                                                    <img src="assets/images/usdt.png" />
                                                    <span>USDT</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a data-val="4">
                                                    <img src="assets/images/inr.png" />
                                                    <span>TLP</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="buy_crypto__formarea-group mb-5 mb-md-6">
                                    <label className="mb-2 text-white">
                                      Receive
                                    </label>
                                    <div className="d-flex align-items-center br2 p-1 rounded-4 mb-2 bg1-color">
                                      <input
                                        type="text"
                                        placeholder="Enter purchase amount"
                                      />
                                      <div className="text-end">
                                        <div className="apex_section__slider-selector markets_section__rcard-selector">
                                          <div className="f-group">
                                            <div className="f-dropdown selectDropdown filled">
                                              <select
                                                id="select4"
                                                className="f-control f-dropdown"
                                              >
                                                <option
                                                  value="1"
                                                  data-image="assets/images/usdt.png"
                                                >
                                                  USDT
                                                </option>
                                                <option
                                                  value="2"
                                                  data-image="assets/images/eth.png"
                                                >
                                                  ETH
                                                </option>
                                                <option
                                                  value="3"
                                                  data-image="assets/images/btc.png"
                                                >
                                                  BTC
                                                </option>
                                                <option
                                                  value="4"
                                                  selected=""
                                                  data-image="assets/images/inr.png"
                                                >
                                                  INR
                                                </option>
                                              </select>
                                              <ul>
                                                <li>
                                                  <a data-val="1">
                                                    <img src="assets/images/usdt.png" />
                                                    <span>USDT</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a data-val="2">
                                                    <img src="assets/images/eth.png" />
                                                    <span>ETH</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a data-val="3">
                                                    <img src="assets/images/btc.png" />
                                                    <span>BTC</span>
                                                  </a>
                                                </li>
                                                <li className="active">
                                                  <a data-val="4">
                                                    <img src="assets/images/inr.png" />
                                                    <span>INR</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <span className="text-white">
                                      1 BTC = 3,547,292 INR
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="buy_crypto__formarea-group mb-5 mb-md-6">
                                <label className="mb-2">Network</label>
                                <div className="mb-2 br2 p-1 rounded-4 bg1-color">
                                  <div className="text-end">
                                    <div className="apex_section__slider-selector markets_section__rcard-selector">
                                      <div className="f-group">
                                        <div className="f-dropdown selectDropdown filled">
                                          <select
                                            id="select5"
                                            className="f-control f-dropdown"
                                          >
                                            <option value="1" selected="">
                                              Eth Chain
                                            </option>
                                            <option value="2">Bnb Chain</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <span>Gass fee</span>
                                  <span className="p1-color">5 USDT</span>
                                </div>
                              </div>
                              <div className="buy_crypto__formarea-group mb-6 mb-md-8">
                                <label className="mb-2">Wallet Address</label>
                                <div className="br2 p-1 rounded-4 bg1-color">
                                  <textarea
                                    placeholder="Address"
                                    cols="15"
                                    rows="3"
                                  ></textarea>
                                </div>
                              </div>
                              <br />
                              <a
                                href="dashboard-3.html"
                                className="cmn-btn py-3 px-5 px-md-6 d-block"
                              >
                                Buy Order
                              </a>
                            </form>
                          </div>
                          <input
                            id="tab2"
                            type="radio"
                            className="radio-inputs"
                            name="tabsA"
                          />
                          <label className="tab-button" htmlFor="tab2">
                            Sell Assets
                          </label>
                          <div className="tab-content">
                            <h2 className="mb-3 text-white">Sell Assets</h2>
                            <form>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="buy_crypto__formarea-group mb-5 mb-md-6">
                                    <label className="mb-2 text-white">
                                      Spend
                                    </label>
                                    <div className="d-flex align-items-center br2 p-1 rounded-4 bg1-color">
                                      <input
                                        type="text"
                                        placeholder="2201-650,600"
                                      />
                                      <div className="text-end">
                                        <div className="apex_section__slider-selector markets_section__rcard-selector">
                                          <div className="f-group">
                                            <div className="f-dropdown selectDropdown filled">
                                              <select
                                                id="select3"
                                                className="f-control f-dropdown"
                                              >
                                                <option
                                                  value="1"
                                                  selected=""
                                                  data-image="assets/images/btc.png"
                                                >
                                                  BTC
                                                </option>
                                                <option
                                                  value="2"
                                                  data-image="assets/images/eth.png"
                                                >
                                                  ETH
                                                </option>
                                                <option
                                                  value="3"
                                                  data-image="assets/images/usdt.png"
                                                >
                                                  USDT
                                                </option>
                                                <option
                                                  value="4"
                                                  data-image="assets/images/inr.png"
                                                >
                                                  INR
                                                </option>
                                              </select>
                                              <ul>
                                                <li className="active">
                                                  <a data-val="1">
                                                    <img src="assets/images/btc.png" />
                                                    <span>BTC</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a data-val="2">
                                                    <img src="assets/images/icon/eth.png" />
                                                    <span>ETH</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a data-val="3">
                                                    <img src="assets/images/usdt.png" />
                                                    <span>USDT</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a data-val="4">
                                                    <img src="assets/images/inr.png" />
                                                    <span>TLP</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="buy_crypto__formarea-group mb-5 mb-md-6">
                                    <label className="mb-2 text-white">
                                      Receive
                                    </label>
                                    <div className="d-flex align-items-center br2 p-1 rounded-4 mb-2 bg1-color">
                                      <input
                                        type="text"
                                        placeholder="Enter purchase amount"
                                      />
                                      <div className="text-end">
                                        <div className="apex_section__slider-selector markets_section__rcard-selector">
                                          <div className="f-group">
                                            <div className="f-dropdown selectDropdown filled">
                                              <select
                                                id="select4"
                                                className="f-control f-dropdown"
                                              >
                                                <option
                                                  value="1"
                                                  data-image="assets/images/usdt.png"
                                                >
                                                  USDT
                                                </option>
                                                <option
                                                  value="2"
                                                  data-image="assets/images/eth.png"
                                                >
                                                  ETH
                                                </option>
                                                <option
                                                  value="3"
                                                  data-image="assets/images/btc.png"
                                                >
                                                  BTC
                                                </option>
                                                <option
                                                  value="4"
                                                  selected=""
                                                  data-image="assets/images/inr.png"
                                                >
                                                  INR
                                                </option>
                                              </select>
                                              <ul>
                                                <li>
                                                  <a data-val="1">
                                                    <img src="assets/images/usdt.png" />
                                                    <span>USDT</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a data-val="2">
                                                    <img src="assets/images/eth.png" />
                                                    <span>ETH</span>
                                                  </a>
                                                </li>
                                                <li>
                                                  <a data-val="3">
                                                    <img src="assets/images/btc.png" />
                                                    <span>BTC</span>
                                                  </a>
                                                </li>
                                                <li className="active">
                                                  <a data-val="4">
                                                    <img src="assets/images/inr.png" />
                                                    <span>INR</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <span className="text-white">
                                      1 BTC = 3,547,292 INR
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="buy_crypto__formarea-group mb-5 mb-md-6">
                                <label className="mb-2">Network</label>
                                <div className="mb-2 br2 p-1 rounded-4 bg1-color">
                                  <div className="text-end">
                                    <div className="apex_section__slider-selector markets_section__rcard-selector">
                                      <div className="f-group">
                                        <div className="f-dropdown selectDropdown filled">
                                          <select
                                            id="select5"
                                            className="f-control f-dropdown"
                                          >
                                            <option value="1" selected="">
                                              Eth Chain
                                            </option>
                                            <option value="2">Bnb Chain</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <span>Gass fee</span>
                                  <span className="p1-color">5 USDT</span>
                                </div>
                              </div>
                              <div className="buy_crypto__formarea-group mb-6 mb-md-8">
                                <label className="mb-2">Wallet Address</label>
                                <div className="br2 p-1 rounded-4 bg1-color">
                                  <textarea
                                    placeholder="Address"
                                    cols="15"
                                    rows="3"
                                  ></textarea>
                                </div>
                              </div>
                              <br />
                              <a
                                href="dashboard-2.html"
                                className="cmn-btn py-3 px-5 px-md-6 d-block"
                              >
                                Sell Order
                              </a>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <a href="#" className="scrollToTop scrollToTop--style1">
        <i className="fa-solid fa-arrow-up-from-bracket"></i>
      </a>
    </body>
  );
};
