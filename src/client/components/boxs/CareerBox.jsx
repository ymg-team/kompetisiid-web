import React from "react"

export default () => {
  return (
    <React.Fragment>
      <div
        className="col-md-12 careers-header"
        style={{
          textAlign: "center",
          backgroundImage: "url(/assets/4.2/img/careers-background.jpg)"
        }}
      >
        <div className="container">
          <div className="row no-margin" />
          <h1>Mari Berkarir Bersama Kompetisi Id</h1>
          <h3>
            Kompetisi Id adalah salah satu produk dari YMG yang sama-sama
            bertujuan untuk melakukan lebih untuk Indonesia. Mari bergabung
            bersama kami untuk terus meramaikan semangat kompetisi di Indonesia.
            <br />
            Kami sedang mencari jiwa-jiwa bertalenta untuk menjadi bagian dari
            KI yang memiliki bagian sebagai berikut.
          </h3>
          <a
            className="btn btn-white btn-bg"
            href="#available-careers"
            style={{ fontWeight: "bold" }}
          >
            Telusuri Lowongan Tersedia{" "}
            <i className="fa fa-arrow-circle-o-down"> </i>
          </a>
        </div>
      </div>

      <div
        className="col-md-8 col-md-push-2 m-t-b-20 align-center careers"
        style={{ lineHeight: 2 }}
      >
        <section className="col-md-12" id="available-careers">
          <h1>Bagian Yang Tersedia</h1>
          <div className="col-md-12">
            <div className="col-md-12">
              <h2>Software Engineer</h2>
            </div>
            <div className="col-md-6 carrers-item">
              <strong>Web Engineers</strong>
              <ul className="align-left">
                <li>NodeJS + Express (isomorphic app)</li>
                <li>ReactJS (diutamakan), VueJS (libs based on components)</li>
                <li>
                  Terbiasa menggunakan dependensi pendukung dari<i>NPM</i>, atau
                  <i>tool-tool</i>untuk<i>development</i>seperti
                  <i>Grunt, Prepack, Webpack, dll</i>
                </li>
                <li>
                  Kami menggunakan<i>git</i>sebagai<i>version control system</i>
                </li>
              </ul>
              <button className="btn btn-gray btn-sm" disabled="true">
                Pendaftaran Belum Dibuka
              </button>
            </div>
            <div className="col-md-6 carrers-item">
              <strong>API Engineers</strong>
              <ul className="align-left">
                <li>Python + Flasks (api core)</li>
                <li>SQL and NOSQL databases</li>
                <li>
                  Kami menggunakan<i>Firebase, Mailgun, Dlvrt, dsb</i>sebagai{" "}
                  <i>3th party </i>yang diakses beberapa<i>micro services </i>KI
                </li>
                <li>
                  Kami menggunakan<i>git</i>sebagai<i>version control system</i>
                </li>
              </ul>
              <button className="btn btn-gray btn-sm" disabled="true">
                Pendaftaran Belum Dibuka
              </button>
            </div>
          </div>
        </section>
        <div className="col-md-12 m-t-b-10">
          <hr />
        </div>
        <section className="col-md-12">
          <div className="col-md-12">
            <h2>Technical Support</h2>
          </div>
          <div className="col-md-6 carrers-item">
            <strong>DevOops</strong>
            <ul className="align-left">
              <li>Linux based server</li>
              <li>Docker </li>
              <li>
                {" "}
                <i>3th party </i>seperti{" "}
                <i>Gitlab Enterprise, Firebase, Heroku, dsb</i>
              </li>
              <li>Remote, Monitoring, Standby </li>
            </ul>
            <button className="btn btn-gray btn-sm" disabled="true">
              Pendaftaran Belum Dibuka{" "}
            </button>
          </div>
        </section>
        <div className="col-md-12 m-t-b-10">
          <hr />
        </div>
        <div className="col-md-12">
          <div className="col-md-12" />
          <h2>Software Quality Assurances</h2>
          <div className="col-md-6 carrers-item">
            <div className="disabled" />
            <strong>Web QA Engineer</strong>
          </div>
        </div>
        <div className="col-md-12 m-t-b-10">
          <hr />
        </div>
        <div className="col-md-12">
          <div className="col-md-12" />
          <h2>Non Technical Support</h2>
          <div className="col-md-6 carrers-item">
            <div className="disabled" />
            <strong>Marketing Staff</strong>
          </div>
          <div className="col-md-6 carrers-item">
            <div className="disabled" />
            <strong>Production Executive</strong>
          </div>
        </div>
        <div className="col-md-12 m-t-b-10">
          <hr />
        </div>
        <div className="col-md-12">
          {/* contact */}
          <div className="co-md-12">
            <h1>Selengkapnya</h1>
            <h3 style={{ fontWeight: "normal" }}>
              Ada pertanyaan lebih lanjut, jangan sungkan-sungkan sampaikan
              kepada kami.
            </h3>
            <br />
            <a
              className="btn btn-green"
              href="https://goo.gl/forms/kMGGZQXJCjoyKThj1"
              target="_blank"
            >
              {" "}
              <strong>Kontak Kami</strong>
            </a>
            <br />
            <p className="text-muted">atau temui kami di</p>
            <ul className="horizontal-menu">
              <li>
                <a
                  className="btn btn-socmed btn-gray btn-lg fab fa-facebook-f"
                  href="https://facebook.com/kompetisiid"
                  rel="noopener"
                  target="_blank"
                />
              </li>
              <li>
                <a
                  className="btn btn-socmed btn-gray btn-lg fab fa-twitter"
                  href="https://twitter.com/_kompetisiid"
                  rel="noopener"
                  target="_blank"
                />
              </li>
              <li>
                <a
                  className="btn btn-socmed btn-gray btn-lg fab fa-instagram"
                  href="https://instagram.com/kompetisiid"
                  rel="noopener"
                  target="_blank"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
